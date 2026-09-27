

import STATUS_EFFECTS from "../../../data/damage/StatusEffects";
import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";

export default class StatusEffectSystem {
    constructor(game){
        this.game = game;
        this.ecs = game.ecs;
    }

    update(dt, seconds){

        const enemies = this.ecs.getIdsByCat(ENTITY_CATEGORY.ENEMY);
        if(!enemies) return;

        for(const id of enemies){
            const enemy = this.ecs.getEntity(id);

            if(enemy && enemy.entity_status_effects){
                this.process(enemy, seconds);
            }
        }
    }

    process(enemy, seconds) {
        for (const type in enemy.entity_status_effects) {
            const effect = enemy.entity_status_effects[type];

            switch (Number(type)) {

                case STATUS_EFFECTS.SLOW:
                    effect.timer -= seconds;
                    if (effect.timer <= 0) {
                        enemy.entity_speed = enemy.entity_stats_speed;
                        break;
                    }

                    enemy.entity_speed = enemy.entity_stats_speed * effect.modifier;

                    break;


                case STATUS_EFFECTS.KNOCKBACK:

                    if (effect.applied) {
                        break;
                    }

                    effect.timer -= seconds;

                    enemy.entity_position_x +=
                        effect.direction_x * effect.strength * seconds;

                    enemy.entity_position_y +=
                        effect.direction_y * effect.strength * seconds;

                    if (effect.timer <= 0) {
                        effect.applied = true;
                    }

                    break;

                case STATUS_EFFECTS.STUN:
                    effect.timer -= seconds;

                    if (effect.timer <= 0) {
                        enemy.entity_speed = enemy.entity_stats_speed;
                        break;
                    }

                    enemy.entity_speed = enemy.entity_stats_speed * effect.modifier;
                    break;

                case STATUS_EFFECTS.HONEY:

                effect.timer -= seconds;

                if (effect.timer <= 0) {
                    enemy.entity_speed = enemy.entity_stats_speed;

                    if (effect.visual) {
                        effect.visual.stop();
                        effect.visual = null;
                    }

                    break;
                }

                if (!effect.visual && enemy.entity_active) {
                    effect.visual = this.game.particle.apply("honey", enemy);
                }

                if (effect.visual) {
                    effect.visual.update();
                }

                enemy.entity_speed =
                    enemy.entity_stats_speed * effect.modifier;

                break;
            }
        }
    }
}