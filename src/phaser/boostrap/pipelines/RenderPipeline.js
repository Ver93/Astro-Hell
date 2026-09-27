import SystemPipeline from "./SystemPipeline";

export default class RenderPipeline {
    constructor(game) {
        this.pipeline = new SystemPipeline();
        this.pipeline.add(game.systems.spriteSystem);
        this.pipeline.add(game.systems.renderSystem);
    }

    update(dt, seconds) {
        this.pipeline.update(dt, seconds);
    }

    reset() {
        this.pipeline.reset();
    }
}
