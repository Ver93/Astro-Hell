import SystemPipeline from "./SystemPipeline";

export default class MovementPipeline {
    constructor(game) {
        this.pipeline = new SystemPipeline();
        this.pipeline.add(game.systems.movementSystem);
        this.pipeline.add(game.systems.rotationSystem);
    }

    update(dt, seconds) {
        this.pipeline.update(dt, seconds);
    }

    reset() {
        this.pipeline.reset();
    }
}
