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
                enemies: [
                    ENTITY_TYPE.ENEMY_GRUB
                ]
            },
            {
                time: 30,
                spawnInterval: 0.09,
                maxEnemies: 200,
                enemies: [
                    ENTITY_TYPE.ENEMY_GRUB
                ]
            },
            {
                time: 60,
                spawnInterval: 0.08,
                maxEnemies: 350,
                enemies: [
                    ENTITY_TYPE.ENEMY_GRUB
                ]
            },
            {
                time: 100,
                spawnInterval: 0.07,
                maxEnemies: 500,
                enemies: [
                    ENTITY_TYPE.ENEMY_GRUB
                ]
            },
            {
                time: 150,
                spawnInterval: 0.06,
                maxEnemies: 700,
                enemies: [
                    ENTITY_TYPE.ENEMY_GRUB
                ]
            },
            {
                time: 210,
                spawnInterval: 0.05,
                maxEnemies: 900,
                enemies: [
                    ENTITY_TYPE.ENEMY_GRUB
                ]
            },
            {
                time: 270,
                spawnInterval: 0.04,
                maxEnemies: 1200,
                enemies: [
                    ENTITY_TYPE.ENEMY_GRUB
                ]
            }
        ];
    }

    update(seconds) {
        this.time += seconds;

        const waves = this.spawnWaves;

        while (
            this.currentWaveIndex < waves.length - 1 &&
            this.time >= waves[this.currentWaveIndex + 1].time
        ) {
            this.currentWaveIndex++;
        }
    }

    getCurrentWave() {
        return this.spawnWaves[
            this.currentWaveIndex
        ];
    }

    getCurrentWaveIndex() {
        return this.currentWaveIndex;
    }

    getTime() {
        return this.time;
    }

    isFinished() {
        return (
            this.currentWaveIndex >=
            this.spawnWaves.length - 1
        );
    }
}