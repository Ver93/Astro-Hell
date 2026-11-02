export default class TouchInputSystem {
    constructor(game) {
        this.game = game;
        this.context = game.context;

        this.pointer = null;
        this.joystickOrigin = { x: 0, y: 0 };

        this.maxDistance = 60;

        this.boostPointer = null;

        this.scene = game.scene;

        this.scene.input.on(
            "pointerdown",
            this.onPointerDown,
            this
        );

        this.scene.input.on(
            "pointermove",
            this.onPointerMove,
            this
        );

        this.scene.input.on(
            "pointerup",
            this.onPointerUp,
            this
        );

        this.scene.input.on(
            "pointerupoutside",
            this.onPointerUp,
            this
        );
    }

    onPointerDown(pointer) {
        const width = this.scene.scale.width;

        if (pointer.x < width / 2 && this.pointer === null) {
            this.pointer = pointer.id;

            this.joystickOrigin.x = pointer.x;
            this.joystickOrigin.y = pointer.y;
        } else if (
            pointer.x >= width / 2 &&
            this.boostPointer === null
        ) {
            this.boostPointer = pointer.id;
            this.context.boost = true;
        }
    }

    onPointerMove(pointer) {
        if (pointer.id !== this.pointer) return;

        const dx = pointer.x - this.joystickOrigin.x;
        const dy = pointer.y - this.joystickOrigin.y;

        const distance = Math.hypot(dx, dy);
        const scale = Math.min(distance / this.maxDistance, 1);

        if (distance === 0) {
            this.context.input.moveX = 0;
            this.context.input.moveY = 0;
            return;
        }

        this.context.input.moveX =
            (dx / distance) * scale;

        this.context.input.moveY =
            (dy / distance) * scale;
    }

    onPointerUp(pointer) {
        if (pointer.id === this.pointer) {
            this.pointer = null;

            this.context.input.moveX = 0;
            this.context.input.moveY = 0;
        }

        if (pointer.id === this.boostPointer) {
            this.boostPointer = null;
            this.context.boost = false;
        }
    }

    reset() {
        this.pointer = null;
        this.boostPointer = null;

        this.context.input.moveX = 0;
        this.context.input.moveY = 0;
        this.context.boost = false;
    }

    destroy() {
        this.reset();

        this.scene.input.off("pointerdown", this.onPointerDown, this);
        this.scene.input.off("pointermove", this.onPointerMove, this);
        this.scene.input.off("pointerup", this.onPointerUp, this);
        this.scene.input.off("pointerupoutside", this.onPointerUp, this);
    }
}