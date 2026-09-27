import Phaser from "phaser";
import ENTITY_CATEGORY from "../../../data/entity/EntityCategory.js";
import ENTITY_STATE from "../../../data/entity/EntityState.js";
import ENTITY_TYPE from "../../../data/entity/EntityType.js";
import FireworkExplosionEffect from "../../../effects/particle/FireworkExplosionEffect.js";
import DamageTextPool from "../../../effects/visual/DamageTextPool.js";
import STATUS_EFFECTS from "../../../data/damage/StatusEffects.js";
import SOUND from "../../../../shared/data/sound/Sound.js";

export default class ImpactSystem {

    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.context = game.context;
        this.entityManager = game.managers.entity;

        this.damageTextPool = new DamageTextPool(game, 200);
        this.damageStacks = new Map();

        this.damageStackDuration = 250;
    }

    update(dt, seconds) {
        const collisionSystem = this.game.systems.collisionSystem;

        for (let i = 0; i < collisionSystem.collisionCount; i++) {
            const a = collisionSystem.collisionA[i];
            const b = collisionSystem.collisionB[i];
            const x = collisionSystem.collisionX[i];
            const y = collisionSystem.collisionY[i];

            this.handleCollision(a, b, x, y);
        }

        this.cleanupDamageStacks();
    }

    cleanupDamageStacks() {
        const now = performance.now();

        for (const [id, stack] of this.damageStacks) {
            if (now - stack.time > this.damageStackDuration) {
                this.damageStacks.delete(id);
            }
        }
    }

    handleCollision(a, b, x, y) {
        const A = this.ecs.getEntity(a);
        const B = this.ecs.getEntity(b);
        if (!A || !B) return;

        const item = this.getItem(A, B);
        if (item) {
            this.applyItemPickup(item);
            return;
        }

        const isPlayerEnemy =
            (A.entity_category === ENTITY_CATEGORY.PLAYER && B.entity_category === ENTITY_CATEGORY.ENEMY) ||
            (A.entity_category === ENTITY_CATEGORY.ENEMY && B.entity_category === ENTITY_CATEGORY.PLAYER);

        if (isPlayerEnemy) {
            const player = A.entity_category === ENTITY_CATEGORY.PLAYER ? A : B;
            const enemy = A.entity_category === ENTITY_CATEGORY.ENEMY ? A : B;

            this.applyPlayerEnemyCollision(player, enemy, x, y);
            return;
        }

        const projectile = this.getProjectile(A, B);
        if (!projectile) return;

        const target = projectile === A ? B : A;

        if (target.entity_category === ENTITY_CATEGORY.PROJECTILE) return;

        this.applyImpact(projectile, target, x, y);
    }

    getItem(A, B) {
        if (A.entity_category === ENTITY_CATEGORY.ITEM) return A;
        if (B.entity_category === ENTITY_CATEGORY.ITEM) return B;
        return null;
    }

    getProjectile(A, B) {
        if (A.entity_category === ENTITY_CATEGORY.PROJECTILE) return A;
        if (B.entity_category === ENTITY_CATEGORY.PROJECTILE) return B;
        return null;
    }

    applyItemPickup(item) {
        item.entity_state = ENTITY_STATE.DEAD;
        item.item_collect = false;

        switch (item.entity_type) {
            case ENTITY_TYPE.ITEM_CRYSTAL:
                this.game.events.emitEvent("crystal");
                break;

            case ENTITY_TYPE.ITEM_EXPERIENCE:
                this.game.events.emitEvent("exp");
                this.game.audio.play(SOUND.PICKUP);
                break;

            case ENTITY_TYPE.ITEM_DYNAMITE:
                this.explode(item, 2000, 99);
                this.game.audio.play(SOUND.DYNAMITE);
                break;

            case ENTITY_TYPE.ITEM_COLLECTOR:
                for (const id of this.ecs.categories[ENTITY_CATEGORY.ITEM]) {
                    const itm = this.ecs.getEntity(id);
                    if (itm) itm.item_collect = true;
                }
                break;

            case ENTITY_TYPE.ITEM_TREASURE:
                this.game.treasureMenu();
                break;
        }
    }

    applyPlayerEnemyCollision(player, enemy, x, y) {
        const damage = enemy.entity_stats_contact_damage || 1;

        this.damage(player, damage);

        const dx = player.entity_position_x - enemy.entity_position_x;
        const dy = player.entity_position_y - enemy.entity_position_y;
        const dist = Math.hypot(dx, dy);

        if (dist > 0) {
            player.entity_status_effects[STATUS_EFFECTS.KNOCKBACK] = {
                direction_x: dx / dist,
                direction_y: dy / dist,
                strength: 200,
                timer: 0.15,
                applied: false
            };
        }

        this.game.audio.play(SOUND.HIT);

        if(player.entity_stats_health <= 0){
            this.game.endGame();
        }
    }

    applyImpact(projectile, target, x, y) {
        const dmg = projectile.entity_stats_damage || 1;

        switch (projectile.entity_type) {

            case ENTITY_TYPE.PROJECTILE_BANANARANG:
            case ENTITY_TYPE.PROJECTILE_FLOPPY:
                this.damage(target, dmg);
                return;

            case ENTITY_TYPE.PROJECTILE_HONEY_JAR:
                return;

            case ENTITY_TYPE.PROJECTILE_HONEY_POOL: {
                const honey = target.entity_status_effects[STATUS_EFFECTS.HONEY];
                if (honey) {
                    honey.timer = 3;
                } else {
                    target.entity_status_effects[STATUS_EFFECTS.HONEY] = {
                        modifier: 0.1,
                        timer: 3,
                        visual: null
                    };
                }
                return;
            }

            case ENTITY_TYPE.PROJECTILE_FIREWORK: {
                const explosion = new FireworkExplosionEffect(this.game);
                this.game.audio.play(SOUND.EXPLOSION);
                explosion.apply(projectile.entity_position_x, projectile.entity_position_y);

                if (projectile.trailEffect) {
                    projectile.trailEffect.stop();
                    projectile.trailEffect.clear();
                }

                this.explode(projectile, 120, 3);
                projectile.entity_state = ENTITY_STATE.DEAD;
                return;
            }

            case ENTITY_TYPE.PROJECTILE_CHEESE: {
                this.damage(target, dmg);

                const dx = target.entity_position_x - projectile.entity_position_x;
                const dy = target.entity_position_y - projectile.entity_position_y;
                const dist = Math.hypot(dx, dy);

                if (dist > 0) {
                    target.entity_status_effects[STATUS_EFFECTS.KNOCKBACK] = {
                        direction_x: dx / dist,
                        direction_y: dy / dist,
                        strength: 250,
                        timer: 0.15,
                        applied: false
                    };
                }
                return;
            }
        }

        if (target.entity_category === ENTITY_CATEGORY.ENEMY) {
            this.damage(target, dmg);

            if (projectile.entity_type === ENTITY_TYPE.PROJECTILE_RUBBER_DUCK) {
                const dx = projectile.entity_position_x - target.entity_position_x;
                const dy = projectile.entity_position_y - target.entity_position_y;
                const dist = Math.hypot(dx, dy);
                
                if (dist > 0) {
                    projectile.entity_movement_direction_x = dx / dist;
                    projectile.entity_movement_direction_y = dy / dist;
                    this.game.audio.play(SOUND.QUACK);
                }
                return;
            }
        }

        projectile.entity_state = ENTITY_STATE.DEAD;
    }

    damage(target, damage) {
        target.entity_stats_health -= damage;
        
        if(target.entity_stats_health <= 0){
            this.game.audio.play(SOUND.POP);
        } else {
            this.game.audio.play(SOUND.HIT);
        }

        this.showDamage(target, damage);

        if (target.entity_sprite_object) {
            this.game.particle.apply("flash", target.entity_sprite_object, {
                color: 0xffffff,
                duration: 50,
                repeat: 1
            });
        }
    }

    showDamage(target, damage) {
        const id = target.entity_id;
        const now = performance.now();
        const x = target.entity_position_x;
        const y = target.entity_position_y;

        let stack = this.damageStacks.get(id);

        if (stack && now - stack.time <= this.damageStackDuration) {
            stack.damage += damage;
            stack.time = now;

            const text = stack.text;
            if (!text || !text.visible) {
                this.damageStacks.delete(id);
                return this.showDamage(target, damage);
            }

            text.setText(stack.damage.toFixed(1).replace(".", ","));
            text.setPosition(x, y - 15);
            text.setAlpha(1);

            if (stack.tween) stack.tween.stop();

            stack.tween = this.game.scene.tweens.add({
                targets: text,
                scale: { from: 1.15, to: 1 },
                y: y - 45,
                alpha: { from: 1, to: 0 },
                duration: 500,
                ease: "Back.easeOut",
                onComplete: () => {
                    this.damageStacks.delete(id);
                    this.damageTextPool.release(text);
                }
            });

            return;
        }

        const text = this.damageTextPool.get();
        if (!text) return;

        text.setText(damage.toFixed(1).replace(".", ","));
        text.setPosition(x, y - 15);
        text.setVisible(true);
        text.setAlpha(1);
        text.setScale(0.5);

        text.x += Phaser.Math.Between(-5, 5);
        text.y += Phaser.Math.Between(-3, 3);

        stack = {
            damage,
            time: now,
            text,
            tween: null
        };

        this.damageStacks.set(id, stack);

        stack.tween = this.game.scene.tweens.add({
            targets: text,
            scale: { from: 0.5, to: 1 },
            y: text.y - 45,
            alpha: { from: 1, to: 0 },
            duration: 500,
            ease: "Back.easeOut",
            onComplete: () => {
                this.damageStacks.delete(id);
                this.damageTextPool.release(text);
            }
        });
    }

    explode(proj, radius, damage) {
        const x = proj.entity_position_x;
        const y = proj.entity_position_y;

        const enemies = this.ecs.categories[ENTITY_CATEGORY.ENEMY];
        if (!enemies) return;

        for (const id of enemies) {
            const enemy = this.ecs.getEntity(id);
            if (!enemy || !enemy.entity_active) continue;

            const dx = enemy.entity_position_x - x;
            const dy = enemy.entity_position_y - y;
            const distSq = dx * dx + dy * dy;

            if (distSq <= radius * radius) {
                this.damage(enemy, damage);
            }
        }
    }
}
