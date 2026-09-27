export default class FloppyInitializer {
    constructor(game) {
        this.game = game;
    }

    initialize(projectile, player, config, target) {
        projectile.entity_position_x = player.entity_position_x;
        projectile.entity_position_y = player.entity_position_y;
        projectile.entity_orbit_index = 0;
        projectile.entity_orbit_total = config.projectile_max_count;
    }
}