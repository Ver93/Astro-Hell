const WEAPON = {
    BANANARANG:     0,
    FLOPPY_SHIELD:  1,
    REVOLVER:       2,
    RUBBER_DUCKY:   3,
    HONEY_JAR:      4,
    HONEY_POOL:     5,
    ROMAN_CANDLE:   6,
    MOON_PULSE:     7,
    OLD_BOOT:       8,
    OLD_CHEESE:     9,
    RAYGUN:         10,
};

export default WEAPON;

// import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";
// import ENTITY_TYPE from "../../../data/entity/EntityType";
// import ProjectileTemplates from "../../../data/entity/projectile/ProjectileTemplates";
// import WeaponDefinitions from "../../../data/weapon/WeaponDefinitions";

// export default class WeaponSystem {
//     constructor(game) {
//         this.game          = game;
//         this.ecs           = game.ecs;
//         this.playerID      = game.context.player;
//         this.entityManager = game.entity;
//         this.spatial       = null;

//         this.playerEntity  = this.ecs.getEntity(this.playerID);
//         this.playerWeapons = this.playerEntity.entity_weapon_slots;
//     }

//     update(dt, seconds) {

//         if (!this.spatial) {
//             this.spatial = this.game.systems.spatialSystem;
//             return;
//         }

//         if (!this.playerEntity || !this.playerWeapons) return;

//         for (const weapon of this.playerWeapons) {

//             const def = WeaponDefinitions[weapon.id];
//             if (!def) continue;

//             weapon.timer -= seconds;

//             if (weapon.timer > 0) continue;

//             weapon.timer = def.weapon_cooldown;

//             weapon.projectile_targets = new Set();

//             console.log(this.ecs.countActiveEntitiesByType(def.projectile_type));
//             for (let i = 0; i < def.projectile_spawn_count; i++) {

//                 if (
//                     this.ecs.countActiveEntitiesByType(def.projectile_type) >=
//                     def.projectile_max_count
//                 ) {
//                     break;
//                 }

//                 const proj = this.entityManager.spawnEntity(
//                     ENTITY_CATEGORY.PROJECTILE,
//                     def.projectile_type
//                 );

//                 if (!proj) continue;

//                 proj.entity_position_x =
//                     this.playerEntity.entity_position_x;

//                 proj.entity_position_y =
//                     this.playerEntity.entity_position_y;

//                 // Find target
//                 const target = this.findNearestEnemy(
//                     this.playerEntity.entity_position_x,
//                     this.playerEntity.entity_position_y,
//                     800,
//                     weapon.projectile_targets
//                 );

//                 if (target) {

//                     weapon.projectile_targets.add(target.entity_id);

//                     proj.entity_target_x =
//                         target.entity_position_x;

//                     proj.entity_target_y =
//                         target.entity_position_y;

//                 } else {

//                     const angle =
//                         Math.random() * Math.PI * 2;

//                     const distance =
//                         Math.random() * 800;

//                     proj.entity_target_x =
//                         this.playerEntity.entity_position_x +
//                         Math.cos(angle) * distance;

//                     proj.entity_target_y =
//                         this.playerEntity.entity_position_y +
//                         Math.sin(angle) * distance;
//                 }

//                 if (proj.entity_type === ENTITY_TYPE.PROJECTILE_FLOPPY) {
//                     proj.entity_orbit_index = i;
//                     proj.entity_orbit_total = def.projectile_max_count;
//                 }

//                 if (proj.entity_type === ENTITY_TYPE.PROJECTILE_RUBBER_DUCK) {
//                     const angle = Math.random() * Math.PI * 2;
//                     proj.entity_movement_direction_x = Math.cos(angle);
//                     proj.entity_movement_direction_y = Math.sin(angle);
//                 }

//                 if (proj.entity_type === ENTITY_TYPE.PROJECTILE_BULLET) {
//                     const angle = (Math.PI * 2 / def.projectile_max_count) * i;
//                     const speed = proj.entity_stats_speed;

//                     proj.entity_velocity_x = Math.cos(angle) * speed;
//                     proj.entity_velocity_y = Math.sin(angle) * speed;
//                 }
//             }
//         }
//     }

//     findNearestEnemy(x, y, radius, targets) {

//         const entities = this.spatial.queryRadius(x, y, radius);

//         let nearest = null;
//         let nearestDistance = Infinity;

//         for (const entity of entities) {

//             if (!entity || !entity.entity_active) continue;
//             if (entity.entity_category !== ENTITY_CATEGORY.ENEMY) continue;
//             if (targets && targets.has(entity.entity_id)) continue;

//             const dx =
//                 entity.entity_position_x - x;

//             const dy =
//                 entity.entity_position_y - y;

//             const distance =
//                 dx * dx + dy * dy;

//             if (distance < nearestDistance) {
//                 nearestDistance = distance;
//                 nearest = entity;
//             }
//         }

//         return nearest;
//     }
// }
