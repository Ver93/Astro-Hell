import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";
import ENTITY_TYPE from "../../../data/entity/EntityType";
import ENTITY_STATE from "../../../data/entity/EntityState";
import FireworkExplosionEffect from "../../../effects/particle/FireworkExplosionEffect";
import HoneyPoolEffect from "../../../effects/particle/HoneyPoolEffect";
import SOUND from "../../../../shared/data/sound/Sound";

export default class BehaviorSystem {

    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.camera = game.context.camera;
        this.entityManager = game.entity;
        this.rotation = 0;
        this.formation_lerp = 0.1;
        this.timer = 0;
    }

    update(player, ecs, dt, seconds) {
        this.orbit(player, ecs, dt, seconds);
        this.boomerang(player, ecs, dt, seconds);
        this.bounce(player, ecs, dt, seconds);
        this.revolver(player, ecs, dt, seconds);
        this.ray(player, ecs, dt, seconds);
        this.cheese(player, ecs, dt, seconds);
        this.jars(player, ecs, dt, seconds);
        this.boot(player, ecs, dt, seconds);
        this.pulse(player, ecs, dt, seconds);
        this.candle(player, ecs, dt, seconds);
        this.pools(player, ecs, dt, seconds);
    }

    orbit(player, ecs, dt, seconds) {
        const orbitals = ecs.components[ENTITY_TYPE.PROJECTILE_FLOPPY];
        if (!orbitals) return;

        const active = [];

        for (const id of orbitals) {
            const projectile = ecs.getEntity(id);

            if (projectile && projectile.entity_active) {
                active.push(projectile);
            }
        }

        const count = active.length;
        if (count === 0) return;

        this.rotation += active[0].entity_orbit_speed * dt;

        for (let i = 0; i < active.length; i++) {
            const projectile = active[i];
            const targetAngle = i * (Math.PI * 2 / count);

            if (projectile.entity_orbit_angle === undefined) {
                const dx = projectile.entity_position_x - player.entity_position_x;
                const dy = projectile.entity_position_y - player.entity_position_y;

                projectile.entity_orbit_angle = Math.atan2(dy, dx) - this.rotation;
            }

            let diff = targetAngle - projectile.entity_orbit_angle;

            diff = Math.atan2(Math.sin(diff), Math.cos(diff));
            projectile.entity_orbit_angle += diff * this.formation_lerp;

            const angle = projectile.entity_orbit_angle + this.rotation;

            projectile.entity_position_x =
                player.entity_position_x +
                Math.cos(angle) * projectile.entity_orbit_radius;

            projectile.entity_position_y =
                player.entity_position_y +
                Math.sin(angle) * projectile.entity_orbit_radius;
        }
    }

    boomerang(player, ecs, dt, seconds) {
        const boomerangs = ecs.components[ENTITY_TYPE.PROJECTILE_BANANARANG];
        if (!boomerangs) return;

        for (const id of boomerangs) {
            const projectile = ecs.getEntity(id);
            if (!projectile || !projectile.entity_active) continue;

            const move = projectile.entity_stats_speed * dt;

            
            
            if (projectile.entity_boomerang_velocity_x === undefined) {
                projectile.entity_boomerang_velocity_x = 0;
                projectile.entity_boomerang_velocity_y = 0;
            }
            
            if (!projectile.entity_boomerang_returning) {
                
                const dx = projectile.entity_target_x - projectile.entity_position_x;
                const dy = projectile.entity_target_y - projectile.entity_position_y;
                
                const distance = Math.hypot(dx, dy);

                if (distance <= move) {
                    projectile.entity_position_x = projectile.entity_target_x;
                    projectile.entity_position_y = projectile.entity_target_y;

                    projectile.entity_boomerang_returning = true;
                    continue;
                }

                const direction = Math.atan2(dy, dx);

                const targetVelocityX =
                    Math.cos(direction) * projectile.entity_stats_speed;

                const targetVelocityY =
                    Math.sin(direction) * projectile.entity_stats_speed;

                const acceleration = 0.01;

                projectile.entity_boomerang_velocity_x +=
                    (targetVelocityX - projectile.entity_boomerang_velocity_x) *
                    acceleration;

                projectile.entity_boomerang_velocity_y +=
                    (targetVelocityY - projectile.entity_boomerang_velocity_y) *
                    acceleration;

                projectile.entity_position_x +=
                    projectile.entity_boomerang_velocity_x * dt;

                projectile.entity_position_y +=
                    projectile.entity_boomerang_velocity_y * dt;

                continue;
            }

            const dx = player.entity_position_x - projectile.entity_position_x;
            const dy = player.entity_position_y - projectile.entity_position_y;

            const distance = Math.hypot(dx, dy);

            // console.log(
            //     "Distance", distance,
            //     "Move:", move
            // );

            if (distance <= move + 50) {
                projectile.entity_position_x = player.entity_position_x;
                projectile.entity_position_y = player.entity_position_y;

                projectile.entity_boomerang_velocity_x = 0;
                projectile.entity_boomerang_velocity_y = 0;

                projectile.entity_boomerang_returning = false;

                projectile.entity_state = ENTITY_STATE.DEAD;
                continue;
            }

            const direction = Math.atan2(dy, dx);

            const targetVelocityX =
                Math.cos(direction) * projectile.entity_stats_speed;

            const targetVelocityY =
                Math.sin(direction) * projectile.entity_stats_speed;

            const acceleration = 0.01;

            projectile.entity_boomerang_velocity_x +=
                (targetVelocityX - projectile.entity_boomerang_velocity_x) *
                acceleration;

            projectile.entity_boomerang_velocity_y +=
                (targetVelocityY - projectile.entity_boomerang_velocity_y) *
                acceleration;

            projectile.entity_position_x +=
                projectile.entity_boomerang_velocity_x * dt;

            projectile.entity_position_y +=
                projectile.entity_boomerang_velocity_y * dt;
        }
    }

    bounce(player, ecs, dt, seconds) {
        const projectiles = ecs.components[ENTITY_TYPE.PROJECTILE_RUBBER_DUCK];
        if (!projectiles) return;

        const camera = this.camera;

        const left = camera.worldView.x;
        const right = camera.worldView.right;
        const top = camera.worldView.y;
        const bottom = camera.worldView.bottom;

        for (const id of projectiles) {
            const projectile = ecs.getEntity(id);
            if (!projectile || !projectile.entity_active) continue;

            const velX = projectile.entity_movement_direction_x * projectile.entity_stats_speed;
            const velY = projectile.entity_movement_direction_y * projectile.entity_stats_speed;

            const nextX = projectile.entity_position_x + velX * dt;
            const nextY = projectile.entity_position_y + velY * dt;

            const halfWidth = projectile.entity_width * projectile.entity_scale * 0.5;
            const halfHeight = projectile.entity_height * projectile.entity_scale * 0.5;

            if (nextX - halfWidth <= left || nextX + halfWidth >= right) {
                projectile.entity_movement_direction_x *= -1;
                this.game.audio.play(SOUND.QUACK);
            }

            if (nextY - halfHeight <= top || nextY + halfHeight >= bottom) {
                projectile.entity_movement_direction_y *= -1;
                this.game.audio.play(SOUND.QUACK);
            }

            const finalVelX = projectile.entity_movement_direction_x * projectile.entity_stats_speed;
            const finalVelY = projectile.entity_movement_direction_y * projectile.entity_stats_speed;

            projectile.entity_position_x += finalVelX * dt;
            projectile.entity_position_y += finalVelY * dt;
        }
    }

    revolver(player, ecs, dt, seconds) {
        const projectiles = ecs.components[ENTITY_TYPE.PROJECTILE_BULLET];
        if (!projectiles) return;

        for (const id of projectiles) {
            const p = ecs.getEntity(id);
            if (!p || !p.entity_active) continue;

            p.entity_position_x += p.entity_velocity_x * dt;
            p.entity_position_y += p.entity_velocity_y * dt;

            // p.trailEffect.follow(p.entity_sprite_object);
        }
    }

    ray(player, ecs, dt, seconds) {
        const projectiles = ecs.components[ENTITY_TYPE.PROJECTILE_RAY];
        if (!projectiles) return;

        for (const id of projectiles) {
            const p = ecs.getEntity(id);
            if (!p || !p.entity_active) continue;

            p.entity_position_x += p.entity_velocity_x * dt;
            p.entity_position_y += p.entity_velocity_y * dt;

        }
    }

    cheese(player, ecs, dt, seconds) {
        const projectiles = ecs.components[ENTITY_TYPE.PROJECTILE_CHEESE];
        if (!projectiles) return;

        for (const id of projectiles) {
            const p = ecs.getEntity(id);
            if (!p || !p.entity_active) continue;

            p.entity_position_x = player.entity_position_x;
            p.entity_position_y = player.entity_position_y;

            p.entity_projectile_timer -= seconds;
            p.entity_collider_enabled = false;

            if (p.entity_projectile_timer < 0) {
                p.entity_collider_enabled = true;
                p.entity_projectile_timer =
                    p.entity_projectile_ticktime / p.entity_projectile_tickps;
            }

            this.game.particle.update("cloud", player.entity_position_x, player.entity_position_y, p.entity_collider_radius);
        }
    }

    jars(player, ecs, dt, seconds) {
        const projectiles = ecs.components[ENTITY_TYPE.PROJECTILE_HONEY_JAR];
        if (!projectiles) return;

        for (const id of projectiles) {
            const p = ecs.getEntity(id);
            if (!p || !p.entity_active) continue;

            p.entity_velocity_y += p.entity_gravity * seconds;

            const nextX =
                p.entity_position_x +
                p.entity_velocity_x * dt;

            const nextY =
                p.entity_position_y +
                p.entity_velocity_y * dt;

            const targetX = p.entity_target_x;
            const targetY = p.entity_target_y;

            if (
                p.entity_position_y <= targetY &&
                nextY >= targetY
            ) {
                const pool = this.entityManager.spawnEntity(ENTITY_CATEGORY.PROJECTILE, ENTITY_TYPE.PROJECTILE_HONEY_POOL);
                pool.entity_position_x = p.entity_position_x;
                pool.entity_position_y = p.entity_position_y;
                pool.effect = new HoneyPoolEffect(this.game);
                pool.effect.apply(pool.entity_position_x, pool.entity_position_y, {duration: pool.entity_projectile_lifetime * 1000});
                pool.entity_projectile_timer = pool.entity_projectile_lifetime;
                this.game.audio.play(SOUND.GLASS);
                p.entity_state = ENTITY_STATE.DEAD;
                continue;
            }

            p.entity_position_x = nextX;
            p.entity_position_y = nextY;

            p.entity_velocity_x *= 0.995;
        }
    }

    pools(player, ecs, dt, seconds){
        const projectiles = ecs.components[ENTITY_TYPE.PROJECTILE_HONEY_POOL];
        if (!projectiles) return;

        for (const id of projectiles) {
            const p = ecs.getEntity(id);
            if (!p || !p.entity_active) continue;

            p.entity_projectile_timer -= seconds;

            if(p.entity_projectile_timer <= 0){
                this.entity_projectile_timer = p.entity_projectile_lifetime;
                p.entity_state = ENTITY_STATE.DEAD;
            }
        }
    }

    boot(player, ecs, dt, seconds) {
        const projectiles = ecs.components[ENTITY_TYPE.PROJECTILE_BOOT];
        if (!projectiles) return;

        for (const id of projectiles) {
            const p = ecs.getEntity(id);
            if (!p || !p.entity_active) continue;

            p.boot_time += dt * p.entity_stats_speed;

            const t = Math.min(p.boot_time, 1);

            const x =
                p.entity_start_position_x +
                (p.entity_target_x - p.entity_start_position_x) * t;

            const y =
                p.entity_start_position_y +
                (p.entity_target_y - p.entity_start_position_y) * t;

            const arcOffset =
                Math.sin(t * Math.PI) * p.boot_arc_height;

            p.entity_position_x = x;
            p.entity_position_y = y - arcOffset;
        }
    }

    pulse(player, ecs, dt, seconds) {
        const projectiles = ecs.components[ENTITY_TYPE.PROJECTILE_PULSE];
        if (!projectiles) return;
        
        for (const id of projectiles) {
            const p = ecs.getEntity(id);
            
            if (!p || !p.entity_active) continue;
            
            p.entity_position_x = player.entity_position_x;
            p.entity_position_y = player.entity_position_y;
        
            this.game.particle.update("pulse", player.entity_position_x, player.entity_position_y, p.entity_collider_radius);
        }
    }

    candle(player, ecs, dt, seconds) {

        const projectiles =
            ecs.components[ENTITY_TYPE.PROJECTILE_FIREWORK];

        if (!projectiles) return;


        for (const id of projectiles) {

            const p = ecs.getEntity(id);

            if (!p || !p.entity_active) continue;


            // ---------------------------------------------
            // IDLE / START
            // ---------------------------------------------

            if (!p.started && !p.exploded) {

                p.idle_time -= seconds;

                p.idle_direction_timer -= seconds;


                if (p.idle_direction_timer <= 0) {

                    p.idle_direction_timer =
                        0.5 +
                        Math.random() * 1.5;

                    p.idle_velocity_x +=
                        (Math.random() - 0.5) * 2;

                    p.idle_velocity_y +=
                        (Math.random() - 0.5) * 2;

                    p.idle_velocity_x =
                        Math.max(
                            -2,
                            Math.min(
                                2,
                                p.idle_velocity_x
                            )
                        );

                    p.idle_velocity_y =
                        Math.max(
                            -2,
                            Math.min(
                                2,
                                p.idle_velocity_y
                            )
                        );
                }


                p.entity_position_x +=
                    p.idle_velocity_x * dt;

                p.entity_position_y +=
                    p.idle_velocity_y * dt;

                // TRAIL EFTER POSITION UPDATE
                if (
                    p.trailEffect &&
                    p.entity_sprite_object
                ) {
                    p.trailEffect.follow(
                        p.entity_sprite_object
                    );
                }


                if (p.idle_time <= 0) {
                    p.started = true;
                }

                continue;
            }


            // ---------------------------------------------
            // BEZIER FLIGHT
            // ---------------------------------------------

            if (!p.started || p.exploded) {
                continue;
            }


            p.speed =
                Math.min(
                    p.speed +
                    p.acceleration * dt,
                    p.max_speed
                );


            p.bezier_progress +=
                (p.speed * dt) /
                Math.max(
                    p.bezier_length,
                    1
                );


            const t =
                Math.min(
                    p.bezier_progress,
                    1
                );

            const invT =
                1 - t;


            p.entity_position_x =
                invT * invT * invT *
                p.bezier_start_x +

                3 *
                invT * invT *
                t *
                p.bezier_control1_x +

                3 *
                invT *
                t * t *
                p.bezier_control2_x +

                t * t * t *
                p.target_x;


            p.entity_position_y =
                invT * invT * invT *
                p.bezier_start_y +

                3 *
                invT * invT *
                t *
                p.bezier_control1_y +

                3 *
                invT *
                t * t *
                p.bezier_control2_y +

                t * t * t *
                p.target_y;


            // TRAIL EFTER POSITION UPDATE
            if (
                p.trailEffect &&
                p.entity_sprite_object
            ) {
                p.trailEffect.follow(
                    p.entity_sprite_object
                );
            }

            if (p.bezier_progress >= 0.95) {

                p.entity_position_x =
                    p.target_x;

                p.entity_position_y =
                    p.target_y;

                p.exploded = true;

                p.entity_state =
                    ENTITY_STATE.DEAD;


                const x =
                    p.entity_position_x;

                const y =
                    p.entity_position_y;


                const explosion =
                    new FireworkExplosionEffect(
                        this.game
                    );

                explosion.apply(x, y);
                this.game.audio.play(SOUND.EXPLOSION);


                if (p.trailEffect) {

                    p.trailEffect.stop();
                    p.trailEffect.clear();

                }

                continue;
            }
        }
    }
}