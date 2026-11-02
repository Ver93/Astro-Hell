import ROTATION_MODE from "../../rotation/modes/RotationMode";
import ENTITY_STATE from "../EntityState";
import TEXTURE from "../../../../shared/data/character/Texture";
import ENTITY_CATEGORY from "../EntityCategory";
import ENTITY_TYPE from "../EntityType";
import WEAPON from "../../weapon/Weapon";
import PASSIVE from "../../passive/Passive"

const PlayerTemplates = {
    [ENTITY_TYPE.CHARACTER_ASTRO]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_state:                   ENTITY_STATE.IDLE,
        entity_category:                ENTITY_CATEGORY.PLAYER,
        entity_type:                    ENTITY_TYPE.CHARACTER_ASTRO,

        entity_stats_speed:             3,
        entity_stats_health:            3,
        entity_stats_max_health:        10,
        entity_stats_acceleration:      0.04,
        entity_stats_pickup_radius:     50,
        entity_stats_luck:              1,
        entity_stats_crit:              0,
        entity_stats_health_regen:      0,

        entity_passive_speed:           0,
        entity_passive_experience:      0,
        entity_passive_magnet_radius:   0,
        entity_passive_move_speed:      0,
        entity_passive_luck:            1,
        entity_passive_damage:          0,

        entity_boost:                   true,
        entity_current_fuel:            100,
        entity_max_fuel:                100,
        entity_fuel_generation:         0.1,

        entity_rotation_mode:           ROTATION_MODE.TILT,
        entity_rotation_target:         0,
        entity_rotation_lerp:           0.1,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.015,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.CHARACTER_ASTRO,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            100,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.ENEMY | ENTITY_CATEGORY.ITEM,
        entity_collider_width:          24,
        entity_collider_height:         24,

        entity_weapon_slots: [
            // {id: WEAPON.REVOLVER, level: 1, modifier: [], timer: 0, projectile_count: 0},
            // {id: WEAPON.FLOPPY_SHIELD, level: 1, modifier: [], timer: 0, projectile_count: 0},
            // {id: WEAPON.BANANARANG, level: 1, modifier: [], timer: 0, projectile_count: 0},
            // {id: WEAPON.RUBBER_DUCKY, level: 1, modifier: [], timer: 0, projectile_count: 0},
            // {id: WEAPON.OLD_CHEESE, level: 1, modifier: [], timer: 0, projectile_count: 0},
            // {id: WEAPON.HONEY_JAR, level: 1, modifier: [], timer: 0, projectile_count: 0},
            // {id: WEAPON.OLD_BOOT, level: 1, modifier: [], timer: 0, projectile_count: 0},
            // {id: WEAPON.MOON_PULSE, level: 1, modifier: [], timer: 0, projectile_count: 0},
            // {id: WEAPON.ROMAN_CANDLE, level: 1, modifier: [], timer: 0, projectile_count: 0},
            {id: WEAPON.RAYGUN, level: 1, modifier: [], timer: 0, projectile_count: 0},
        ],
        
        entity_passive_slots: [
            // {id: PASSIVE.MAGNET, level: 1 },
            // {id: PASSIVE.EXPERIENCE, level: 1 },
            // {id: PASSIVE.LUCK, level: 1 },
            // {id: PASSIVE.MOVE_SPEED, level: 1 },
            // {id: PASSIVE.DAMAGE, level: 1 },
        ],
    }
};

export default PlayerTemplates;
