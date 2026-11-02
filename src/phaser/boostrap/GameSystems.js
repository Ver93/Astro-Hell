
import WeaponSystem from "../ecs/systems/combat/WeaponSystem";
import LifetimeSystem from "../ecs/systems/lifetime/LifetimeSystem";
import MovementSystem from "../ecs/systems/movement/MovementSystem";
import RotationSystem from "../ecs/systems/movement/RotationSystem";
import CollisionSystem from "../ecs/systems/physics/CollisionSystem";
import InputSystem from "../ecs/systems/player/InputSystem";
import PlayerSystem from "../ecs/systems/player/PlayerSystem";
import BackgroundSystem from "../world/BackgroundSystem";
import RenderSystem from "../ecs/systems/render/RenderSystem";
import SpriteSystem from "../ecs/systems/render/SpriteSystem";
import HealthSystem from "../ecs/systems/lifetime/HealthSystem";
import BoundarySystem from "../ecs/systems/lifetime/BoundrySystem";

import WorldSpawnerSystem from "../world/WorldSpawnerSystem";
import MagnetSystem from "../ecs/systems/combat/passive/MagnetSystem";
import DropSystem from "../ecs/systems/lifetime/DropSystem";
import ImpactSystem from "../ecs/systems/combat/ImpactSystem";
import ProjectileSystem from "../ecs/systems/combat/ProjectileSystem";
import SpatialSystem from "../ecs/systems/spatial/SpatialSystem";
import StatusEffectSystem from "../ecs/systems/combat/StatusEffectSystem";

export default class GameSystems {
    constructor(game){
        this.game = game;

        this.inputSystem = new InputSystem(this.game);

        this.playerSystem       = new PlayerSystem(this.game);
        this.movementSystem     = new MovementSystem(this.game);
        this.rotationSystem     = new RotationSystem(this.game);

        this.backgroundSystem   = new BackgroundSystem(this.game);
        this.worldSpawnerSystem = new WorldSpawnerSystem(this.game);

        this.spatialSystem      = new SpatialSystem(this.game);
        this.collisionSystem    = new CollisionSystem(this.game);

        this.weaponSystem       = new WeaponSystem(this.game);
        this.projectileSystem   = new ProjectileSystem(this.game);
        this.statusEffectSystem = new StatusEffectSystem(this.game);

        this.magnetSystem       = new MagnetSystem(this.game);
        this.impactSystem       = new ImpactSystem(this.game);

        this.healthSystem       = new HealthSystem(this.game);
        this.dropSystem         = new DropSystem(this.game);
        this.boundrySystem      = new BoundarySystem(this.game);
        this.lifetimeSystem     = new LifetimeSystem(this.game);

        this.spriteSystem       = new SpriteSystem(this.game);
        this.renderSystem       = new RenderSystem(this.game);

    }

    reset() {
        Object.values(this).forEach(system => {
            if (system && typeof system.reset === "function") {
                system.reset();
            }
        });
    }
}