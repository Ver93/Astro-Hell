import ENTITY_STATE from "../../../data/entity/EntityState";
import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";
import ENTITY_TYPE from "../../../data/entity/EntityType";

export default class DropSystem {
    constructor(game){
        this.game = game;
        this.ecs = game.ecs;
        this.entityManager = game.managers.entity;
    }

    update(dt, seconds){
        const alive = this.ecs.alive;
        const entities = this.ecs.entities;
        const player = this.ecs.getEntity(this.game.context.player);

        for (let id = 1; id < this.ecs.nextId; id++) {
            if (!alive[id]) continue;

            const e = entities[id];
            if (!e) continue;

            if (!e.entity_active) continue;

            if(e.entity_state === ENTITY_STATE.DEAD && e.entity_drop_loot){
                if(e.entity_state === ENTITY_STATE.DEAD && e.entity_drop_loot){
                    const exp = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_EXPERIENCE);
                    exp.entity_position_x = e.entity_position_x;
                    exp.entity_position_y = e.entity_position_y;

                    if (Math.random() < 0.0001 * player.entity_passive_luck){
                        const crystal = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_CRYSTAL);
                        crystal.entity_position_x = e.entity_position_x;
                        crystal.entity_position_y = e.entity_position_y;
                        return;
                    }
                    
                    if (Math.random() < 0.0001 * player.entity_passive_luck){
                        const dynamite = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_DYNAMITE);
                        dynamite.entity_position_x = e.entity_position_x;
                        dynamite.entity_position_y = e.entity_position_y;
                        return;
                    }

                    if (Math.random() < 0.0001 * (1 + player.entity_passive_luck)){
                        const dynamite = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_TREASURE);
                        dynamite.entity_position_x = e.entity_position_x;
                        dynamite.entity_position_y = e.entity_position_y;
                        return;
                    }

                    if (Math.random() < 0.0001 * player.entity_passive_luck){
                        const dynamite = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_CROWN);
                        dynamite.entity_position_x = e.entity_position_x;
                        dynamite.entity_position_y = e.entity_position_y;
                        return;
                    }

                    if (Math.random() < 0.001 * player.entity_passive_luck){
                        const dynamite = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_COLLECTOR);
                        dynamite.entity_position_x = e.entity_position_x;
                        dynamite.entity_position_y = e.entity_position_y;
                        return;
                    }

                    if (Math.random() < 0.001 * player.entity_passive_luck){
                        const crystal = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_SAPPHIRE);
                        crystal.entity_position_x = e.entity_position_x;
                        crystal.entity_position_y = e.entity_position_y;
                        return;
                    }

                    if (Math.random() < 0.001 * player.entity_passive_luck){
                        const crystal = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_RUBY);
                        crystal.entity_position_x = e.entity_position_x;
                        crystal.entity_position_y = e.entity_position_y;
                        return;
                    }

                    if (Math.random() < 0.001 * player.entity_passive_luck){
                        const crystal = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_TOPAZ);
                        crystal.entity_position_x = e.entity_position_x;
                        crystal.entity_position_y = e.entity_position_y;
                        return;
                    }

                    if (Math.random() < 0.001 * player.entity_passive_luck){
                        const crystal = this.entityManager.spawnEntity(ENTITY_CATEGORY.ITEM, ENTITY_TYPE.ITEM_DIAMOND);
                        crystal.entity_position_x = e.entity_position_x;
                        crystal.entity_position_y = e.entity_position_y;
                        return;
                    }
                }
            }
        }
    }
}