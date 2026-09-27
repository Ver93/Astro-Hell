import Phaser from "phaser";

export default class PlayerSystem {
    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.context = game.context;

        // Healthbar
        this.healthbar = game.scene.add.graphics();
        this.healthbar.setDepth(999999);

        console.log("PlayerSystem: healthbar created");
    }

    update(dt, seconds) {
        const playerId = this.context.player;

        if (playerId === null) return;

        const e = this.ecs.getEntity(playerId);

        if (!e) return;

        const input = this.context.input;
        const boost = this.context.boost;

        const speed =
            e.entity_stats_speed +
            e.entity_passive_move_speed;

        const accel = e.entity_stats_acceleration;

        let currentSpeed = speed;
        let currentAccel = accel;

        // -------------------------
        // BOOST
        // -------------------------

        if (boost && e.entity_current_fuel > 0) {
            currentSpeed *= 2;
            currentAccel *= 2;

            e.entity_current_fuel -= 0.1;
        }

        // -------------------------
        // FUEL REGEN
        // -------------------------

        if (
            !boost &&
            e.entity_current_fuel < e.entity_max_fuel
        ) {
            e.entity_current_fuel +=
                e.entity_fuel_generation;
        }

        if (
            e.entity_current_fuel >
            e.entity_max_fuel
        ) {
            e.entity_current_fuel =
                e.entity_max_fuel;
        }

        // -------------------------
        // MOVEMENT
        // -------------------------

        const targetX =
            input.moveX * currentSpeed;

        const targetY =
            -input.moveY * currentSpeed;

        if (e.entity_velocity_x === -1) {
            e.entity_velocity_x = 0;
        }

        if (e.entity_velocity_y === -1) {
            e.entity_velocity_y = 0;
        }

        e.entity_velocity_x +=
            (targetX - e.entity_velocity_x) *
            currentAccel;

        e.entity_velocity_y +=
            (targetY - e.entity_velocity_y) *
            currentAccel;

        e.entity_position_x +=
            e.entity_velocity_x * dt;

        e.entity_position_y +=
            e.entity_velocity_y * dt;

        // -------------------------
        // ROTATION
        // -------------------------

        e.entity_rotation_target =
            input.moveX *
            e.entity_rotation_max;

        // -------------------------
        // CAMERA
        // -------------------------

        this.context.camera.centerOn(
            e.entity_position_x,
            e.entity_position_y
        );


        this.updateHealthbar(e);
    }

    updateHealthbar(e) {
        const health =
            e.entity_stats_health;

        const maxHealth =
            e.entity_stats_max_health;

        // Debug
        if (health === undefined || maxHealth === undefined) {
            console.warn(
                "PlayerSystem: health values missing",
                {
                    health,
                    maxHealth,
                    entity: e
                }
            );

            return;
        }

        if (maxHealth <= 0) {
            return;
        }

        const width = 48;
        const height = 5;


        const healthPercent =
            Phaser.Math.Clamp(
                health / maxHealth,
                0,
                1
            );

        const x =
            e.entity_position_x -
            width / 2;

        const y =
            e.entity_position_y +
            25;


        this.healthbar.clear();

        // -------------------------
        // BACKGROUND
        // -------------------------

        this.healthbar.fillStyle(
            0x222222,
            1
        );

        this.healthbar.fillRect(
            x,
            y,
            width,
            height
        );

        // -------------------------
        // HEALTH COLOR
        // -------------------------

        let color = 0x44dd55;

        if (healthPercent <= 0.5) {
            color = 0xffcc33;
        }

        if (healthPercent <= 0.25) {
            color = 0xff4444;
        }

        // -------------------------
        // HEALTH
        // -------------------------

        this.healthbar.fillStyle(
            color,
            1
        );

        this.healthbar.fillRect(
            x,
            y,
            width * healthPercent,
            height
        );

        // -------------------------
        // DEPTH
        // -------------------------

        this.healthbar.setDepth(999999);
    }
}
