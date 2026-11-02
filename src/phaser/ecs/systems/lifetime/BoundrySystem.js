import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";
import ENTITY_STATE from "../../../data/entity/EntityState";

export default class BoundarySystem {
    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.context = game.context;
    }

    update(dt, seconds) {
        const camera = this.context.camera;
        const alive = this.ecs.alive;
        const entities = this.ecs.entities;

        const left = camera.worldView.x;
        const right = camera.worldView.right;
        const top = camera.worldView.y;
        const bottom = camera.worldView.bottom;

        const offset = 100;

        for (let id = 1; id < this.ecs.nextId; id++) {
            if (!alive[id]) continue;

            const e = entities[id];
            if (!e || !e.entity_active) continue;

            const outside =
                e.entity_position_x < left - offset ||
                e.entity_position_x > right + offset ||
                e.entity_position_y < top - offset ||
                e.entity_position_y > bottom + offset;

            if (e.entity_category === ENTITY_CATEGORY.PROJECTILE) {
                if (outside) {
                    e.entity_collider_enabled = false;
                    e.entity_state = ENTITY_STATE.DEAD;
                }
            }

            if (
                e.entity_category === ENTITY_CATEGORY.ENEMY ||
                e.entity_category === ENTITY_CATEGORY.ITEM
            ) {
                e.entity_collider_enabled = !outside;
            }
        }
    }
}