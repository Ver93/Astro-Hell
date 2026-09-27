export default class WeaponFiringSystem {

    update(weapon, stats, seconds) {

        weapon.timer ??= 0;
        weapon.projectile_spawn_timer ??= 0;
        weapon.projectile_spawn_count ??= 0;


        weapon.timer -= seconds;


        if (weapon.timer <= 0) {

            weapon.timer =
                stats.weapon_cooldown +
                stats.projectile_max_count *
                stats.projectile_spawn_interval;

            weapon.projectile_spawn_count = 0;
            weapon.projectile_spawn_timer = 0;

            weapon.projectile_targets =
                new Set();
        }


        if (
            weapon.projectile_spawn_count >=
            stats.projectile_max_count
        ) {
            return 0;
        }


        weapon.projectile_spawn_timer -= seconds;


        if (weapon.projectile_spawn_timer > 0) {
            return 0;
        }


        weapon.projectile_spawn_timer =
            stats.projectile_spawn_interval;


        const remaining =
            stats.projectile_max_count -
            weapon.projectile_spawn_count;


        const shots =
            Math.min(
                stats.projectiles_per_shot,
                remaining
            );


        weapon.projectile_spawn_count += shots;


        return shots;
    }
}