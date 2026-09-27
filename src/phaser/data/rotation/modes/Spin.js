export default function Spin(e, dt) {
    const dir = e.entity_rotation_direction ?? 1;
    e.entity_rotation_angle += e.entity_rotation_speed * dir * dt;
}
