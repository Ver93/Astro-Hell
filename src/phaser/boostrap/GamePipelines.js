
import CombatPipeline from "./pipelines/CombatPipeline";
import LifetimeSystem from "./pipelines/LifetimePipeline";
import MovementPipeline from "./pipelines/MovementPipeline";
import PhysicsPipeline from "./pipelines/PhysicsPipeline";
import PlayerPipeline from "./pipelines/PlayerPipeline";
import RenderPipeline from "./pipelines/RenderPipeline";
import WorldPipeline from "./pipelines/WorldPipeline";


export default class GamePipelines {
    constructor(game){
        this.game = game;
        this.playerPipeline     = new PlayerPipeline(game);
        this.movementPipeline   = new MovementPipeline(game);
        this.combatPipeline     = new CombatPipeline(game);
        this.physicsPipeline    = new PhysicsPipeline(game);
        this.worldPipeline      = new WorldPipeline(game);
        this.lifetimePipeline   = new LifetimeSystem(game);
        this.renderPipeline     = new RenderPipeline(game);
        this.debug              = false;
    }

    update(dt, seconds){
        if(this.debug){
        const start = performance.now();

        let t = performance.now();
        this.playerPipeline.update(dt, seconds);
        const player = performance.now() - t;

        t = performance.now();
        this.movementPipeline.update(dt, seconds);
        const movement = performance.now() - t;

        t = performance.now();
        this.combatPipeline.update(dt, seconds);
        const combat = performance.now() - t;

        t = performance.now();
        this.physicsPipeline.update(dt, seconds);
        const physics = performance.now() - t;

        t = performance.now();
        this.worldPipeline.update(dt, seconds);
        const world = performance.now() - t;

        t = performance.now();
        this.lifetimePipeline.update(dt, seconds);
        const lifetime = performance.now() - t;

        t = performance.now();
        this.renderPipeline.update(dt, seconds);
        const render = performance.now() - t;

        const total = performance.now() - start;

            if (Math.random() < 0.05) {
                console.table({
                    player: player.toFixed(3),
                    movement: movement.toFixed(3),
                    combat: combat.toFixed(3),
                    physics: physics.toFixed(3),
                    world: world.toFixed(3),
                    lifetime: lifetime.toFixed(3),
                    render: render.toFixed(3),
                    total: total.toFixed(3)
                });
            }
        } else {
            this.playerPipeline.update(dt,  seconds);
            this.movementPipeline.update(dt, seconds);
            this.combatPipeline.update(dt, seconds);
            this.physicsPipeline.update(dt, seconds);
            this.worldPipeline.update(dt, seconds);
            this.lifetimePipeline.update(dt, seconds);
            this.renderPipeline.update(dt, seconds);
        }
    }

    reset(){
        this.playerPipeline.reset();
        this.renderPipeline.reset();
        this.movementPipeline.reset();
        this.combatPipeline.reset();
        this.physicsPipeline.reset();
        this.worldPipeline.reset();
        this.lifetimePipeline.reset();
    }
}