import Phaser from "phaser";
import ENTITY_TYPE from "../../data/entity/EntityType";


export default class FireworkExplosionEffect {

    constructor(game) {
        this.scene = game.scene;
    }

    apply(x, y, options = {}) {

        const config = {
            particles: 80,
            speed: { min: 100, max: 250 },
            lifespan: 2000,
            size: { start: 3, end: 0 },
            color: 0xffdd66,
            ...options
        };

        const emitter = this.scene.add.particles(
            x,
            y,
            ENTITY_TYPE.PROJECTILE_DEFAULT,
            {
                speed: config.speed,
                lifespan: config.lifespan,

                scale: {
                    start: config.size.start,
                    end: config.size.end
                },

                alpha: { start: 1, end: 0 },

                angle: { min: 0, max: 360 },

                tint: config.color,
                gravityY: 80,

                blendMode: Phaser.BlendModes.ADD
            }
        );

        emitter.explode(config.particles);

        this.scene.time.delayedCall(1500, () => {
            emitter?.destroy();
        });
    }
}
