const NONE = -1;

const BaseTemplate = {
    base_entity: {
        entity_id:                      NONE,

        entity_active:                  false,
        entity_state:                   NONE,
        
        entity_width:                   NONE,
        entity_height:                  NONE,
        entity_scale:                   NONE,
        
        entity_category:                NONE,
        entity_type:                    NONE,
        
        entity_timer:                   NONE,
        entity_lifetime:                NONE,

        entity_speed:                   NONE,
        entity_health:                  NONE,

        
        entity_position_x:              NONE,
        entity_position_y:              NONE,
        
        entity_velocity_x:              NONE,
        entity_velocity_y:              NONE,

        entity_rotation_enabled:        true,
        entity_rotation_mode:           NONE,
        entity_rotation_angle:          NONE,
        entity_rotation_speed:          NONE,
        entity_rotation_target:         NONE,
        entity_rotation_min:            NONE,
        entity_rotation_max:            NONE,
        entity_rotation_lerp:           NONE,
        entity_rotation_direction:      NONE,
        
        entity_sprite_enabled:          true,
        entity_sprite_texture:          NONE,
        entity_sprite_depth:            NONE,
        
        entity_movement_enabled:        true,
        entity_movement_pattern:        NONE,
        entity_movement_target:         NONE,
        entity_movement_owner:          NONE,
        entity_movement_angle:          NONE,
        entity_movement_direction_x:    NONE,
        entity_movement_direction_y:    NONE,
        
        entity_collider_enabled:        true,
        entity_collider_shape:          NONE,
        entity_collider_scale:          NONE,
        entity_collider_mask:           NONE,
        entity_collider_width:          NONE,
        entity_collider_height:         NONE,
        entity_collider_radius:         NONE,
        entity_collider_offset_x:       NONE,
        entity_collider_offset_y:       NONE,

        entity_stats_enabled:           true,
        entity_stats_health:            1,
        entity_stats_max_health:        1,
        entity_stats_speed:             1,
        entity_stats_acceleration:      1,
        entity_stats_damage:            1,

        entity_stats_modifiers:         {},
        entity_status_effects:          {},

        entity_cooldown:                NONE,
    }
}

export default BaseTemplate;

