import ENTITY_CATEGORY from "../../../data/entity/EntityCategory";
import BehaviorSystem from "./BehaviorSystem";

export default class ProjectileSystem {
    constructor(game){
        this.game           = game;
        this.ecs            = game.ecs;
        this.player         = this.ecs.getEntity(this.game.context.player);
        this.behavior       = new BehaviorSystem(this.game);
    }

    update(dt, seconds){
        if(!this.player){
            this.player = this.ecs.getEntity(this.game.context.player);
            return;
        }
        
        this.behavior.update(this.player, this.ecs, dt, seconds);
    }
}