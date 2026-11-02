import ENTITY_TYPE from "../data/entity/EntityType";

export default class WorldWaveSystem {
    constructor(game) {
        this.game = game;

        this.time = 0;
        this.currentWaveIndex = 0;

        this.spawnWaves = [
            {
                time: 0,
                spawnInterval: 0.10,
                maxEnemies: 100,
                enemies: [ENTITY_TYPE.ENEMY_GRUB]
            },
            {
                time: 30,
                spawnInterval: 0.09,
                maxEnemies: 200,
                enemies: [ENTITY_TYPE.ENEMY_GRUB]
            },
            {
                time: 60,
                spawnInterval: 0.08,
                maxEnemies: 350,
                enemies: [ENTITY_TYPE.ENEMY_GRUB]
            },
            {
                time: 100,
                spawnInterval: 0.07,
                maxEnemies: 500,
                enemies: [ENTITY_TYPE.ENEMY_GRUB]
            },
            {
                time: 150,
                spawnInterval: 0.06,
                maxEnemies: 700,
                enemies: [ENTITY_TYPE.ENEMY_GRUB]
            },
            {
                time: 210,
                spawnInterval: 0.05,
                maxEnemies: 900,
                enemies: [ENTITY_TYPE.ENEMY_GRUB]
            },
            {
                time: 270,
                spawnInterval: 0.04,
                maxEnemies: 1200,
                enemies: [ENTITY_TYPE.ENEMY_GRUB]
            }
        ];
    }

    reset() {
        this.time = 0;
        this.currentWaveIndex = 0;
    }

    update(seconds) {
        this.time += seconds;

        while (
            this.currentWaveIndex < this.spawnWaves.length - 1 &&
            this.time >= this.spawnWaves[this.currentWaveIndex + 1].time
        ) {
            this.currentWaveIndex++;
        }
    }

    getCurrentWave() {
        const current =
            this.spawnWaves[this.currentWaveIndex];

        const next =
            this.spawnWaves[this.currentWaveIndex + 1];

        if (!next) {
            return current;
        }

        const duration =
            next.time - current.time;

        const progress =
            Math.max(
                0,
                Math.min(
                    (this.time - current.time) / duration,
                    1
                )
            );

        const smooth =
            progress * progress * (3 - 2 * progress);

        return {
            ...current,

            maxEnemies:
                current.maxEnemies +
                (next.maxEnemies - current.maxEnemies) * smooth,

            spawnInterval:
                current.spawnInterval +
                (next.spawnInterval - current.spawnInterval) * smooth
        };
    }

    getCurrentWaveIndex() {
        return this.currentWaveIndex;
    }

    getTime() {
        return this.time;
    }

    isFinished() {
        return this.currentWaveIndex >= this.spawnWaves.length - 1;
    }
}