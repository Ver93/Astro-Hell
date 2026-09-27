import FireworkTrailEffect from "../../../../effects/particle/FireworkTrailEffect";

export default class FireworkInitializer {
    constructor(game) {
        this.game = game;
    }

    initialize(projectile, player, config, target) {
        const x = player.entity_position_x;
        const y = player.entity_position_y;

        projectile.entity_position_x = x;
        projectile.entity_position_y = y;
        projectile.entity_start_position_x = x;
        projectile.entity_start_position_y = y;

        projectile.target_x = projectile.entity_target_x;
        projectile.target_y = projectile.entity_target_y;

        projectile.bezier_start_x = x;
        projectile.bezier_start_y = y;

        const dx = projectile.target_x - x;
        const dy = projectile.target_y - y;
        const distance = Math.max(Math.hypot(dx, dy), 1);

        const dirX = dx / distance;
        const dirY = dy / distance;

        const perpX = -dirY;
        const perpY = dirX;

        const curve = (Math.random() - 0.5) * distance * 1.2;

        projectile.bezier_control1_x = x + dx * 0.25 + perpX * curve;
        projectile.bezier_control1_y = y + dy * 0.25 + perpY * curve;

        projectile.bezier_control2_x = x + dx * 0.75 + perpX * curve;
        projectile.bezier_control2_y = y + dy * 0.75 + perpY * curve;

        projectile.bezier_progress = 0;
        projectile.bezier_length = distance * 1.3;

        projectile.speed = 1;
        projectile.max_speed = projectile.entity_stats_speed + Math.random();
        projectile.acceleration = projectile.entity_stats_acceleration + Math.random();

        projectile.started = false;
        projectile.exploded = false;

        projectile.idle_time = 0.5 + Math.random();
        projectile.idle_direction_timer = 0.5 + Math.random() * 1.5;
        projectile.idle_velocity_x = (Math.random() - 0.5) * 2;
        projectile.idle_velocity_y = (Math.random() - 0.5) * 2;

        projectile.trailEffect = new FireworkTrailEffect(this.game, "ff00ff");
    }
}
