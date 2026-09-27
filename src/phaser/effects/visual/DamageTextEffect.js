import Phaser from "phaser";

export default class DamageTextEffect {
    constructor(game) {
        this.game = game;
        this.pool = game.damageTextPool;
    }

    apply(x, y, value, options = {}) {
        const config = {
            duration: 700,
            distance: 60,
            scale: 1.4,
            critical: false,
            ...options
        };

        if (config.critical) {
            config.duration = 1000;
            config.distance = 100;
            config.scale = 2.2;
        }

        const text = this.pool.get();

        if (!text) return;

        const displayValue = Number.isInteger(value) ? value : Number(value).toFixed(1);
        const offsetX = Phaser.Math.Between(-20, 20);

        text.setText(config.critical ? `CRIT! ${displayValue}` : displayValue.toString() );
        text.setPosition(x + offsetX, y);
        text.setAlpha(1);
        text.setScale(config.critical ? 0.3 : 0.5);
        text.setAngle(config.critical ? Phaser.Math.Between(-10, 10) : 0);
        text.setColor(config.critical ? "#ffcc00" : "#ffffff");
        text.setVisible(true);

        this.game.tweens.add({
            targets: text,
            scale: config.scale,
            duration: config.critical ? 180 : 120,
            ease: "Back.easeOut"
        });

        if (config.critical) {
            this.game.tweens.add({
                targets: text,
                angle: {
                    from: -15,
                    to: 15
                },
                duration: 80,
                yoyo: true,
                repeat: 2
            });

            this.game.tweens.add({
                targets: text,
                alpha: {
                    from: 1,
                    to: 0.7
                },
                duration: 100,
                yoyo: true,
                repeat: 2
            });
        }

        this.game.tweens.add({
            targets: text,
            y: y - config.distance,
            alpha: 0,
            angle: config.critical ? Phaser.Math.Between(-35, 35) : Phaser.Math.Between(-15, 15),
            duration: config.duration,
            delay: config.critical ? 150 : 80,
            ease: "Quad.easeOut",
            onComplete: () => {
                this.pool.release(text);
                config.onComplete?.();
            }
        });
    }
}