export default class HoneyJarInitializer {
    constructor(game) {
        this.game = game;
    }

    initialize(projectile, player, config, target) {
        const camera = this.game.context.camera;

        projectile.entity_position_x = camera.worldView.x + Math.random() * camera.worldView.width;
        projectile.entity_position_y = camera.worldView.y;

        const angle = Math.PI * 0.5 + (Math.random() * Math.PI * 0.4 - Math.PI * 0.2);

        const speed = 5 + Math.random();

        projectile.entity_velocity_x = Math.cos(angle) * speed;
        projectile.entity_velocity_y = Math.sin(angle) * speed;

        projectile.entity_gravity = 10;
    }
}
