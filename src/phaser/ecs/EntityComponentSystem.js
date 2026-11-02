export default class EntityComponentSystem {

    constructor(maxEntities = 10000) {
        this.max = maxEntities;

        this.alive = new Uint8Array(maxEntities);
        this.entities = new Array(maxEntities);

        this.nextId = 1;
        this.freeIds = [];

        this.components = {};
        this.categories = {};
    }


    reset() {
        this.alive.fill(0);

        this.entities.fill(undefined);

        this.nextId = 1;
        this.freeIds = [];

        this.components = {};
        this.categories = {};
    }


    createEntity(entityData) {
        let id = this.freeIds.length > 0
            ? this.freeIds.pop()
            : this.nextId++;

        if (id >= this.max) {
            throw new Error("Max entity count reached");
        }

        this.alive[id] = 1;
        this.entities[id] = entityData;

        return id;
    }


    destroyEntity(id) {
        if (!this.alive[id]) return;

        this.alive[id] = 0;
        this.entities[id] = undefined;

        for (const type in this.components) {
            const list = this.components[type];
            const index = list.indexOf(id);

            if (index !== -1) {
                list[index] = list[list.length - 1];
                list.pop();
            }
        }

        for (const category in this.categories) {
            const list = this.categories[category];
            const index = list.indexOf(id);

            if (index !== -1) {
                list[index] = list[list.length - 1];
                list.pop();
            }
        }

        this.freeIds.push(id);
    }


    getEntity(id) {
        return this.entities[id];
    }


    getIdsByType(type) {
        return this.components[type];
    }


    getIdsByCat(category) {
        return this.categories[category];
    }


    forEach(callback) {
        for (let id = 1; id < this.nextId; id++) {
            if (this.alive[id]) {
                callback(id, this.entities[id]);
            }
        }
    }


    addComponent(id, type) {
        if (!this.components[type]) {
            this.components[type] = [];
        }

        this.components[type].push(id);
    }


    removeComponent(id, type) {
        const list = this.components[type];

        if (!list) return;

        const index = list.indexOf(id);

        if (index !== -1) {
            list[index] = list[list.length - 1];
            list.pop();
        }
    }


    addCategory(id, category) {
        if (!this.categories[category]) {
            this.categories[category] = [];
        }

        this.categories[category].push(id);
    }


    removeCategory(id, category) {
        const list = this.categories[category];

        if (!list) return;

        const index = list.indexOf(id);

        if (index !== -1) {
            list[index] = list[list.length - 1];
            list.pop();
        }
    }


    countByType(type) {
        const list = this.components[type];

        if (!list) return 0;

        return list.length;
    }


    countByCat(category) {
        const list = this.categories[category];

        if (!list) return 0;

        return list.length;
    }


    countActiveEntities() {
        let count = 0;

        for (let id = 1; id < this.nextId; id++) {
            if (this.alive[id]) {
                const entity = this.entities[id];

                if (entity && entity.entity_active) {
                    count++;
                }
            }
        }

        return count;
    }


    countActiveEntitiesByType(type) {
        const list = this.components[type];

        if (!list) return 0;

        let count = 0;

        for (const id of list) {
            if (!this.alive[id]) continue;

            const entity = this.entities[id];

            if (entity && entity.entity_active) {
                count++;
            }
        }

        return count;
    }


    countActiveEntitiesByCat(cat) {
        const list = this.categories[cat];

        if (!list) return 0;

        let count = 0;

        for (const id of list) {
            if (!this.alive[id]) continue;

            const entity = this.entities[id];

            if (entity && entity.entity_active) {
                count++;
            }
        }

        return count;
    }
}