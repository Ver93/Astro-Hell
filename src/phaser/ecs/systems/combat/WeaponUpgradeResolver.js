
import WeaponDefinitions from "../../../data/weapon/WeaponDefinitions";
import UpgradeDefinitions from "../../../../shared/data/upgrade/UpgradeDefinitions";

export default class WeaponUpgradeResolver {

    resolve(weapon) {

        const def = WeaponDefinitions[weapon.id];

        if (!def) return null;

        const upg =
            UpgradeDefinitions[weapon.id]
                ?.levels?.[weapon.level] ?? {};

        return {
            ...def,

            projectile_max_count:
                upg.projectile_count ??
                def.projectile_max_count,

            projectile_damage:
                upg.damage ??
                def.projectile_damage,

            projectile_spawn_interval:
                upg.fire_interval != null
                    ? upg.fire_interval / 1000
                    : def.projectile_spawn_interval,

            projectile_radius:
                upg.radius ??
                def.projectile_radius,

            weapon_cooldown:
                upg.cooldown != null
                    ? upg.cooldown / 1000
                    : def.weapon_cooldown,

            projectiles_per_shot:
                upg.projectiles_per_shot ??
                def.projectiles_per_shot ??
                1,

            explosion_radius:
                upg.explosion_radius ??
                def.explosion_radius
        };
    }
}
