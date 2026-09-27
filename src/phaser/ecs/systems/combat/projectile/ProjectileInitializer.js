import BulletInitializer from "./BulletInitializer";
import FloppyInitializer from "./FloppyInitializer";
import RubberDuckInitializer from "./RubberDuckInitializer";
import HoneyJarInitializer from "./HoneyJarInitializer";
import PulseInitializer from "./PulseInitializer";
import CheeseInitializer from "./CheeseInitializer";
import BootInitializer from "./BootInitializer";
import FireworkInitializer from "./FireworkInitializer";
import ENTITY_TYPE from "../../../../data/entity/EntityType";

export default class ProjectileInitializer {
    constructor(game) {
        this.initializers = {
            [ENTITY_TYPE.PROJECTILE_BULLET]:      new BulletInitializer(game),
            [ENTITY_TYPE.PROJECTILE_FLOPPY]:      new FloppyInitializer(game),
            [ENTITY_TYPE.PROJECTILE_RUBBER_DUCK]: new RubberDuckInitializer(game),
            [ENTITY_TYPE.PROJECTILE_HONEY_JAR]:   new HoneyJarInitializer(game),
            [ENTITY_TYPE.PROJECTILE_PULSE]:       new PulseInitializer(game),
            [ENTITY_TYPE.PROJECTILE_CHEESE]:      new CheeseInitializer(game),
            [ENTITY_TYPE.PROJECTILE_BOOT]:        new BootInitializer(game),
            [ENTITY_TYPE.PROJECTILE_FIREWORK]:    new FireworkInitializer(game)
        };
    }

    initialize(projectile, player, config, target) {
        const initializer = this.initializers[projectile.entity_type];
        if (!initializer) return;

        initializer.initialize(projectile, player, config, target);
    }
}
