export default class WorldScalingSystem {
    constructor(game) {
        this.game = game;

        this.demoDuration = 300;

        this.minSpawnInterval = 0.02;

        this.maxDifficulty = 1.0;
    }

    update(seconds) {
        // Reserv för framtida dynamisk scaling.
    }

    getDifficulty(time) {
        const progress =
            Math.min(
                time / this.demoDuration,
                1
            );

        return progress * this.maxDifficulty;
    }

    getEnemyCount(wave, time) {
        const difficulty =
            this.getDifficulty(time);

        return Math.floor(
            wave.maxEnemies *
            (1 + difficulty)
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