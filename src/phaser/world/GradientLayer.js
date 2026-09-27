export default class GradientLayer {
    constructor(game) {
        this.game = game;
        this.scene = game.scene;

        this.graphics = null;

        this.topColor = 0x05051a;
        this.bottomColor = 0x101040;
    }

    create(width, height) {
        this.graphics = this.scene.add.graphics();

        // Ska ligga bakom allt
        this.graphics.setDepth(-100000);

        // Viktigt:
        // gradienten följer kameran istället för världen
        this.graphics.setScrollFactor(0);

        this.resize(width, height);
    }

    resize(width, height) {
        if (!this.graphics) return;

        this.graphics.clear();

        const steps = 32;

        for (let i = 0; i < steps; i++) {
            const t = i / (steps - 1);

            const color = this.interpolateColor(
                this.topColor,
                this.bottomColor,
                t
            );

            const y = (height / steps) * i;

            this.graphics.fillStyle(color, 1);
            this.graphics.fillRect(
                0,
                y,
                width,
                height / steps + 1
            );
        }
    }

    interpolateColor(a, b, t) {
        const ar = (a >> 16) & 0xff;
        const ag = (a >> 8) & 0xff;
        const ab = a & 0xff;

        const br = (b >> 16) & 0xff;
        const bg = (b >> 8) & 0xff;
        const bb = b & 0xff;

        const r = Math.round(ar + (br - ar) * t);
        const g = Math.round(ag + (bg - ag) * t);
        const bl = Math.round(ab + (bb - ab) * t);

        return (r << 16) | (g << 8) | bl;
    }

    setData(background) {
        if (background.topColor !== undefined) {
            this.topColor = background.topColor;
        }

        if (background.bottomColor !== undefined) {
            this.bottomColor = background.bottomColor;
        }

        this.resize(
            this.scene.scale.width,
            this.scene.scale.height
        );
    }

    update(dt, seconds) {
        // Ingen uppdatering behövs
    }

    destroy() {
        this.graphics?.destroy();
        this.graphics = null;
    }
}