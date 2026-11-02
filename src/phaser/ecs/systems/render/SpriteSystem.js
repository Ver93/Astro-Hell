
export default class SpriteSystem {
    constructor(game) {
        this.game = game;
        this.scene = game.scene;
        this.ecs = game.ecs;
    }

    update() {
        const alive = this.ecs.alive;
        const entities = this.ecs.entities;

        for (let id = 1; id < this.ecs.nextId; id++) {
            if (!alive[id]) continue;

            const e = entities[id];
            if (!e) continue;
            
            if (!e.entity_sprite_enabled) continue;
            if (!e.entity_active) continue;

            if (!e.entity_sprite_object) {
                const s = this.scene.add.sprite(
                    e.entity_position_x,
                    e.entity_position_y,
                    e.entity_sprite_texture
                );


                s.setDepth(e.entity_sprite_depth);
                s.setVisible(e.entity_sprite_enabled);
                s.setScale(e.entity_scale || 1);

                e.entity_sprite_object = s;
            }
        }
    }

    reset() {

        const entities = this.ecs.entities;
        const alive = this.ecs.alive;

        for (let id = 1; id < this.ecs.nextId; id++) {

            const entity = entities[id];

            if (!entity) continue;

            const sprite = entity.entity_sprite_object;

            if (sprite) {
                sprite.destroy();
                entity.entity_sprite_object = null;
            }
        }
    }
}
