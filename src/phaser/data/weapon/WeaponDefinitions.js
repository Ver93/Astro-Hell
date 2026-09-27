
import ENTITY_TYPE from "../entity/EntityType.js";
import WEAPON from "./Weapon.js";

const WeaponDefinitions = {

    [WEAPON.BANANARANG]: {
        weapon_cooldown: 3,
        projectile_spawn_interval: 1,
        projectiles_per_shot: 3,
        projectile_max_count: 3,
        projectile_type: ENTITY_TYPE.PROJECTILE_BANANARANG
    },


    [WEAPON.FLOPPY_SHIELD]: {
        weapon_cooldown: 1,
        projectile_spawn_interval: 1,
        projectiles_per_shot: 3,
        projectile_max_count: 12,
        projectile_radius: 100,
        projectile_type: ENTITY_TYPE.PROJECTILE_FLOPPY
    },


    [WEAPON.REVOLVER]: {
        weapon_cooldown: 1,
        projectile_spawn_interval: 1,
        projectiles_per_shot: 3,
        projectile_max_count: 3,
        projectile_type: ENTITY_TYPE.PROJECTILE_BULLET
    },


    [WEAPON.RUBBER_DUCKY]: {
        weapon_cooldown: 1,
        projectile_spawn_interval: 0.1,
        projectiles_per_shot: 1,
        projectile_max_count: 25,
        projectile_type: ENTITY_TYPE.PROJECTILE_RUBBER_DUCK
    },


    [WEAPON.OLD_CHEESE]: {
        weapon_cooldown: 9999,
        projectile_spawn_interval: 0.1,
        projectiles_per_shot: 1,
        projectile_max_count: 1,
        projectile_radius: 60,
        projectile_type: ENTITY_TYPE.PROJECTILE_CHEESE
    },


    [WEAPON.HONEY_JAR]: {
        weapon_cooldown: 3,
        projectile_spawn_interval: 1,
        projectiles_per_shot: 1,
        projectile_max_count: 3,
        projectile_type: ENTITY_TYPE.PROJECTILE_HONEY_JAR
    },


    [WEAPON.ROMAN_CANDLE]: {
        weapon_cooldown: 3,
        projectile_spawn_interval: 0.5,
        projectiles_per_shot: 3,
        projectile_max_count: 3,
        projectile_type: ENTITY_TYPE.PROJECTILE_FIREWORK
    },


    [WEAPON.MOON_PULSE]: {
        weapon_cooldown: 1,
        projectile_spawn_interval: 1,
        projectiles_per_shot: 1,
        projectile_max_count: 1,
        projectile_radius: 60,
        projectile_type: ENTITY_TYPE.PROJECTILE_PULSE
    },


    [WEAPON.OLD_BOOT]: {
        weapon_cooldown: 1,
        projectile_spawn_interval: 0.05,
        projectiles_per_shot: 1,
        projectile_max_count: 10,
        projectile_radius: 60,
        projectile_type: ENTITY_TYPE.PROJECTILE_BOOT
    }
};

export default WeaponDefinitions;

