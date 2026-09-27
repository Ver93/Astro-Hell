export default class RubberDuckInitializer {
    constructor(game) {
        this.game = game;
    }

    initialize(projectile, player, config, target) {
        const angle = Math.random() * Math.PI * 2;

        projectile.entity_movement_direction_x = Math.cos(angle);
        projectile.entity_movement_direction_y = Math.sin(angle);
    }
}
