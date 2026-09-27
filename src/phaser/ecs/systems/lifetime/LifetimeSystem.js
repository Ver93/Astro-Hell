import SOUND from "../../../../shared/data/sound/Sound";
import ENTITY_STATE from "../../../data/entity/EntityState";

export default class LifetimeSystem {
    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.entityManager = game.managers.entity;
        this.context = game.context;
    }

    update(dt) {
        const alive = this.ecs.alive;
        const entities = this.ecs.entities;

        for (let id = 1; id < this.ecs.nextId; id++) {
            if (!alive[id]) continue;

            const e = entities[id];

            if (!e) continue;
            if (!e.entity_active) continue;
            if (e.entity_state === ENTITY_STATE.DEAD){
                this.entityManager.despawnEntity(e);
            }

        }
    }
}
