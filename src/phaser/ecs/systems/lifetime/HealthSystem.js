import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";
import ENTITY_STATE from "../../../data/entity/EntityState";
import ENTITY_TYPE from "../../../data/entity/EntityType";

export default class HealthSystem {
    constructor(game){
        this.game = game;
        this.ecs = game.ecs;
        this.entityManager = game.managers.entity;
    }

    update(dt, seconds){
        const alive = this.ecs.alive;
        const entities = this.ecs.entities;

        for (let id = 1; id < this.ecs.nextId; id++) {
            if (!alive[id]) continue;

            const e = entities[id];
            if (!e) continue;

            if (!e.entity_active) continue;

            if(e.entity_state === ENTITY_STATE.DEAD) continue;

            if(e.entity_stats_health <= 0){
                e.entity_state = ENTITY_STATE.DEAD;
                this.game.context.addKills();
            }
        }
    }
}