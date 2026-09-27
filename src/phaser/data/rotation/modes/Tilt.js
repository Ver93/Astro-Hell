export default function Tilt(e, dt) {
    const min = e.entity_rotation_min ?? -1;
    const max = e.entity_rotation_max ?? 1;

    e.entity_rotation_target = Math.max(min, Math.min(max, e.entity_rotation_target));

    const lerp = e.entity_rotation_lerp ?? 0.1;

    e.entity_rotation_angle += (e.entity_rotation_target - e.entity_rotation_angle) * lerp * dt;

}
