export default class WorldScalingSystem {
    constructor(game) {
        this.game = game;

        this.demoDuration = 300;

        this.minSpawnInterval = 0.02;

        this.maxDifficulty = 1.0;
    }

    update(seconds) {

    }

    getDifficulty(time) {
        const progress =
            Math.max(
                0,
                Math.min(time / this.demoDuration, 1)
            );

        return (
            progress *
            progress *
            (3 - 2 * progress)
        ) * this.maxDifficulty;
    }

    getEnemyCount(wave, time) {
        const difficulty =
            this.getDifficulty(time);

        return Math.floor(
            wave.maxEnemies * (1 + difficulty)
        );
    }

    getSpawnInterval(wave, time) {
        const difficulty =
            this.getDifficulty(time);

        const interval =
            wave.spawnInterval *
            (1 - difficulty * 0.5);

        return Math.max(
            this.minSpawnInterval,
            interval
        );
    }
}