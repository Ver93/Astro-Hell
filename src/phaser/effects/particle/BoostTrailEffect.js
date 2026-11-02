
import Phaser from "phaser";
import TEXTURE from "../../../shared/data/character/Texture";

export default class BoostTrailEffect {
    constructor(game) {
        this.game = game;
        this.scene = game.scene;
        this.isEmitting = false;

        const texture = TEXTURE.PROJECTILE_DEFAULT;

        if (!this.scene.textures.exists(texture)) {
            console.error(
                "[BoostTrailEffect] Texture not loaded:",
                texture
            );
            return;
        }

        this.emitter = this.scene.add.particles(
            0,
            0,
            texture,
            {
                speed: { min: 50, max: 120 },
                angle: { min: 160, max: 200 },

                scale: { start: 2.5, end: 0 },
                alpha: { start: 1, end: 0 },

                lifespan: { min: 450, max: 750 },

                tint: [
                    0x00aaff,
                    0x00ddff,
                    0x66eeff,
                    0xffffff
                ],

                quantity: 4,
                frequency: 12,

                blendMode: Phaser.BlendModes.ADD
            }
        );

        this.emitter.setDepth(99);
        this.emitter.stop();
    }

    update(x, y, velocityX, velocityY, active) {
        if (!this.emitter) return;

        if (!active) {
            this.stop();
            return;
        }

        const angle =
            Math.atan2(velocityY, velocityX) *
            (180 / Math.PI);

        const offset = 10;
        const radians = Phaser.Math.DegToRad(angle);

        this.emitter.setPosition(
            x - Math.cos(radians) * offset,
            y - Math.sin(radians) * offset
        );

        this.emitter.setAngle(angle);

        if (!this.isEmitting) {
            this.emitter.start();
            this.isEmitting = true;
        }
    }

    stop() {
        if (!this.emitter || !this.isEmitting) return;

        this.emitter.stop();
        this.isEmitting = false;
    }

    destroy() {
        if (this.emitter) {
            this.emitter.destroy();
            this.emitter = null;
        }

        this.isEmitting = false;
    }
}
