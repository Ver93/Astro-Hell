export default class DeathEffect {

    constructor(game) {
        this.game = game;
    }


    apply(sprite, options = {}) {
        if (!sprite) return;

        const config = {
            duration: 250,
            scale: 1.5,
            angle: 180,
            entity: null,
            ...options
        };

        this.game.tweens.add({
            targets: sprite,
            alpha: 0,
            scale: config.scale,
            angle: config.angle,
            duration: config.duration,
            ease: "Quad.easeOut",

            onComplete: () => {
                sprite.setAlpha(1);
                sprite.setScale(1);
                sprite.setAngle(0);
                if(config.onComplete){

                    config.onComplete();
                }
            }     
        });
    }
}