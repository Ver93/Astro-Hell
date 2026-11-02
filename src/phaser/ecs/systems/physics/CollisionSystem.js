import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";

export default class CollisionSystem {

    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.scene = game.scene;
        this.spatial = null;

        this.collisionA = new Uint32Array(this.ecs.max);
        this.collisionB = new Uint32Array(this.ecs.max);
        this.collisionX = new Float32Array(this.ecs.max);
        this.collisionY = new Float32Array(this.ecs.max);
        this.collisionCount = 0;

        this.overlapA = new Uint32Array(this.ecs.max);
        this.overlapB = new Uint32Array(this.ecs.max);
        this.overlapCount = 0;

        this.previousCollisions = new Set();
        this.activeCollisions = new Set();

        this.colliders = [];
        this.debug = false;

        if (this.debug) {
            this.debugGraphics = this.scene.add.graphics();
            this.debugGraphics.setDepth(999999);
            this.debugGraphics.setScrollFactor(1);
        }
    }

    reset() {
        this.collisionCount = 0;
        this.overlapCount = 0;

        this.colliders.length = 0;

        this.previousCollisions.clear();
        this.activeCollisions.clear();

        this.spatial = null;

        if (this.debugGraphics) {
            this.debugGraphics.clear();
        }
    }

    update() {
        if(!this.spatial){
            this.spatial = this.game.systems.spatialSystem;
            return;
        }

        this.collisionCount = 0;
        this.overlapCount = 0;
        this.colliders.length = 0;

        if (this.debug) {
            this.debugGraphics.clear();
            this.debugGraphics.lineStyle(2, 0xff0000, 1);
        }

        const alive = this.ecs.alive;
        const entities = this.ecs.entities;
        const max = this.ecs.nextId;

        for (let id = 1; id < max; id++) {
            if (!alive[id]) continue;

            const entity = entities[id];
            if (!entity || !entity.entity_active || !entity.entity_collider_enabled) continue;

            this.colliders.push(id);

            if (this.debug) {
                this.drawCollider(entity);
            }
        }

        const colliders = this.colliders;

        for (let idx = 0; idx < colliders.length; idx++) {
            const id = colliders[idx];
            const A = entities[id];
            if (!A) continue;

            const offsetAX = A.entity_collider_offset_x || 0;
            const offsetAY = A.entity_collider_offset_y || 0;

            const centerAX = A.entity_position_x + offsetAX;
            const centerAY = A.entity_position_y + offsetAY;

            const radiusA = A.entity_collider_radius;
            const widthA = A.entity_collider_width;
            const heightA = A.entity_collider_height;
            const shapeA = A.entity_collider_shape;

            const halfWidthA = shapeA === "circle" ? radiusA : widthA * 0.5;
            const halfHeightA = shapeA === "circle" ? radiusA : heightA * 0.5;

            const radius = Math.max(halfWidthA, halfHeightA);

            const candidates = this.spatial.queryRadius(centerAX, centerAY, radius);

            for (let i = 0; i < candidates.length; i++) {
                const B = candidates[i];
                if (!B) continue;

                if (B.entity_id <= id) continue;

                if ((A.entity_collider_mask & B.entity_category) === 0 ||
                    (B.entity_collider_mask & A.entity_category) === 0) {
                    continue;
                }

                const offsetBX = B.entity_collider_offset_x || 0;
                const offsetBY = B.entity_collider_offset_y || 0;

                const centerBX = B.entity_position_x + offsetBX;
                const centerBY = B.entity_position_y + offsetBY;

                if (!this.checkCollision(A, B, centerAX, centerAY, centerBX, centerBY)) continue;

                // Enemy <> Enemy
                if (
                    A.entity_category === ENTITY_CATEGORY.ENEMY &&
                    B.entity_category === ENTITY_CATEGORY.ENEMY
                ) {
                    const overlapIndex = this.overlapCount++;

                    this.overlapA[overlapIndex] = id;
                    this.overlapB[overlapIndex] = B.entity_id;
                }

                const collisionKey = id * this.ecs.max + B.entity_id;
                this.activeCollisions.add(collisionKey);

                if (this.previousCollisions.has(collisionKey)) continue;

                const index = this.collisionCount++;

                this.collisionA[index] = id;
                this.collisionB[index] = B.entity_id;
                this.collisionX[index] = (centerAX + centerBX) * 0.5;
                this.collisionY[index] = (centerAY + centerBY) * 0.5;
            }
        }

        const old = this.previousCollisions;
        this.previousCollisions = this.activeCollisions;
        this.activeCollisions = old;
        this.activeCollisions.clear();
    }

    checkCollision(A, B, ax, ay, bx, by) {
        const shapeA = A.entity_collider_shape;
        const shapeB = B.entity_collider_shape;

        const radiusA = A.entity_collider_radius;
        const radiusB = B.entity_collider_radius;

        const widthA = A.entity_collider_width;
        const heightA = A.entity_collider_height;

        const widthB = B.entity_collider_width;
        const heightB = B.entity_collider_height;

        if (shapeA === "circle" && shapeB === "circle") {
            const radius = radiusA + radiusB;
            const dx = bx - ax;
            const dy = by - ay;
            return dx * dx + dy * dy <= radius * radius;
        }

        if (shapeA === "circle") {
            return this.checkCircleBox(ax, ay, radiusA, bx, by, widthB, heightB);
        }

        if (shapeB === "circle") {
            return this.checkCircleBox(bx, by, radiusB, ax, ay, widthA, heightA);
        }

        return this.checkBoxBox(ax, ay, widthA, heightA, bx, by, widthB, heightB);
    }

    checkCircleBox(circleX, circleY, radius, boxX, boxY, boxWidth, boxHeight) {
        const halfW = boxWidth * 0.5;
        const halfH = boxHeight * 0.5;

        const closestX = Math.max(boxX - halfW, Math.min(circleX, boxX + halfW));
        const closestY = Math.max(boxY - halfH, Math.min(circleY, boxY + halfH));

        const dx = circleX - closestX;
        const dy = circleY - closestY;

        return dx * dx + dy * dy <= radius * radius;
    }

    checkBoxBox(x1, y1, w1, h1, x2, y2, w2, h2) {
        const hw1 = w1 * 0.5;
        const hh1 = h1 * 0.5;

        const hw2 = w2 * 0.5;
        const hh2 = h2 * 0.5;

        return !(
            x1 - hw1 >= x2 + hw2 ||
            x1 + hw1 <= x2 - hw2 ||
            y1 - hh1 >= y2 + hh2 ||
            y1 + hh1 <= y2 - hh2
        );
    }

    drawCollider(e) {
        const x = e.entity_position_x + (e.entity_collider_offset_x || 0);
        const y = e.entity_position_y + (e.entity_collider_offset_y || 0);

        if (e.entity_collider_shape === "circle") {
            const r = e.entity_collider_radius;
            if (!r) return;
            this.debugGraphics.strokeCircle(x, y, r);
            return;
        }

        const w = e.entity_collider_width;
        const h = e.entity_collider_height;

        if (!w || !h) return;

        this.debugGraphics.strokeRect(x - w * 0.5, y - h * 0.5, w, h);
    }
}