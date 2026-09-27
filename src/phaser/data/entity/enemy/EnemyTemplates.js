
import ROTATION_MODE from "../../rotation/modes/RotationMode";
import ENTITY_STATE from "../EntityState";
import TEXTURE from "../../../../shared/data/character/Texture";
import ENTITY_CATEGORY from "../EntityCategory";
import ENTITY_TYPE from "../EntityType";

const EnemyTemplates = {
    [ENTITY_TYPE.ENEMY_COMET]: {
       entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_state:                   ENTITY_STATE.IDLE,
        entity_category:                ENTITY_CATEGORY.ENEMY,
        entity_type:                    ENTITY_TYPE.ENEMY_COMET,

        entity_rotation_mode:           ROTATION_MODE.SPIN,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.03,

        entity_sprite_texture:          TEXTURE.ENEMY_COMET,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            95,

        entity_stats_speed:             2,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,
        entity_movement_slowed:         false,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER | ENTITY_CATEGORY.PROJECTILE | ENTITY_CATEGORY.ENEMY ,
        entity_collider_width:          24,
        entity_collider_height:         24,

        entity_drop_loot:               true,
        entity_loot_table:              [ENTITY_TYPE.ITEM_CRYSTAL],
        entity_loot_chance:             0.5,
    },

    [ENTITY_TYPE.ENEMY_SATELLITE]: {
       entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_state:                   ENTITY_STATE.IDLE,
        entity_category:                ENTITY_CATEGORY.ENEMY,
        entity_type:                    ENTITY_TYPE.ENEMY_SATELLITE,

        entity_rotation_mode:           ROTATION_MODE.SPIN,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.03,

        entity_sprite_texture:          TEXTURE.ENEMY_SATELLITE,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            95,

        entity_stats_speed: 1,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,
        entity_movement_slowed:         false,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER | ENTITY_CATEGORY.PROJECTILE | ENTITY_CATEGORY.ENEMY,
        entity_collider_width:          24,
        entity_collider_height:         24,

        entity_drop_loot:               true,
        entity_loot_table:              [ENTITY_TYPE.ITEM_CRYSTAL],
        entity_loot_chance:             0.5,
    },

    [ENTITY_TYPE.ENEMY_GRUB]: {
       entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_state:                   ENTITY_STATE.IDLE,
        entity_category:                ENTITY_CATEGORY.ENEMY,
        entity_type:                    ENTITY_TYPE.ENEMY_GRUB,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ENEMY_GRUB,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            95,

        entity_stats_speed:             1,
        entity_stats_health:            2,

        entity_speed:                   1,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,
        entity_movement_slowed:         false,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER | ENTITY_CATEGORY.PROJECTILE | ENTITY_CATEGORY.ENEMY,
        entity_collider_width:          24,
        entity_collider_height:         24,

        entity_drop_loot:               true,
        entity_loot_table:              [ENTITY_TYPE.ITEM_CRYSTAL],
        entity_loot_chance:             0.5,
    },

    [ENTITY_TYPE.ENEMY_BEE]: {
       entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_state:                   ENTITY_STATE.IDLE,
        entity_category:                ENTITY_CATEGORY.ENEMY,
        entity_type:                    ENTITY_TYPE.ENEMY_BEE,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.03,

        entity_sprite_texture:          TEXTURE.ENEMY_BEE,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            95,

        entity_stats_speed: 1,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,
        entity_movement_slowed:         false,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER | ENTITY_CATEGORY.PROJECTILE | ENTITY_CATEGORY.ENEMY,
        entity_collider_width:          24,
        entity_collider_height:         24,

        entity_drop_loot:               true,
        entity_loot_table:              [ENTITY_TYPE.ITEM_CRYSTAL],
        entity_loot_chance:             0.5,
    },
};

export default EnemyTemplates;
