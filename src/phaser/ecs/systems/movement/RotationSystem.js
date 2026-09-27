import Phaser from "phaser";
import RotationModes from "../../../data/rotation/RotationModes";

export default class RotationSystem {
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

            const mode = e.entity_rotation_mode;
            if (!mode) continue;

            const fn = RotationModes[mode];
            if (!fn) continue;

            if (typeof e.entity_rotation_angle !== "number") {
                e.entity_rotation_angle = 0;
            }

            fn(e, dt);

            e.entity_rotation_angle = Phaser.Math.Wrap(
                e.entity_rotation_angle,
                -Math.PI,
                Math.PI
            );
        }
    }
}
