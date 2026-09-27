import SystemPipeline from "./SystemPipeline";

export default class LifetimeSystem {
    constructor(game) {
        this.pipeline = new SystemPipeline();
        this.pipeline.add(game.systems.healthSystem);
        this.pipeline.add(game.systems.dropSystem);
        this.pipeline.add(game.systems.boundrySystem);
        this.pipeline.add(game.systems.lifetimeSystem);
    }

    update(dt, seconds) {
        this.pipeline.update(dt, seconds);
    }

    reset() {
        this.pipeline.reset();
    }
}
