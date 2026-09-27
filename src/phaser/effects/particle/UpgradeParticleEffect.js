import Phaser from "phaser";
import TEXTURE from "../../../shared/data/character/Texture";

export default class UpgradeParticleEffect {

    constructor(game) {
        this.game = game;

        const textures = [
            TEXTURE.ITEM_CRYSTAL,
            TEXTURE.ITEM_DIAMOND,
            TEXTURE.ITEM_SAPPHIRE,
            TEXTURE.ITEM_TOPAZ,
            TEXTURE.ITEM_RUBY,
            TEXTURE.ITEM_CROWN,
            TEXTURE.ITEM_PEARLS,
            TEXTURE.ITEM_GOBLET,
            TEXTURE.ITEM_RING,
            TEXTURE.ITEM_PENDANT,
        ];

        this.emitters = textures.map(tex => {

            const manager = this.game.scene.add.particles(
                0,
                0,
                tex,
                {
                    x: {
                        onEmit: () => {
                            const cam =
                                this.game.context.camera.worldView;

                            return Phaser.Math.Between(
                                cam.left,
                                cam.right
                            );
                        },
                    },

                    y: {
                        onEmit: () => {
                            const cam =
                                this.game.context.camera.worldView;

                            return cam.top - 50;
                        },
                    },

                    speedY: {
                        min: 200,
                        max: 400,
                    },

                    speedX: {
                        min: -40,
                        max: 40,
                    },

                    angle: {
                        min: 80,
                        max: 100,
                    },

                    scale: {
                        start: 3,
                        end: 0.4,
                    },

                    scaleMode: Phaser.ScaleModes.MULTIPLY,

                    rotate: {
                        min: 0,
                        max: 360,
                    },

                    alpha: {
                        start: 1,
                        end: 0,
                    },

                    lifespan: {
                        min: 2500,
                        max: 4000,
                    },

                    quantity: 1,
                    frequency: 100,
                    emitting: false,
                    brightness: 0.25,

                    // tint: [0xb89b00],
                }
            );

            manager.setDepth(999);

            return manager;
        });
    }

    start() {
        this.emitters.forEach(emitter => {
            emitter.start();
        });
    }

    stop() {
        this.emitters.forEach(emitter => {

            emitter.stop();

            this.game.scene.tweens.add({
                targets: emitter,

                alpha: 0,

                duration: 50,

                ease: "linear",

                onComplete: () => {
                    emitter.alpha = 1;
                }
            });
        });
    }

    clear() {
        this.emitters.forEach(emitter => {
            emitter.destroy();
        });

        this.emitters = [];
    }
}