import TEXTURE from "../../../shared/data/character/Texture";

export default class HoneyEffect {

    constructor(game) {
        this.scene = game.scene;
    }

    apply(enemy, options = {}) {

        const config = {
            scale: 2,
            ...options
        };

        const sprite = enemy.entity_sprite_object;

        if (!sprite) return null;

        const honey = this.scene.add.image(
            sprite.x,
            sprite.y,
            TEXTURE.PARTICLE_HONEY_ENTTIY
        );

        honey.setScale(config.scale);
        honey.setAlpha(0.8);
        honey.setDepth(sprite.depth + 1);

        const tween = this.scene.tweens.add({
            targets: honey,
            scaleX: config.scale * 1.2,
            scaleY: config.scale * 0.8,
            duration: 900,
            alpha: 0.6,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        let stopped = false;

        const stop = () => {
            if (stopped) return;

            stopped = true;

            tween.stop();
            honey.destroy();
        };

        return {
            update: () => {
                if (stopped) return;

                if (!enemy.entity_active || !honey.active || !sprite.active) {
                    stop();
                    return;
                }

                honey.x = sprite.x;
                honey.y = sprite.y;
            },

            stop
        };
    }
}