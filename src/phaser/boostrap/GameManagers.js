// import FireworkExplosionEffect from "/effects/particle/effects/FireworkExplosionEffect";
// import FireworkTrailEffect from "../effects/particle/effects/FireworkTrailEffect";
// import OldCheeseCloudEffect from "../effects/particle/effects/OldCheeseCloudEffect";
// import UpgradeParticleEffect from "../effects/particle/effects/UpgradeParticleEffect";
// import ParticleManager from "../effects/particle/ParticleManager";
import EntityManager from "../entity/EntityManager";
import UpgradeManager from "../managers/UpgradeManager";

export default class GameManagers {
    constructor(game){
        this.game = game;
        // this.entity         = null;
        // this.particle       = null;
        // this.upgrade        = null;
        this.entity         = new EntityManager(this.game);
        // this.particle       = new ParticleManager(this.game);
        // this.particle.add("upgrade", new UpgradeParticleEffect(this.game));
        // this.particle.add("trail", () => new FireworkTrailEffect(this.game));
        // this.particle.add("firework_explosion", () => new FireworkExplosionEffect(this.game));
        // this.particle.add("cloud", new OldCheeseCloudEffect(this.game));
    
        this.upgrade        = new UpgradeManager(this.game);
    }

    update(dt, seconds){
        // this.entity.update();
    }
}