import GradientLayer from "./GradientLayer.js";
import StarLayer from "./StarLayer.js";

export default class BackgroundSystem {
    constructor(game) {
        this.game = game;
        this.scene = game.scene;

        this.layers = [
            new GradientLayer(game),
            new StarLayer(game),
        ];

        this.scene.scale.on("resize", this.onResize, this);
    }

    preload() {
        for (const layer of this.layers) {
            layer.preload?.();
        }
    }

    create() {
        const width = this.scene.scale.width;
        const height = this.scene.scale.height;

        for (const layer of this.layers) {
            layer.create?.(width, height);
        }
    }

    onResize(gameSize) {
        const width = gameSize.width;
        const height = gameSize.height;

        for (const layer of this.layers) {
            layer.resize?.(width, height);
        }
    }

    setZone(background) {
        if (!background) return;

        for (const layer of this.layers) {
            layer.setData?.(background);
        }
    }

    update(dt, seconds) {
        for (const layer of this.layers) {
            layer.update?.(dt, seconds);
        }
    }

    destroy() {
        for (const layer of this.layers) {
            layer.destroy?.();
        }
    }
}