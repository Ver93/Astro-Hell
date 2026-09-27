import Phaser from "phaser";
import Game from "./Game"

import AssetManager from "../shared/assets/AssetManager"

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("main");
        this.gameInstance = null;
        this.assetManager = null;
    }

    preload(){
        this.assetManager = new AssetManager(this);
        this.assetManager.preloadAllAssets();
    }

    create(){
        this.gameInstance = new Game(this);
        this.gameInstance.initialize();
        this.game.events.emit("phaserCreated");
    }

    update(time, delta){
        this.gameInstance.update(time, delta);
    }
}