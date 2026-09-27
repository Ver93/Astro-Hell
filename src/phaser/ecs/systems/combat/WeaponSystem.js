import WeaponSpawner from "./WeaponSpawner";
import WeaponTargeting from "./WeaponTargeting";
import WeaponUpgradeResolver from "./WeaponUpgradeResolver";

export default class WeaponSystem {

    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;

        this.playerID = game.context.player;
        this.entityManager = game.entity;

        this.spatial = null;

        this.playerEntity =
            this.ecs.getEntity(this.playerID);

        this.playerWeapons =
            this.playerEntity?.entity_weapon_slots;

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

        if (!this.spatial) {
            this.spatial =
                this.game.systems.spatialSystem;

            this.targeting.setSpatial(
                this.spatial
            );

            return;
        }

        if (!this.playerEntity) return;
        if (!this.playerWeapons) return;


        for (const weapon of this.playerWeapons) {

            const config =
                this.upgradeResolver.resolve(
                    weapon
                );

            this.spawner.update(
                weapon,
                config,
                this.playerEntity,
                seconds
            );
        }
    }
}