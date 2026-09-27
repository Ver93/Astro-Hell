export default function Velocity(entity) {

    entity.entity_rotation_angle = Math.atan2(
        entity.entity_velocity_y,
        entity.entity_velocity_x
    ) + Math.PI / 2;
}