import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";

export default class SpatialSystem {
    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;

        this.cellSize = 32;
        this.grid = new Map();

        this.candidateStamp = new Uint32Array(this.ecs.max);
        this.queryStamp = 0;
    }

    update() {
        this.grid.clear();

        const { alive, entities, nextId } = this.ecs;
        this.ensureStampCapacity(nextId);

        for (let id = 1; id < nextId; id++) {
            if (!alive[id]) continue;

            const entity = entities[id];
            if (!entity || !entity.entity_active || !entity.entity_collider_enabled) continue;

            this.insert(id, entity);
        }
    }

    ensureStampCapacity(required) {
        if (this.candidateStamp.length >= required) return;

        let size = Math.max(this.candidateStamp.length, 1);
        while (size < required) size *= 2;

        const next = new Uint32Array(size);
        next.set(this.candidateStamp);
        this.candidateStamp = next;
    }

    getCellKey(x, y) {
        return x * 100000 + y;
    }

    insert(id, entity) {
        const offsetX = entity.entity_collider_offset_x || 0;
        const offsetY = entity.entity_collider_offset_y || 0;

        const centerX = entity.entity_position_x + offsetX;
        const centerY = entity.entity_position_y + offsetY;

        const shape = entity.entity_collider_shape;
        const radius = entity.entity_collider_radius || 0;
        const width = entity.entity_collider_width || 0;
        const height = entity.entity_collider_height || 0;

        const halfWidth  = shape === "circle" ? radius : width * 0.5;
        const halfHeight = shape === "circle" ? radius : height * 0.5;

        const minX = Math.floor((centerX - halfWidth)  / this.cellSize);
        const maxX = Math.floor((centerX + halfWidth)  / this.cellSize);
        const minY = Math.floor((centerY - halfHeight) / this.cellSize);
        const maxY = Math.floor((centerY + halfHeight) / this.cellSize);

        for (let cellX = minX; cellX <= maxX; cellX++) {
            for (let cellY = minY; cellY <= maxY; cellY++) {
                const key = this.getCellKey(cellX, cellY);

                let cell = this.grid.get(key);
                if (!cell) {
                    cell = [];
                    this.grid.set(key, cell);
                }

                cell.push(id);
            }
        }
    }

    queryRadius(x, y, radius) {
        const results = [];

        const minX = Math.floor((x - radius) / this.cellSize);
        const maxX = Math.floor((x + radius) / this.cellSize);
        const minY = Math.floor((y - radius) / this.cellSize);
        const maxY = Math.floor((y + radius) / this.cellSize);

        const stamp = this.nextQueryStamp();
        const entities = this.ecs.entities;

        for (let cellX = minX; cellX <= maxX; cellX++) {
            for (let cellY = minY; cellY <= maxY; cellY++) {
                const cell = this.grid.get(this.getCellKey(cellX, cellY));
                if (!cell) continue;

                for (const id of cell) {
                    if (this.candidateStamp[id] === stamp) continue;
                    this.candidateStamp[id] = stamp;

                    const entity = entities[id];
                    if (!entity || !entity.entity_active || !entity.entity_collider_enabled) continue;

                    const offsetX = entity.entity_collider_offset_x || 0;
                    const offsetY = entity.entity_collider_offset_y || 0;

                    const entityX = entity.entity_position_x + offsetX;
                    const entityY = entity.entity_position_y + offsetY;

                    const shape = entity.entity_collider_shape;
                    const entityRadius =
                        shape === "circle"
                            ? entity.entity_collider_radius || 0
                            : Math.hypot(
                                (entity.entity_collider_width || 0) * 0.5,
                                (entity.entity_collider_height || 0) * 0.5
                            );

                    const dx = entityX - x;
                    const dy = entityY - y;
                    const combined = radius + entityRadius;

                    if (dx * dx + dy * dy <= combined * combined) {
                        results.push(entity);
                    }
                }
            }
        }

        return results;
    }

    queryEnemyRadius(x, y, radius) {
        const results = [];
        const radiusSq = radius * radius;

        const minX = Math.floor((x - radius) / this.cellSize);
        const maxX = Math.floor((x + radius) / this.cellSize);
        const minY = Math.floor((y - radius) / this.cellSize);
        const maxY = Math.floor((y + radius) / this.cellSize);

        const stamp = this.nextQueryStamp();
        const entities = this.ecs.entities;

        for (let cellX = minX; cellX <= maxX; cellX++) {
            for (let cellY = minY; cellY <= maxY; cellY++) {
                const cell = this.grid.get(this.getCellKey(cellX, cellY));
                if (!cell) continue;

                for (const id of cell) {
                    if (this.candidateStamp[id] === stamp) continue;
                    this.candidateStamp[id] = stamp;

                    const entity = entities[id];
                    if (!entity || !entity.entity_active) continue;
                    if (entity.entity_category !== ENTITY_CATEGORY.ENEMY) continue;

                    const dx = entity.entity_position_x - x;
                    const dy = entity.entity_position_y - y;

                    if (dx * dx + dy * dy <= radiusSq) {
                        results.push(entity);
                    }
                }
            }
        }

        return results;
    }

    nextQueryStamp() {
        this.queryStamp++;

        if (this.queryStamp >= 2_000_000_000) {
            this.candidateStamp.fill(0);
            this.queryStamp = 1;
        }

        return this.queryStamp;
    }
}
