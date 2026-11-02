
import WeaponSpawner from "./WeaponSpawner";
import WeaponTargeting from "./WeaponTargeting";
import WeaponUpgradeResolver from "./WeaponUpgradeResolver";

export default class WeaponSystem {

    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;

        this.entityManager = game.entity;

        this.spatial = null;

        this.playerEntity = null;
        this.playerWeapons = [];

        this.upgradeResolver =
            new WeaponUpgradeResolver();

        this.targeting =
            new WeaponTargeting(game);

        this.spawner =
            new WeaponSpawner(
                game,
                this.targeting
            );
    }

    update(dt, seconds) {

        // Hämta alltid aktuell spelare
        const playerId = this.game.context.player;

        this.playerEntity = playerId != null
            ? this.ecs.getEntity(playerId)
            : null;

        if (!this.playerEntity) {
            this.playerWeapons = [];
            return;
        }

        this.playerWeapons =
            this.playerEntity.entity_weapon_slots || [];

        // Hämta spatial system
        if (!this.spatial) {
            this.spatial =
                this.game.systems.spatialSystem;

            this.targeting.setSpatial(this.spatial);
        }

        if (!this.spatial) return;

        for (const weapon of this.playerWeapons) {

            const config =
                this.upgradeResolver.resolve(weapon);

            this.spawner.update(
                weapon,
                config,
                this.playerEntity,
                seconds
            );
        }
    }
}
