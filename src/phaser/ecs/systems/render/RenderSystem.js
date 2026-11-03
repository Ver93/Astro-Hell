import STATUS_EFFECTS from "../../../data/damage/StatusEffects";
import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";

export default class RenderSystem {
    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
    }

    update() {
        const alive = this.ecs.alive;
        const entities = this.ecs.entities;

        const player = this.ecs.getEntity(this.game.context.player);
        if (!player) return;

        for (let id = 1; id < this.ecs.nextId; id++) {
            if (!alive[id]) continue;

            const e = entities[id];
            if (!e) continue;

            const sprite = e.entity_sprite_object;
            if (!sprite) continue;

            sprite.x = e.entity_position_x;
            sprite.y = e.entity_position_y;
            sprite.setVisible(e.entity_sprite_enabled);

            if (e.entity_rotation_mode !== -1) {
                sprite.rotation = e.entity_rotation_angle;
            }

            const size = e.entity_scale;
            if (!size) continue;

            sprite.setScale(size);

            if(e.entity_category == ENTITY_CATEGORY.ENEMY){
                const dx = player.entity_position_x - e.entity_position_x;
                const flipThreshold = 5;
    
                if (dx < -flipThreshold) {
                    e.entity_flip_x = true;
                } else if (dx > flipThreshold) {
                    e.entity_flip_x = false;
                }
    
                sprite.setFlipX(e.entity_flip_x ?? false);
            }

            this.updateStatusVisual(e, sprite);
        }
    }

    updateStatusVisual(entity, sprite) {
        const effects = entity.entity_status_effects;

        if (!effects) {
            sprite.clearTint();
            return;
        }

        for (const type in effects) {
            const effect = effects[type];
            if (!effect || effect.timer <= 0) continue;

            switch (Number(type)) {
                case STATUS_EFFECTS.FROZEN:
                    sprite.setTint(0x8fa9c9);
                    return;

                case STATUS_EFFECTS.HONEY:
                    sprite.setTint(0xc9b96e);
                    return;

                case STATUS_EFFECTS.POISON:
                    sprite.setTint(0x79b879);
                    return;
            }
        }

        sprite.clearTint();
    }
}
