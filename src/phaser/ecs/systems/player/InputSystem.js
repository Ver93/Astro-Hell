
import Phaser from "phaser";

export default class InputSystem {
    constructor(game) {
        this.game = game;
        this.scene = game.scene;
        this.context = game.context;

        this.touchInput = {
            moveX: 0,
            moveY: 0,
            boost: false
        };

        this.keys = {
            w: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            a: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            s: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            shift: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            escape: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
        };

        this.paused = false;

        this.keys.escape.on("down", () => {
            this.paused = !this.paused;

            if (this.paused) {
                this.game.pauseGame();
            } else {
                this.game.resumeGame();
            }
        });
    }

    setTouchMovement(x, y) {
        this.touchInput.moveX = x;
        this.touchInput.moveY = y;
    }

    setTouchBoost(active) {
        this.touchInput.boost = active;
    }

    update() {
        const input = this.context.input;

        let moveX = 0;
        let moveY = 0;

        if (this.keys.w.isDown) moveY += 1;
        if (this.keys.s.isDown) moveY -= 1;
        if (this.keys.d.isDown) moveX += 1;
        if (this.keys.a.isDown) moveX -= 1;

        moveX += this.touchInput.moveX;
        moveY += this.touchInput.moveY;

        const magnitude = Math.hypot(moveX, moveY);

        if (magnitude > 1) {
            moveX /= magnitude;
            moveY /= magnitude;
        }

        input.moveX = moveX;
        input.moveY = moveY;

        this.context.boost =
            this.keys.shift.isDown || this.touchInput.boost;
    }

    reset() {
        this.touchInput.moveX = 0;
        this.touchInput.moveY = 0;
        this.touchInput.boost = false;

        this.context.input.moveX = 0;
        this.context.input.moveY = 0;
        this.context.boost = false;

        this.paused = false;
    }
}
