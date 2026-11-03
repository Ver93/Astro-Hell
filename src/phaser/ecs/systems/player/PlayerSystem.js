import Phaser from "phaser";

import BoostTrailEffect from "../../../effects/particle/BoostTrailEffect"
import SOUND from "../../../../shared/data/sound/Sound"

export default class PlayerSystem {
    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.context = game.context;

        this.healthbar = game.scene.add.graphics();
        this.healthbar.setDepth(999999);

        this.accelerationMultiplier = 0.1;
        this.friction = 0.999;
        this.maxSpeedMultiplier = 1.5;
        this.inputDeadzone = 0.01;

        this.boostSpeedMultiplier = 2;
        this.boostAccelerationMultiplier = 1.5;
        this.boostSteeringMultiplier = 0.35;

        this.boostTrail = new BoostTrailEffect(game);
    }

    update(dt, seconds) {
        const playerId = this.context.player;

        if (playerId === null) return;

        const e = this.ecs.getEntity(playerId);

        if (!e) return;

        const input = this.context.input;

        const boost = Boolean(
            this.context.boost &&
            e.entity_current_fuel > 0
        );

        if (boost) {
            this.game.audio.playLoop(SOUND.BOOST);
        } else {
            this.game.audio.stop(SOUND.BOOST);
        }

        const baseSpeed =
            e.entity_stats_speed +
            e.entity_passive_move_speed;

        if (boost) {
            e.entity_current_fuel = Math.max(
                0,
                e.entity_current_fuel - 0.1
            );
        } else if (
            e.entity_current_fuel < e.entity_max_fuel
        ) {
            e.entity_current_fuel +=
                e.entity_fuel_generation
        }

        e.entity_current_fuel = Math.min(
            e.entity_current_fuel,
            e.entity_max_fuel
        );

        if (e.entity_velocity_x === -1) {
            e.entity_velocity_x = 0;
        }

        if (e.entity_velocity_y === -1) {
            e.entity_velocity_y = 0;
        }

        const inputX = input.moveX;
        const inputY = -input.moveY;

        const inputMagnitude = Math.hypot(inputX, inputY);

        const normalizedX =
            inputMagnitude > 1
                ? inputX / inputMagnitude
                : inputX;

        const normalizedY =
            inputMagnitude > 1
                ? inputY / inputMagnitude
                : inputY;

        const baseAcceleration =
            e.entity_stats_acceleration *
            this.accelerationMultiplier;

        if (inputMagnitude > this.inputDeadzone) {
            const steeringMultiplier = boost
                ? this.boostSteeringMultiplier
                : 1;

            e.entity_velocity_x +=
                normalizedX *
                baseAcceleration *
                steeringMultiplier *
                dt * 60;

            e.entity_velocity_y +=
                normalizedY *
                baseAcceleration *
                steeringMultiplier *
                dt * 60;
        }

        if (boost) {
            const velocity = Math.hypot(
                e.entity_velocity_x,
                e.entity_velocity_y
            );

            if (velocity > 0.01) {
                const boostAcceleration =
                    baseAcceleration *
                    this.boostAccelerationMultiplier *
                    dt * 60;

                e.entity_velocity_x +=
                    (e.entity_velocity_x / velocity) *
                    boostAcceleration;

                e.entity_velocity_y +=
                    (e.entity_velocity_y / velocity) *
                    boostAcceleration;
            } else if (inputMagnitude > this.inputDeadzone) {
                e.entity_velocity_x +=
                    normalizedX *
                    baseAcceleration *
                    this.boostAccelerationMultiplier *
                    dt * 60;

                e.entity_velocity_y +=
                    normalizedY *
                    baseAcceleration *
                    this.boostAccelerationMultiplier *
                    dt * 60;
            }
        }

        const frameFriction = Math.pow(
            this.friction,
            dt * 60
        );

        e.entity_velocity_x *= frameFriction;
        e.entity_velocity_y *= frameFriction;

        const maxSpeed =
            baseSpeed *
            this.maxSpeedMultiplier *
            (boost ? this.boostSpeedMultiplier : 1);

        const velocity = Math.hypot(
            e.entity_velocity_x,
            e.entity_velocity_y
        );

        if (velocity > maxSpeed) {
            const scale = maxSpeed / velocity;

            e.entity_velocity_x *= scale;
            e.entity_velocity_y *= scale;
        }

        e.entity_position_x +=
            e.entity_velocity_x * dt;

        e.entity_position_y +=
            e.entity_velocity_y * dt;

        this.boostTrail.update(
            e.entity_position_x,
            e.entity_position_y,
            e.entity_velocity_x,
            e.entity_velocity_y,
            boost
        );

        e.entity_rotation_target =
            inputX * e.entity_rotation_max;

        this.context.camera.centerOn(
            e.entity_position_x,
            e.entity_position_y
        );

        this.updateHealthbar(e);
    }

    updateHealthbar(e) {
        const health = e.entity_stats_health;
        const maxHealth = e.entity_stats_max_health;

        if (
            health === undefined ||
            maxHealth === undefined ||
            maxHealth <= 0
        ) {
            return;
        }

        const width = 48;
        const height = 5;
        const spacing = 3;

        const healthPercent = Phaser.Math.Clamp(
            health / maxHealth,
            0,
            1
        );

        const maxFuel = e.entity_max_fuel || 0;

        const fuelPercent = maxFuel > 0
            ? Phaser.Math.Clamp(
                e.entity_current_fuel / maxFuel,
                0,
                1
            )
            : 0;

        const x = e.entity_position_x - width / 2;
        const y = e.entity_position_y + 25;

        this.healthbar.clear();

        this.healthbar.fillStyle(0x222222, 1);
        this.healthbar.fillRect(
            x,
            y,
            width,
            height
        );

        let healthColor = 0x44dd55;

        if (healthPercent <= 0.5) {
            healthColor = 0xffcc33;
        }

        if (healthPercent <= 0.25) {
            healthColor = 0xff4444;
        }

        this.healthbar.fillStyle(healthColor, 1);
        this.healthbar.fillRect(
            x,
            y,
            width * healthPercent,
            height
        );

        const boostY = y + height + spacing;

        this.healthbar.fillStyle(0x222b3a, 1);
        this.healthbar.fillRect(
            x,
            boostY,
            width,
            height
        );

        let boostColor = 0x22ccff;

        if (fuelPercent <= 0.25) {
            boostColor = 0x778899;
        }

        this.healthbar.fillStyle(boostColor, 1);
        this.healthbar.fillRect(
            x,
            boostY,
            width * fuelPercent,
            height
        );
    }

    reset() {
        if (this.healthbar) {
            this.healthbar.clear();
            this.healthbar.destroy();
            this.healthbar = null;
        }

        if (this.boostTrail) {
            this.boostTrail.destroy();
            this.boostTrail = null;
        }
    }
}