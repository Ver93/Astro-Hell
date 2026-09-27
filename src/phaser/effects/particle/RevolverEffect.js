import Phaser from "phaser";

export default class RevolverEffect {

    constructor(game) {
        this.game = game;
        this.scene = game.scene;
    }

    apply(x1, y1, x2, y2, options = {}) {

        const config = {
            duration: 600,

            beamWidth: 6,
            beamCoreWidth: 2,

            color: 0xffcc55,
            coreColor: 0xffffff,

            muzzleLength: 20,
            muzzleWidth: 14,

            particles: 18,

            ...options
        };

        const dx = x2 - x1;
        const dy = y2 - y1;

        const length = Math.hypot(dx, dy);

        if (length <= 0) return;

        const dirX = dx / length;
        const dirY = dy / length;

        const angle = Math.atan2(
            dirY,
            dirX
        );

        const beam =
            this.scene.add.graphics();

        beam.setDepth(1000);

        // Ytterkant
        beam.lineStyle(
            config.beamWidth,
            config.color,
            1
        );

        beam.beginPath();

        beam.moveTo(
            x1,
            y1
        );

        beam.lineTo(
            x2,
            y2
        );

        beam.strokePath();

        // Vit kärna
        beam.lineStyle(
            config.beamCoreWidth,
            config.coreColor,
            1
        );

        beam.beginPath();

        beam.moveTo(
            x1,
            y1
        );

        beam.lineTo(
            x2,
            y2
        );

        beam.strokePath();

        for (let i = 0; i < config.particles; i++) {
            const offsetX =
                Phaser.Math.FloatBetween(-2, 2);

            const offsetY =
                Phaser.Math.FloatBetween(-2, 2);

            const particle =
                this.scene.add.circle(
                    x1 + offsetX,
                    y1 + offsetY,
                    Phaser.Math.FloatBetween(1, 2.5),
                    Math.random() > 0.4
                        ? 0xffffff
                        : config.color
                );

            particle.setDepth(1002);
            
            const spread =
                Phaser.Math.FloatBetween(
                    -0.5,
                    0.5
                );

            const particleAngle =
                angle + spread;

            const speed =
                Phaser.Math.FloatBetween(
                    80,
                    220
                );

            this.scene.tweens.add({

                targets: particle,

                x:
                    x1 +
                    Math.cos(particleAngle) *
                    speed,

                y:
                    y1 +
                    Math.sin(particleAngle) *
                    speed,

                alpha: 0,

                scale: 0,

                duration:
                    Phaser.Math.Between(
                        70,
                        140
                    ),

                ease: "Quad.easeOut",

                onComplete: () => {
                    particle.destroy();
                }
            });
        }


        this.scene.tweens.add({

            targets: beam,

            alpha: 0,

            duration: config.duration,

            ease: "Quad.easeOut",

            onComplete: () => {
                beam.destroy();
            }
        });
    }

    clear() {
    }
}