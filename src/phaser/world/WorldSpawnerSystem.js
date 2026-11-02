import ENTITY_CATEGORY from "../data/entity/EntityCategory";
import WorldWaveSystem from "./WorldWaveSystem";
import WorldScalingSystem from "./WorldScalingSystem";

export default class WorldSpawnerSystem {
    constructor(game) {
        this.game = game;

        this.ecs = game.ecs;
        this.entityManager =
            game.managers.entity;

        this.context = game.context;
        this.camera = this.context.camera;

        this.spatial = null;

        /*
         * Wave / scaling
         */
        this.waveSystem =
            new WorldWaveSystem(game);

        this.scalingSystem =
            new WorldScalingSystem(game);

        /*
         * Spawning
         */
        this.spawnTimer = 0;
        this.activeEnemyCount = 0;

        this.maxActiveEnemies = 2500;

        /*
         * Separation
         */
        this.separationX =
            new Float32Array(this.ecs.max);

        this.separationY =
            new Float32Array(this.ecs.max);

        /*
         * Spawn position
         */
        this.spawnDistance = 100;
    }

    reset() {
        this.spawnTimer = 0;
        this.activeEnemyCount = 0;

        this.separationX.fill(0);
        this.separationY.fill(0);

        this.waveSystem.reset?.();
        this.scalingSystem.reset?.();

        this.spatial = null;
    }

    update(dt, seconds) {
        if (!this.spatial) {
            this.spatial =
                this.game.systems.spatial;
        }

        /*
         * Update wave state
         */
        this.waveSystem.update(seconds);

        /*
         * Update scaling
         */
        this.scalingSystem.update(seconds);

        /*
         * Count active enemies
         */
        this.activeEnemyCount =
            this.ecs.countActiveEntitiesByCat(
                ENTITY_CATEGORY.ENEMY
            );

        /*
         * Spawn
         */
        this.updateSpawning(seconds);

        /*
         * Movement / separation
         */
        this.updateEnemies(dt);

        /*
         * Spatial
         */
        if (this.spatial) {
            this.spatial.update();
        }
    }

    updateSpawning(seconds) {
        const wave =
            this.waveSystem.getCurrentWave();

        if (!wave) {
            return;
        }

        if (
            this.activeEnemyCount >=
            this.maxActiveEnemies
        ) {
            return;
        }

        const time =
            this.waveSystem.getTime();

        const targetEnemyCount =
            this.scalingSystem.getEnemyCount(
                wave,
                time
            );

        if (
            this.activeEnemyCount >=
            targetEnemyCount
        ) {
            return;
        }

        const spawnInterval =
            this.scalingSystem.getSpawnInterval(
                wave,
                time
            );

        this.spawnTimer -= seconds;

        let spawned = 0;

        const maxSpawnPerUpdate = 2;

        while (
            this.spawnTimer <= 0 &&
            spawned < maxSpawnPerUpdate
        ) {
            if (
                this.activeEnemyCount >= targetEnemyCount ||
                this.activeEnemyCount >= this.maxActiveEnemies
            ) {
                break;
            }

            const success =
                this.spawnWaveEnemy(wave);

            if (!success) {
                this.spawnTimer = 0;
                break;
            }

            this.spawnTimer += spawnInterval;
            spawned++;
        }
    }

    spawnWaveEnemy(wave) {
        if (!wave || !wave.enemies) {
            return false;
        }

        if (
            wave.enemies.length === 0
        ) {
            return false;
        }

        return this.spawnEnemyOutsideCamera(
            wave.enemies
        );
    }

