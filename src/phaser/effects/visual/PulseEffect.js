export default class PulseEffect {
    constructor(game) {
        this.game = game;
    }

    apply(sprite, options = {}) {
        if (!sprite) return;

        const config = {
            scale: 1.075,
            duration: 500,
            repeat: -1,
            yoyo: true,
            ...options
        };

        this.game.tweens.add({
            targets: sprite,
            scale: config.scale,
            duration: config.duration,
            yoyo: config.yoyo,
            repeat: config.repeat,
            ease: "Sine.easeInOut"
        });
    }

    remove(sprite) {
        if (!sprite) return;

        this.game.tweens.killTweensOf(sprite);
        sprite.setScale(1);
    }
}