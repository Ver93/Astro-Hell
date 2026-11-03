
import ENTITY_STATE from "../../../data/entity/EntityState";
import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";
import ENTITY_TYPE from "../../../data/entity/EntityType";

export default class DropSystem {
    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.entityManager = game.managers.entity;
    }

    update(dt, seconds) {
        const alive = this.ecs.alive;
        const entities = this.ecs.entities;
        const player = this.ecs.getEntity(this.game.context.player);

        if (!player) return;

        for (let id = 1; id < this.ecs.nextId; id++) {
            if (!alive[id]) continue;

            const e = entities[id];
            if (!e || !e.entity_active) continue;

            if (
                e.entity_state !== ENTITY_STATE.DEAD ||
                !e.entity_drop_loot ||
                e.entity_loot_dropped
            ) continue;

            e.entity_loot_dropped = true;

            const x = e.entity_position_x;
            const y = e.entity_position_y;
            const luck = player.entity_passive_luck || 0;

            const exp = this.entityManager.spawnEntity(
                ENTITY_CATEGORY.ITEM,
                ENTITY_TYPE.ITEM_EXPERIENCE
            );

            exp.entity_position_x = x;
            exp.entity_position_y = y;


            if (Math.random() < 0.0001 * luck) {
                this.spawnDrop(ENTITY_TYPE.ITEM_CRYSTAL, x, y);
            }

            if (Math.random() < 0.0001 * luck) {
                this.spawnDrop(ENTITY_TYPE.ITEM_DYNAMITE, x, y);
            }

            if (Math.random() < 0.0001 * (1 + luck)) {
                this.spawnDrop(ENTITY_TYPE.ITEM_TREASURE, x, y);
            }

            if (Math.random() < 0.0001 * luck) {
                this.spawnDrop(ENTITY_TYPE.ITEM_CROWN, x, y);
            }

            if (Math.random() < 0.001 * luck) {
                this.spawnDrop(ENTITY_TYPE.ITEM_COLLECTOR, x, y);
            }

            if (Math.random() < 0.001 * luck) {
                this.spawnDrop(ENTITY_TYPE.ITEM_SAPPHIRE, x, y);
            }

            if (Math.random() < 0.001 * luck) {
                this.spawnDrop(ENTITY_TYPE.ITEM_RUBY, x, y);
            }

            if (Math.random() < 0.001 * luck) {
                this.spawnDrop(ENTITY_TYPE.ITEM_TOPAZ, x, y);
            }

            if (Math.random() < 0.001 * luck) {
                this.spawnDrop(ENTITY_TYPE.ITEM_DIAMOND, x, y);
            }
        }
    }

    spawnDrop(type, x, y) {
        const item = this.entityManager.spawnEntity(
            ENTITY_CATEGORY.ITEM,
            type
        );

        if (!item) return;

        item.entity_position_x = x;
        item.entity_position_y = y;

        console.log("SPECIAL ITEM DROPPED:", type);
    }
}
