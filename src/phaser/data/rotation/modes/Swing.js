export default function Swing(e, dt) {

    e.rotation_time =
        (e.rotation_time ?? 0) + dt;

    e.entity_rotation_angle =
        Math.sin(
            e.rotation_time *
            e.entity_rotation_speed
        ) *
        (
            e.entity_rotation_max -
            e.entity_rotation_min
        ) * 0.5 +
        (
            e.entity_rotation_max +
            e.entity_rotation_min
        ) * 0.5;
}