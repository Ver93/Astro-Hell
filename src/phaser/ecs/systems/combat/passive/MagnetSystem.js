import ENTITY_CATEGORY from "../../../../data/entity/EntityCategory";
import ENTITY_STATE from "../../../../data/entity/EntityState";
import ENTITY_TYPE from "../../../../data/entity/EntityType";
import WEAPON from "../../../../data/weapon/Weapon";
import WeaponDefinitions from "../../../../data/weapon/WeaponDefinitions";
import UpgradeDefinitions from "../../../../../shared/data/upgrade/UpgradeDefinitions";
import PASSIVE from "../../../../data/passive/Passive";

export default class MagnetSystem {

    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.context = game.context;

        this.passive_slot = null;
    }

    update(dt, seconds){
        const playerId = this.context.player;

        if (playerId === null) return;

        const player = this.ecs.getEntity(playerId);
        if (!player) return;

        const slots = player.entity_passive_slots;
        if (!slots)return;

        const passiveSlot = slots.find(slot => slot && slot.id === PASSIVE.MAGNET);
        let radius = player.entity_stats_pickup_radius;

        if (passiveSlot){
            radius = player.entity_stats_pickup_radius + player.entity_passive_magnet_radius;
        } 

        if(!this.passive_slot){
            this.passive_slot = passiveSlot;
        }

        const radiusSquared = radius * radius;
        
        const items = this.ecs.categories[ENTITY_CATEGORY.ITEM];
        if (!items || items.length === 0) return;

        for (const id of items) {

            const item = this.ecs.getEntity(id);
            if (!item || !item.entity_active)continue;

            if (
                item.entity_type === ENTITY_TYPE.ITEM_TREASURE || 
                item.entity_type === ENTITY_TYPE.ITEM_CROWN || 
                item.entity_type === ENTITY_TYPE.ITEM_DYNAMITE
            ) continue;

            const dx = player.entity_position_x - item.entity_position_x;
            const dy = player.entity_position_y - item.entity_position_y;

            const distanceSquared = dx * dx + dy * dy;

            if (distanceSquared === 0)
                continue;

            const distance = Math.sqrt(distanceSquared);

            const nx = dx / distance;
            const ny = dy / distance;

            if (item.item_collect) {
                item.entity_position_x += nx * item.entity_stats_speed * dt;
                item.entity_position_y += ny * item.entity_stats_speed *dt;
                continue;
            }

            if (distanceSquared > radiusSquared) continue;

            item.entity_position_x += nx * item.entity_stats_speed * dt;
            item.entity_position_y += ny * item.entity_stats_speed * dt;
        }
    }
}