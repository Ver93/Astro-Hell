
import SOUND from "../../../../shared/data/sound/Sound";
import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";
import ENTITY_TYPE from "../../../data/entity/EntityType";

import ProjectileInitializer from "./projectile/ProjectileInitializer";

export default class WeaponSpawner {

    constructor(game, targeting) {

        this.game = game;
        this.entityManager = game.entity;
        this.targeting = targeting;

        this.initializer = new ProjectileInitializer(game);
    }

    update(weapon, config, playerEntity, seconds) {

        if (!config || !playerEntity) return;

        weapon.projectile_spawn_timer ??= 0;
        weapon.projectile_spawn_count ??= 0;
        weapon.timer ??= 0;

        weapon.timer -= seconds;

        if (weapon.timer <= 0) {

            weapon.timer =
                config.weapon_cooldown +
                config.projectile_max_count *
                config.projectile_spawn_interval;

            weapon.projectile_spawn_count = 0;
            weapon.projectile_spawn_timer = 0;
            weapon.projectile_targets = new Set();
        }

        weapon.projectile_spawn_count = this.countProjectiles(config);

        if (
            weapon.projectile_spawn_count >=
            config.projectile_max_count
        ) {
            return;
        }

        weapon.projectile_spawn_timer -= seconds;

        if (weapon.projectile_spawn_timer > 0) return;

        weapon.projectile_spawn_timer =
            config.projectile_spawn_interval;

        const count = Math.max(1, config.projectiles_per_shot);

        for (let i = 0; i < count; i++) {

            if (
                weapon.projectile_spawn_count >=
                config.projectile_max_count
            ) {
                break;
            }

            this.spawnProjectile(
                weapon,
                config,
                playerEntity
            );
        }
    }

    spawnProjectile(weapon, config, playerEntity) {

        const projectile = this.entityManager.spawnEntity(
            ENTITY_CATEGORY.PROJECTILE,
            config.projectile_type
        );

        if (!projectile) return;

        if (projectile.entity_type === ENTITY_TYPE.PROJECTILE_BULLET) {
            this.game.audio.play(SOUND.REVOLVER);
        }

        if (projectile.entity_type === ENTITY_TYPE.PROJECTILE_RAY) {
            this.game.audio.play(SOUND.RAY);
        }


        projectile.entity_position_x =
            playerEntity.entity_position_x;

        projectile.entity_position_y =
            playerEntity.entity_position_y;

        weapon.projectile_spawn_count++;

        weapon.projectile_targets ??= new Set();

        const target = this.targeting.findNearestEnemy(
            playerEntity.entity_position_x,
            playerEntity.entity_position_y,
            800,
            weapon.projectile_targets
        );

        if (target) {

            weapon.projectile_targets.add(target.entity_id);

            projectile.entity_target_x = target.entity_position_x;
            projectile.entity_target_y = target.entity_position_y;

        } else {

            this.targeting.applyRandomTarget(
                projectile,
                playerEntity
            );
        }

        this.applyUpgradeValues(projectile, config);

        this.initializer.initialize(
            projectile,
            playerEntity,
            config,
            target,
            weapon.projectile_spawn_count - 1
        );
    }

    applyUpgradeValues(projectile, config) {

        if (config.projectile_damage != null) {
            projectile.entity_projectile_damage =
                config.projectile_damage;
        }

        if (config.projectile_radius != null) {
            projectile.entity_collider_radius =
                config.projectile_radius;
        }

        if (config.explosion_radius != null) {
            projectile.entity_explosion_radius =
                config.explosion_radius;
        }
    }

    countProjectiles(config) {

        return this.game.ecs.countActiveEntitiesByType(
            config.projectile_type
        );
    }
}
