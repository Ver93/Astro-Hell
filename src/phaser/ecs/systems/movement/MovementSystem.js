
export default class MovementSystem {
    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
    }

    update(dt, seconds) {
        const alive = this.ecs.alive;
        const entities = this.ecs.entities;

        for (let id = 1; id < this.ecs.nextId; id++) {
            if (!alive[id]) continue;

            const e = entities[id];
            if (!e) continue;

            if(!e.entity_active) continue;
            
            // e.entity_position_x += e.entity_velocity_x * dt;
            // e.entity_position_y += e.entity_velocity_y * dt;
        }
    }
}
