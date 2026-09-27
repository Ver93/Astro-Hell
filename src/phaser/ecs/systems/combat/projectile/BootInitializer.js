export default class BootInitializer {
    constructor(game) {
        this.game = game;
    }

    initialize(projectile, player, config, target) {
        // Startposition
        const x = player.entity_position_x;
        const y = player.entity_position_y;

        projectile.entity_position_x = x;
        projectile.entity_position_y = y;

        projectile.entity_start_position_x = x;
        projectile.entity_start_position_y = y;

        // Boot animation parameters
        projectile.boot_time = 0;
        projectile.boot_speed = 0.005;
        projectile.boot_arc_height = 300;
    }
}
