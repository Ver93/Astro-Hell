export default class RayInitializer {
    constructor(game) {
        this.game = game;
    }

    initialize(projectile, player, config, target) {
        const speed = projectile.entity_stats_speed;

        if (target) {
            const dx = target.entity_position_x - projectile.entity_position_x;
            const dy = target.entity_position_y - projectile.entity_position_y;
            const distance = Math.hypot(dx, dy);

            if (distance > 0) {
                projectile.entity_velocity_x = (dx / distance) * speed;
                projectile.entity_velocity_y = (dy / distance) * speed;
            }
            return;
        }

        const angle = Math.random() * Math.PI * 2;
        projectile.entity_velocity_x = Math.cos(angle) * speed;
        projectile.entity_velocity_y = Math.sin(angle) * speed;
    }
}
