import Phaser from "phaser";
import GameStates from "../../../states/GameStates";

export default class InputSystem {
    constructor(game){
        this.game    = game;
        this.scene   = game.scene;
        this.context = game.context;

        this.pointerDown = false;


        this.scene.input.on("pointerdown", () => {this.pointerDown = true});
        this.scene.input.on("pointerup", () => {this.pointerUp = true});

        
        this.keys = {
            w:      this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a:      this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s:      this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d:      this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            shift:  this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            escape: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
        }

        this.lastEsc = 0;
        this.paused = false;

        this.keys.escape.on("down", () => {
            this.paused = !this.paused;
            if(this.paused){
                this.game.pauseGame();
            } else {
                this.game.resumeGame();
            }
        });


    }

    update() {
        const input = this.context.input;

        input.moveX = 0;
        input.moveY = 0;
        this.context.boost = false;

        if (this.keys.w.isDown) input.moveY += 1;
        if (this.keys.s.isDown) input.moveY -= 1;
        if (this.keys.d.isDown) input.moveX += 1;
        if (this.keys.a.isDown) input.moveX -= 1;

        if (this.keys.shift.isDown) {
            this.context.boost = true;
        }

    }
}