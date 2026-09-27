import Phaser from "phaser";

export default class StarLayer {

    constructor(game) {
        this.game = game;
        this.scene = game.scene;
        this.camera = this.scene.cameras.main;

        this.CHUNK_SIZE = 2000;

        this.WORLD_CHUNKS_X = 10;
        this.WORLD_CHUNKS_Y = 10;

        this.STARS_PER_CHUNK = 100;

        this.RENDER_DISTANCE = 2;
        this.RENDER_BUFFER = 3;

        this.OSC_SPEED = 0.0015;
        this.OSC_AMOUNT = 2;

        this.chunks = new Map();
        this.renderedChunks = new Map();

        this.lastMinChunkX = null;
        this.lastMaxChunkX = null;
        this.lastMinChunkY = null;
        this.lastMaxChunkY = null;
    }

    create() {
        this.generateWorld();
        this.updateVisibleChunks(true);
    }

    generateWorld() {
        const startX = -Math.floor(this.WORLD_CHUNKS_X / 2);
        const startY = -Math.floor(this.WORLD_CHUNKS_Y / 2);

        for (let x = 0; x < this.WORLD_CHUNKS_X; x++) {
            for (let y = 0; y < this.WORLD_CHUNKS_Y; y++) {

                const chunkX = startX + x;
                const chunkY = startY + y;

                const key = this.getChunkKey(chunkX, chunkY);

                this.chunks.set(
                    key,
                    this.generateChunk(chunkX, chunkY)
                );
            }
        }
    }

    generateChunk(cx, cy) {
        const stars = [];

        for (let i = 0; i < this.STARS_PER_CHUNK; i++) {

            const localX = Math.random() * this.CHUNK_SIZE;
            const localY = Math.random() * this.CHUNK_SIZE;

            const worldX =
                cx * this.CHUNK_SIZE + localX;

            const worldY =
                cy * this.CHUNK_SIZE + localY;

            const depth = Math.random();

            stars.push({
                worldX,
                worldY,
                baseY: worldY,

                size:
                    depth * 3 + 1,

                alpha:
                    Math.random() * 0.5 + 0.5,

                blinkSpeed:
                    Math.random() * 2 + 1,

                blinkOffset:
                    Math.random() * Math.PI * 2,

                parallax:
                    depth * 0.6 + 0.1
            });
        }

        return stars;
    }

    update(dt, seconds) {
        this.updateVisibleChunks();
        this.animateStars();
    }

    updateVisibleChunks(force = false) {
        const camera = this.camera;

        const left = camera.worldView.x;
        const right = camera.worldView.right;
        const top = camera.worldView.y;
        const bottom = camera.worldView.bottom;

        const minChunkX =
            Math.floor(left / this.CHUNK_SIZE) -
            this.RENDER_DISTANCE;

        const maxChunkX =
            Math.floor(right / this.CHUNK_SIZE) +
            this.RENDER_DISTANCE;

        const minChunkY =
            Math.floor(top / this.CHUNK_SIZE) -
            this.RENDER_DISTANCE;

        const maxChunkY =
            Math.floor(bottom / this.CHUNK_SIZE) +
            this.RENDER_DISTANCE;

        if (
            !force &&
            minChunkX === this.lastMinChunkX &&
            maxChunkX === this.lastMaxChunkX &&
            minChunkY === this.lastMinChunkY &&
            maxChunkY === this.lastMaxChunkY
        ) {
            return;
        }

        this.lastMinChunkX = minChunkX;
        this.lastMaxChunkX = maxChunkX;
        this.lastMinChunkY = minChunkY;
        this.lastMaxChunkY = maxChunkY;

        for (let cx = minChunkX; cx <= maxChunkX; cx++) {
            for (let cy = minChunkY; cy <= maxChunkY; cy++) {
                this.renderChunk(cx, cy);
            }
        }

        this.unrenderFarChunks(
            minChunkX,
            maxChunkX,
            minChunkY,
            maxChunkY
        );
    }

    renderChunk(cx, cy) {
        const key = this.getChunkKey(cx, cy);

        if (!this.chunks.has(key)) {
            return;
        }

        if (this.renderedChunks.has(key)) {
            return;
        }

        const stars = this.chunks.get(key);
        const sprites = [];

        for (const star of stars) {

            const sprite = this.scene.add.rectangle(
                star.worldX,
                star.worldY,
                star.size,
                star.size,
                0xffffff
            );

            sprite.setAlpha(star.alpha);
            sprite.setScrollFactor(star.parallax);

            sprite.star = star;

            sprites.push(sprite);
        }

        this.renderedChunks.set(key, sprites);
    }

    unrenderFarChunks(
        minChunkX,
        maxChunkX,
        minChunkY,
        maxChunkY
    ) {
        const minX =
            minChunkX - this.RENDER_BUFFER;

        const maxX =
            maxChunkX + this.RENDER_BUFFER;

        const minY =
            minChunkY - this.RENDER_BUFFER;

        const maxY =
            maxChunkY + this.RENDER_BUFFER;

        for (const [key, sprites] of this.renderedChunks) {

            const [cx, cy] =
                key.split(",").map(Number);

            if (
                cx < minX ||
                cx > maxX ||
                cy < minY ||
                cy > maxY
            ) {
                for (const sprite of sprites) {
                    sprite.destroy();
                }

                this.renderedChunks.delete(key);
            }
        }
    }

    animateStars() {
        const time = this.scene.time.now;

        const offset =
            Math.sin(time * this.OSC_SPEED) *
            this.OSC_AMOUNT;

        for (const sprites of this.renderedChunks.values()) {

            for (const sprite of sprites) {

                const star = sprite.star;

                const alpha =
                    star.alpha +
                    Math.sin(
                        time *
                        0.002 *
                        star.blinkSpeed +
                        star.blinkOffset
                    ) * 0.3;

                sprite.setAlpha(
                    Phaser.Math.Clamp(
                        alpha,
                        0.2,
                        1
                    )
                );

                sprite.y =
                    star.baseY + offset;
            }
        }
    }

    resize(width, height) {
    }

    setData(background) {
    }

    destroy() {
        for (const sprites of this.renderedChunks.values()) {
            for (const sprite of sprites) {
                sprite.destroy();
            }
        }

        this.renderedChunks.clear();
        this.chunks.clear();
    }

    getChunkKey(cx, cy) {
        return `${cx},${cy}`;
    }
}