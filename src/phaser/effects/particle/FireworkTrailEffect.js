import Phaser from "phaser";
import TEXTURE from "../../../shared/data/character/Texture";

export default class FireworkTrailEffect {

    constructor(game) {
        this.game = game;

        this.emitter = game.scene.add.particles(
            0,
            0,
            TEXTURE.PROJECTILE_DEFAULT,
            {
                speed: { min: 20, max: 60 },
                angle: { min: 0, max: 60 },

                scale: { start: 3, end: 0 },
                alpha: { start: 1, end: 0 },

                lifespan: { min: 100, max: 300 },

                tint: [0xffdd66],
                gravityY: 40,

                quantity: 3,
                frequency: 3,

                blendMode: Phaser.BlendModes.ADD
            }
        );

        // this.emitter.stop();
    }

    follow(sprite) {
        if (!sprite) return;

        this.emitter.startFollow(sprite, 0, 0, false);

        if (!this.emitter.active) {
            this.emitter.start();
        }
    }

    start(x, y) {
        this.emitter.setPosition(x, y);
        this.emitter.start();
    }

    stop() {
        this.emitter.stop();
    }

    clear() {
        this.emitter.destroy();
    }
}
