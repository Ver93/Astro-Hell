export default class MoonPulseEffect {

constructor(game) {
    this.game = game;
    this.scene = game.scene;

    this.ring = this.scene.add.graphics();
    this.ring.depth = 10;

    this.running = false;
    this.tween = null;

    this.x = 0;
    this.y = 0;
    this.radius = 100;
}

start(x, y, radius = 100) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    if (this.running) return;

    this.running = true;

    this.pulse();
}

update(x, y, radius = this.radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

pulse() {
    if (!this.running) return;

    this.ring.clear();

    const state = {
        progress: 0
    };

    this.tween = this.scene.tweens.add({
        targets: state,
        progress: 1,

        duration: 1000,

        ease: "Linear",

        onUpdate: () => {
            if (!this.running) return;

            const radius =
                this.radius *
                (0.10 + 0.90 * state.progress);

            const alpha =
                0.10 +
                state.progress * 0.20;

            this.ring.clear();

            this.ring.lineStyle(
                4,
                0x88ccff,
                alpha
            );

            this.ring.strokeCircle(
                this.x,
                this.y,
                radius
            );
        },

        onComplete: () => {
            this.tween = null;

            if (this.running) {
                this.pulse();
            }
        }
    });
}

stop() {
    this.running = false;

    if (this.tween) {
        this.tween.stop();
        this.tween = null;
    }

    this.ring.clear();
}

clear() {
    this.running = false;

    if (this.tween) {
        this.tween.stop();
        this.tween = null;
    }

    this.ring.destroy();
}


}