import SystemPipeline from "./SystemPipeline";

export default class CombatPipeline {
    constructor(game) {
        this.pipeline = new SystemPipeline();
        this.pipeline.add(game.systems.weaponSystem);
        this.pipeline.add(game.systems.projectileSystem);

        this.pipeline.add(game.systems.magnetSystem);
        this.pipeline.add(game.systems.impactSystem);

        this.pipeline.add(game.systems.statusEffectSystem);
        
    }

    update(dt, seconds) {
        this.pipeline.update(dt, seconds);
    }

    reset() {
        this.pipeline.reset();
    }
}
