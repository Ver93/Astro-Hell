
import PlayerTemplates from "../data/entity/player/PlayerTemplates.js";
import EnemyTemplates from "../data/entity/enemy/EnemyTemplates.js";
import ItemTemplates from "../data/entity/item/ItemTemplates.js";
import ProjectileTemplates from "../data/entity/projectile/ProjectileTemplates.js";

import ENTITY_CATEGORY from "../data/entity/EntityCategory.js";
import ENTITY_STATE from "../data/entity/EntityState.js";

import EntityFactory from "./EntityFactory.js";

export default class EntityManager {

    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;

        this.factories = {
            [ENTITY_CATEGORY.PLAYER]:     new EntityFactory(PlayerTemplates),
            [ENTITY_CATEGORY.ENEMY]:      new EntityFactory(EnemyTemplates),
            [ENTITY_CATEGORY.ITEM]:       new EntityFactory(ItemTemplates),
            [ENTITY_CATEGORY.PROJECTILE]: new EntityFactory(ProjectileTemplates)
        };
    }

    createEntity(type, data) {

        const factory = this.factories[type];
        if (!factory) return null;

        const entity = factory.create(data.entity_type, data);
        if (!entity) return null;

        const id = this.ecs.createEntity(entity);

        this.ecs.addComponent(id, entity.entity_type);
        this.ecs.addCategory(id, entity.entity_category);

        entity.entity_id = id;

        return id;
    }

    spawnEntity(category, entity_type) {
        const ids = this.ecs.components[entity_type];

        if (ids) {
            for (const id of ids) {

                const entity = this.ecs.getEntity(id);

                if (!entity) continue;
                if (entity.entity_active) continue;

                entity.entity_active = true;
                entity.entity_sprite_enabled = true;
                entity.entity_collider_enabled = true;

                entity.entity_loot_dropped = false;

                entity.entity_position_x = 0;
                entity.entity_position_y = 0;

                entity.entity_stats_health = entity.entity_stats_max_health;
                entity.entity_state = ENTITY_STATE.IDLE;

                return entity;
            }
        }

        const factory = this.factories[category];

        if (!factory) {
            console.log(
                `[POOL] ERROR: No factory for category ${category}`
            );
            return null;
        }

        const entity = factory.create(entity_type, {
            entity_type: entity_type
        });

        if (!entity) return null;

        const id = this.ecs.createEntity(entity);

        this.ecs.addComponent(id, entity.entity_type);
        this.ecs.addCategory(id, entity.entity_category);

        entity.entity_id = id;
        entity.entity_active = true;
        entity.entity_sprite_enabled = true;
        entity.entity_collider_enabled = true;

        entity.entity_loot_dropped = false;

        entity.entity_position_x = 0;
        entity.entity_position_y = 0;

        entity.entity_stats_health = entity.entity_stats_max_health;
        entity.entity_state = ENTITY_STATE.IDLE;

        return entity;
    }

    despawnEntity(entity) {

        if (!entity) return;

        for (const type in entity.entity_status_effects) {

            const effect = entity.entity_status_effects[type];

            if (effect.visual) {
                effect.visual.stop();
                effect.visual = null;
            }
        }

        entity.entity_active = false;
        entity.entity_sprite_enabled = false;
        entity.entity_collider_enabled = false;
    }

}
