export default class PulseInitializer {
    constructor(game) {
        this.game = game;
    }

    initialize(projectile, player, config, target) {
        this.game.particle.start(
            "pulse",
            player.entity_position_x,
            player.entity_position_y,
            projectile.entity_collider_radius
        );
    }
}
