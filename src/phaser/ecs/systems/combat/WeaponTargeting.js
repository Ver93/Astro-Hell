import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";

export default class WeaponTargeting {

    constructor(game) {
        this.game = game;
        this.spatial = null;
    }


    setSpatial(spatial) {
        this.spatial = spatial;
    }


    findNearestEnemy(
        x,
        y,
        radius,
        targets
    ) {

        if (!this.spatial) {
            return null;
        }


        const entities =
            this.spatial.queryRadius(
                x,
                y,
                radius
            );


        let nearest = null;
        let nearestDistance = Infinity;


        for (const entity of entities) {

            if (
                !entity ||
                !entity.entity_active
            ) {
                continue;
            }


            if (
                entity.entity_category !==
                ENTITY_CATEGORY.ENEMY
            ) {
                continue;
            }


            if (
                targets &&
                targets.has(entity.entity_id)
            ) {
                continue;
            }


            const dx =
                entity.entity_position_x - x;

            const dy =
                entity.entity_position_y - y;


            const distance =
                dx * dx +
                dy * dy;


            if (distance < nearestDistance) {

                nearestDistance = distance;
                nearest = entity;
            }
        }


        return nearest;
    }


    applyRandomTarget(
        projectile,
        player
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            Math.random() * 800;


        projectile.entity_target_x =
            player.entity_position_x +
            Math.cos(angle) * distance;


        projectile.entity_target_y =
            player.entity_position_y +
            Math.sin(angle) * distance;
    }
}