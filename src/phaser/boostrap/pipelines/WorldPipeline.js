import SystemPipeline from "./SystemPipeline";

export default class WorldPipeline {
    constructor(game) {
        this.pipeline = new SystemPipeline();
        // this.pipeline.add(game.systems.backgroundSystem);
        this.pipeline.add(game.systems.worldSpawnerSystem);
    }

    update(dt, seconds) {
        this.pipeline.update(dt, seconds);
    }

    reset() {
        this.pipeline.reset();
    }
}
