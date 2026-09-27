import SystemPipeline from "./SystemPipeline";

export default class PlayerPipeline {
    constructor(game) {
        this.pipeline = new SystemPipeline();
        this.pipeline.add(game.systems.inputSystem);
        this.pipeline.add(game.systems.playerSystem);
    }

    update(dt, seconds) {
        this.pipeline.update(dt, seconds);
    }

    reset() {
        this.pipeline.reset();
    }
}
