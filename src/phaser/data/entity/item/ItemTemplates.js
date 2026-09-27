import ROTATION_MODE from "../../rotation/modes/RotationMode";
import ENTITY_STATE from "../EntityState";
import TEXTURE from "../../../../shared/data/character/Texture";
import ENTITY_CATEGORY from "../EntityCategory";
import ENTITY_TYPE from "../EntityType";

const ItemTemplates = {
    [ENTITY_TYPE.ITEM_CRYSTAL]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   2,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_CRYSTAL,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.015,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_CRYSTAL,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            1,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          16,
        entity_collider_height:         16,

        entity_value:                   1,
    },

    [ENTITY_TYPE.ITEM_EXPERIENCE]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   1,

        item_collet:                    true,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_EXPERIENCE,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_EXPERIENCE,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            1,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          16,
        entity_collider_height:         16,

        entity_value:                   1,
    },

    [ENTITY_TYPE.ITEM_DYNAMITE]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_DYNAMITE,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_DYNAMITE,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            100,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          16,
        entity_collider_height:         16,

        entity_value:                   0,
    },

    [ENTITY_TYPE.ITEM_DIAMOND]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_DIAMOND,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_DIAMOND,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            100,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          16,
        entity_collider_height:         16,

        entity_value:                   1,
    },

    [ENTITY_TYPE.ITEM_SAPPHIRE]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_SAPPHIRE,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_SAPPHIRE,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            100,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          16,
        entity_collider_height:         16,

        entity_value:                   1,
    },

    [ENTITY_TYPE.ITEM_RUBY]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_RUBY,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_RUBY,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            100,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          16,
        entity_collider_height:         16,

        entity_value:                   1,
    },

    [ENTITY_TYPE.ITEM_TOPAZ]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_TOPAZ,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_TOPAZ,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            100,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          16,
        entity_collider_height:         16,

        entity_value:                   1,
    },

    [ENTITY_TYPE.ITEM_CROWN]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   1.5,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_CROWN,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_CROWN,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            100,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          16,
        entity_collider_height:         16,

        entity_value:                   1,
    },

    [ENTITY_TYPE.ITEM_TREASURE]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   1.5,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_TREASURE,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_TREASURE,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            100,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          32,
        entity_collider_height:         32,

        entity_value:                   1,
    },

    [ENTITY_TYPE.ITEM_COLLECTOR]: {
        entity_active:                  true,
        entity_width:                   16,
        entity_height:                  16,
        entity_scale:                   3,

        entity_category:                ENTITY_CATEGORY.ITEM,
        entity_state:                   ENTITY_STATE.IDLE,
        entity_type:                    ENTITY_TYPE.ITEM_COLLECTOR,

        entity_stats_speed:             5,
        entity_stats_acceleration:      0.05,

        entity_rotation_mode:           ROTATION_MODE.SWING,
        entity_rotation_angle:          0,
        entity_rotation_speed:          0.1,
        entity_rotation_min:            -0.5,
        entity_rotation_max:            0.5,

        entity_sprite_texture:          TEXTURE.ITEM_COLLECTOR,
        entity_sprite_enabled:          true,
        entity_sprite_depth:            100,

        entity_movement_target:         0,
        entity_movement_angle:          0,
        entity_movement_direction_x:    0,
        entity_movement_direction_y:    0,

        entity_collider_enabled:        true,
        entity_collider_mask:           ENTITY_CATEGORY.PLAYER,
        entity_collider_width:          16,
        entity_collider_height:         16,

        entity_value:                   1,
    },
};

export default ItemTemplates;
