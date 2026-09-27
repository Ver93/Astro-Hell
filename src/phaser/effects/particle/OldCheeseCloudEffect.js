import Phaser from "phaser";
import TEXTURE from "../../../shared/data/character/Texture";

export default class OldCheeseCloudEffect {

    constructor(game) {
        this.game = game;

        this.x = 0;
        this.y = 0;
        this.radius = 100;

        this.emitZone = new Phaser.Geom.Circle(
            0,
            0,
            this.radius
        );

        this.emitter = game.scene.add.particles(
            0,
            0,
            TEXTURE.PROJECTILE_CHEESE,
            {
                speed: { min: 0.001, max: 0.002 },

                scale: {
                    start: 0.1,
                    end: 0.5,
                    ease: 'Sine.easeInOut'
                },

                alpha: {
                    start: 0.1,
                    end: 0
                },

                rotate: {
                    min: 0,
                    max: 360,
                },

                lifespan: {
                    min: 0,
                    max: 2500
                },

                tint: [
                    0x66ff66,
                    0x55cc55,
                    0x88ff88
                ],

                gravityY: 0,

                quantity: 1,
                frequency: 10,

                emitZone: {
                    type: "random",
                    source: this.emitZone
                },

                blendMode: Phaser.BlendModes.NORMAL
            }
        );

        this.emitter.stop();
    }

    follow(sprite) {
        if (!sprite) return;

        this.emitter.startFollow(
            sprite,
            0,
            0,
            false
        );

        this.emitter.start();
    }

    start(x, y, radius = 100) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.emitZone.radius = radius * 0.5;

        this.emitter.setPosition(
            this.x,
            this.y
        );

        this.emitter.start();
    }

    update(x, y, radius = this.radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.emitZone.radius = radius * 0.5;

        this.emitter.setPosition(
            this.x,
            this.y
        );
    }

    stop() {
        this.emitter.stop();
    }

    clear() {
        this.emitter.destroy();
    }
}
