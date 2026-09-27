import WeaponDefinitions
    from "../../../data/weapon/WeaponDefinitions";

import UpgradeDefinitions
    from "../../../../shared/data/upgrade/UpgradeDefinitions";


export default class WeaponStats {

    get(weaponId, level) {

        const weapon =
            WeaponDefinitions[weaponId];

        if (!weapon) return null;


        const upgrade =
            UpgradeDefinitions[weaponId]
                ?.levels?.[level] ?? {};


        return {

            ...weapon,

            projectile_max_count:
                upgrade.projectile_count ??
                weapon.projectile_max_count,

            projectile_damage:
                upgrade.damage ??
                weapon.projectile_damage,

            projectile_spawn_interval:
                upgrade.fire_interval != null
                    ? upgrade.fire_interval / 1000
                    : weapon.projectile_spawn_interval,

            projectile_radius:
                upgrade.radius ??
                weapon.projectile_radius,

            weapon_cooldown:
                upgrade.cooldown != null
                    ? upgrade.cooldown / 1000
                    : weapon.weapon_cooldown,

            projectiles_per_shot:
                upgrade.projectiles_per_shot ??
                weapon.projectiles_per_shot ??
                1,

            explosion_radius:
                upgrade.explosion_radius ??
                weapon.explosion_radius
        };
    }
}