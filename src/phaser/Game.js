import GameEvents from "./boostrap/GameEvents.js";
import GamePipelines from "./boostrap/GamePipelines.js";
import GameSystems from "./boostrap/GameSystems.js";
import EntityComponentSystem from "./ecs/EntityComponentSystem.js";
import EntityManager from "./entity/EntityManager.js";

import GameManagers from "./boostrap/GameManagers.js";
import StateMachine from "./states/StateMachine.js";
import GameStates from "./states/GameStates.js";
import GameMenuState from "./states/GameMenuState.js";
import GamePlayState from "./states/GamePlayState.js";
import GamePauseState from "./states/GamePauseState.js";
import GameContext from "./core/GameContext.js";
import GameUpgradeState from "./states/GameUpgradeState.js";
import GameTreasureState from "./states/GameTreasureState.js";
import UpgradeManager from "./managers/UpgradeManager.js";

import ParticleManager from "./effects/ParticleManager.js";
import UpgradeParticleEffect from "./effects/particle/UpgradeParticleEffect.js";
import FireworkTrailEffect from "./effects/particle/FireworkTrailEffect.js";
import OldCheeseCloudEffect from "./effects/particle/OldCheeseCloudEffect.js";
import MoonPulseEffect from "./effects/particle/MoonPulseEffect.js";

import DamageTextPool from "./effects/visual/DamageTextPool.js"
import FlashEffect from "./effects/visual/FlashEffect.js";
import RevolverEffect from "./effects/particle/RevolverEffect.js";
import HoneyEffect from "./effects/particle/HoneyEffect.js";
import AudioManager from "./sound/AudioManager.js";
import AssetRegistry from "../shared/assets/AssetRegistry.js";
import SOUND from "../shared/data/sound/Sound.js";
import { Sound } from "phaser";
import GameOverState from "./states/GameOverState.js";

export default class Game {
    constructor(scene) {
        this.scene = scene;

        this.events         = null;
        this.ecs            = null;
        this.managers       = null;
        this.systems        = null;
        this.pipelines      = null;
        
        this.context        = null;

        this.stateMachine   = null;

        this.fpsFrames = 0;
        this.fpsTimer = 0;
        this.fps = 0;
        this.ms = 0;
    }

    initialize(){
        this.events         = new GameEvents(this);
        this.ecs            = new EntityComponentSystem();

        this.entity         = new EntityManager(this);

        this.context        = new GameContext(this);
        
        this.particle       = new ParticleManager(this);
        
        this.particle.add("trail", () => new FireworkTrailEffect(this));

        this.particle.add("upgrade", new UpgradeParticleEffect(this));
        this.particle.add("pulse", new MoonPulseEffect(this));
        this.particle.add("cloud", new OldCheeseCloudEffect(this));
        this.particle.add("flash", new FlashEffect(this));
        this.particle.add("revolver", new RevolverEffect(this));
        this.particle.add("honey", new HoneyEffect(this));

        this.textPool       = new DamageTextPool(this, 50);
        
        this.audio          = new AudioManager(this);
        this.audio.initialize();
    
        this.audio.addSound(SOUND.UPGRADE, 0.25);
        this.audio.addSound(SOUND.SPACE, 0.25);
        this.audio.addSound(SOUND.PAUSE, 0.25);
        this.audio.addSound(SOUND.HIT, 0.15);
        this.audio.addSound(SOUND.QUACK, 0.25);
        this.audio.addSound(SOUND.SPLAT, 0.15);
        this.audio.addSound(SOUND.GLASS, 0.25);
        this.audio.addSound(SOUND.EXPLOSION, 0.25);
        this.audio.addSound(SOUND.REVOLVER, 0.25);
        this.audio.addSound(SOUND.MENU, 0.25);
        this.audio.addSound(SOUND.POP, 0.25);
        this.audio.addSound(SOUND.PICKUP, 0.1);
        this.audio.addSound(SOUND.DYNAMITE, 0.15);
        
        this.context.createPlayer();
        
        this.upgrade        = new UpgradeManager(this);
        this.managers       = new GameManagers(this);
        this.systems        = new GameSystems(this);
        this.pipelines      = new GamePipelines(this);
        
        this.systems.backgroundSystem.create();
    
        this.stateMachine   = new StateMachine(this);
        this.stateMachine.addState(GameStates.MENU,         new GameMenuState(this));
        this.stateMachine.addState(GameStates.END,          new GameOverState(this));
        this.stateMachine.addState(GameStates.PLAY,         new GamePlayState(this));
        this.stateMachine.addState(GameStates.PAUSE,        new GamePauseState(this));
        this.stateMachine.addState(GameStates.UPGRADE,      new GameUpgradeState(this));
        this.stateMachine.addState(GameStates.TREASURE,     new GameTreasureState(this));
        this.stateMachine.switchState(GameStates.MENU);
        
    }

    startGame(){
        this.stateMachine.switchState(GameStates.PLAY);
    }

    resumeGame(){
        this.stateMachine.switchState(GameStates.PLAY); 
    }

    pauseGame(){
        this.stateMachine.switchState(GameStates.PAUSE);
        this.events.emitEvent("pauseGame");
    }

    endGame(){
        this.stateMachine.switchState(GameStates.END);
        this.events.emitEvent("runEnd");
    }

    treasureMenu(){
        const treasures = this.upgrade.generate(3);
        if(treasures.length <= 0) return;
        this.events.emitEvent("openTreasure", treasures);
        this.stateMachine.switchState(GameStates.TREASURE);
    }

    upgradeMenu(){
        const upgrades = this.upgrade.generate(3);
        if(upgrades.length <= 0) return;
        this.events.emitEvent("openUpgrade", upgrades);
        this.stateMachine.switchState(GameStates.UPGRADE);
    }




    update(time, delta) {

        const dt = delta / 16.6666;
        const seconds = delta / 1000;

        const frameStart = performance.now();

        this.stateMachine.update(dt, seconds);
        this.context.updateHUD();

        const frameMs =
            performance.now() - frameStart;

        // console.log(this.ecs.getEntity(this.context.player));
        // Fånga frames som sticker ut
        if (frameMs > 8) {
            // console.warn(
            //     `UPDATE SPIKE: ${frameMs.toFixed(2)} ms | ` +
            //     `Entities: ${this.ecs.countActiveEntities()}`
            // );
        }

        this.fpsFrames++;
        this.fpsTimer += seconds;

        if (this.fpsTimer >= 1) {

            this.fps = this.fpsFrames;

            console.log(
                `FPS: ${this.fps} | ` +
                `Update: ${frameMs.toFixed(2)} ms | ` +
                `Active Entities: ${this.ecs.countActiveEntities()}`
            );

            this.fpsFrames = 0;
            this.fpsTimer = 0;
        }
    }


}