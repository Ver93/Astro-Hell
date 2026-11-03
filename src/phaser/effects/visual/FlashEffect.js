import Phaser from "phaser";

export default class FlashEffect {

    constructor(game) {
        this.game = game;
        this.scene = game.scene;
    }

    apply(sprite, options = {}) {

        if (!sprite) {
            return;
        }

        const config = {
            color: 0xffffff,
            duration: 50,
            repeat: 1,
            alpha: 0.4,
            ...options
        };

        sprite
            .setTint(config.color)
            .setTintMode(
                Phaser.TintModes.FILL
            );

        this.scene.tweens.add({

            targets: sprite,

            alpha: config.alpha,

            duration: config.duration,

            yoyo: true,

            repeat: config.repeat,

            ease: "Sine.easeInOut",

            onComplete: () => {

                sprite.clearTint();

                sprite.setAlpha(1);
            }
        });
    }
}