    spawnEnemyOutsideCamera(enemyPool) {
        const playerId =
            this.context.player;

        if (!playerId) {
            return false;
        }

        const player =
            this.ecs.getEntity(playerId);

        if (
            !player ||
            !player.entity_active
        ) {
            return false;
        }

        const px =
            player.entity_position_x;

        const py =
            player.entity_position_y;

        const view =
            this.camera.worldView;

        const cameraRadius =
            Math.hypot(
                view.width * 0.5,
                view.height * 0.5
            );

        const radius =
            cameraRadius +
            this.spawnDistance;

        const angle =
            Math.random() *
            Math.PI *
            2;

        const x =
            px +
            Math.cos(angle) *
            radius;

        const y =
            py +
            Math.sin(angle) *
            radius;

        const type =
            enemyPool[
                Math.floor(
                    Math.random() *
                    enemyPool.length
                )
            ];

        if (type === undefined) {
            console.warn(
                "WorldSpawner: invalid enemy type"
            );

            return false;
        }

        const enemy =
            this.entityManager.spawnEntity(
                ENTITY_CATEGORY.ENEMY,
                type
            );

        if (!enemy) {
            console.warn(
                "WorldSpawner: spawnEntity failed",
                {
                    activeEnemyCount:
                        this.activeEnemyCount,

                    ecsMax:
                        this.ecs.max,

                    ecsNextId:
                        this.ecs.nextId
                }
            );

            return false;
        }

        enemy.entity_position_x = x;
        enemy.entity_position_y = y;

        this.activeEnemyCount++;

        return true;
    }

    updateEnemies(dt) {
        const playerId =
            this.context.player;

        if (!playerId) {
            return;
        }

        const player =
            this.ecs.getEntity(playerId);

        if (
            !player ||
            !player.entity_active
        ) {
            return;
        }

        const px =
            player.entity_position_x;

        const py =
            player.entity_position_y;

        const enemies =
            this.ecs.categories[
                ENTITY_CATEGORY.ENEMY
            ];

        if (
            !enemies ||
            enemies.length === 0
        ) {
            return;
        }

        const collisionSystem =
            this.game.systems.collisionSystem;

        this.separationX.fill(0);
        this.separationY.fill(0);

        /*
         * Collision separation
         */
        for (
            let i = 0;
            i < collisionSystem.overlapCount;
            i++
        ) {
            const a =
                collisionSystem.overlapA[i];

            const b =
                collisionSystem.overlapB[i];

            const A =
                this.ecs.getEntity(a);

            const B =
                this.ecs.getEntity(b);

            if (!A || !B) {
                continue;
            }

            if (
                !A.entity_active ||
                !B.entity_active
            ) {
                continue;
            }

            const dx =
                A.entity_position_x -
                B.entity_position_x;

            const dy =
                A.entity_position_y -
                B.entity_position_y;

            const distanceSq =
                dx * dx +
                dy * dy;

            if (
                distanceSq <= 0.0001
            ) {
                continue;
            }

            const distance =
                Math.sqrt(distanceSq);

            const minDistance =
                (
                    A.entity_collider_width +
                    B.entity_collider_width
                ) * 0.5;

            const overlap =
                minDistance -
                distance;

            if (overlap <= 0) {
                continue;
            }

            const nx =
                dx / distance;

            const ny =
                dy / distance;

            const force =
                overlap /
                minDistance;

            this.separationX[a] +=
                nx * force;

            this.separationY[a] +=
                ny * force;

            this.separationX[b] -=
                nx * force;

            this.separationY[b] -=
                ny * force;
        }

        /*
         * Move enemies toward player
         */
        for (
            let i = 0;
            i < enemies.length;
            i++
        ) {
            const id =
                enemies[i];

            const enemy =
                this.ecs.getEntity(id);

            if (
                !enemy ||
                !enemy.entity_active
            ) {
                continue;
            }

            const dx =
                px -
                enemy.entity_position_x;

            const dy =
                py -
                enemy.entity_position_y;

            const distanceSq =
                dx * dx +
                dy * dy;

            if (
                distanceSq <= 0.0001
            ) {
                continue;
            }

            const distance =
                Math.sqrt(distanceSq);

            let moveX =
                dx / distance;

            let moveY =
                dy / distance;

            const separationStrength =
                3.0;

            moveX +=
                this.separationX[id] *
                separationStrength;

            moveY +=
                this.separationY[id] *
                separationStrength;

            const moveLengthSq =
                moveX * moveX +
                moveY * moveY;

            if (
                moveLengthSq <= 0.0001
            ) {
                continue;
            }

            const inverseLength =
                1 /
                Math.sqrt(
                    moveLengthSq
                );

            moveX *=
                inverseLength;

            moveY *=
                inverseLength;

            const speed =
                enemy.entity_speed *
                dt;

            enemy.entity_position_x +=
                moveX *
                speed;

            enemy.entity_position_y +=
                moveY *
                speed;
        }
    }

    onEnemyRemoved() {
        if (
            this.activeEnemyCount > 0
        ) {
            this.activeEnemyCount--;
        }
    }
}