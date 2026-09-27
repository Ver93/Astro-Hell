import SystemPipeline from "./SystemPipeline";

export default class PhysicsPipeline {

    constructor(game) {
        this.spatial = game.systems.spatialSystem;
        this.collision = game.systems.collisionSystem;

        this.pipeline = new SystemPipeline();

        this.pipeline.add(this.spatial);
        this.pipeline.add(this.collision);

        this.debug = false;
    }

    update(dt, seconds) {

        if (!this.debug) {
            this.pipeline.update(dt, seconds);
            return;
        }

        let t = performance.now();

        this.spatial.update(dt, seconds);

        const spatial = performance.now() - t;

        t = performance.now();

        this.collision.update(dt, seconds);

        const collision = performance.now() - t;

        console.table({
            spatial: spatial.toFixed(3),
            collision: collision.toFixed(3),
            total: (spatial + collision).toFixed(3)
        });
    }

    reset() {
        this.pipeline.reset();
    }
}
