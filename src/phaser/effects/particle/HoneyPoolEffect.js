import Phaser from "phaser";
import TEXTURE from "../../../shared/data/character/Texture";

export default class HoneyPoolEffect {

    constructor(game) {
        this.scene = game.scene;
    }

    apply(x, y, options = {}) {

        const config = {
            scale: 4,
            duration: 3500,
            ...options
        };

        const pool = this.scene.add.image(
            x,
            y,
            TEXTURE.PROJECTILE_HONEY_POOL
        );

        pool.setScale(config.scale);
        pool.setAlpha(0.8);
        pool.setDepth(1);

        this.scene.tweens.add({
            targets: pool,
            scaleX: config.scale * 1.1,
            scaleY: config.scale * 0.9,
            duration: 900,
            alpha: 0.6,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        this.scene.time.delayedCall(config.duration, () => {

            this.scene.tweens.add({
                targets: pool,
                alpha: 0,
                scaleX: config.scale * 0.9,
                scaleY: config.scale * 0.9,
                duration: 500,
                ease: "Power2",
                onComplete: () => {
                    pool.destroy();
                }
            });
        });
    }
}
