import SOUND from "../../shared/data/sound/Sound";
import State from "./State";

export default class GameTreasureState extends State {
    constructor(game) {
        super(game);

        this.game = game;

        this.background = null;
        this.blur = null;
        this.upgradeCamera = null;
    }

    onEnter() {
        const scene = this.game.scene;
        const camera = this.game.context.camera;
        const view = camera.worldView;

        const upgradeEffect = this.game.particle.get("upgrade");
        const emitters = upgradeEffect?.emitters ?? [];

        if (!this.upgradeCamera) {
            this.upgradeCamera = scene.cameras.add(
                0,
                0,
                scene.scale.width,
                scene.scale.height
            );

            scene.children.list.forEach(child => {
                if (!emitters.includes(child)) {
                    this.upgradeCamera.ignore(child);
                }
            });
        }

        this.upgradeCamera.setVisible(true);

        this.upgradeCamera.setScroll(
            view.x,
            view.y
        );

        this.upgradeCamera.setZoom(
            camera.zoom
        );

        this.blur = camera.filters.internal.addBlur(
            0,
            4,
            4,
            1
        );

        this.background = scene.add.rectangle(
            view.x,
            view.y,
            view.width,
            view.height,
            0x000000
        );

        this.background
            .setOrigin(0, 0)
            .setAlpha(0.55)
            .setDepth(200);

        camera.ignore(this.background);

        this.upgradeCamera.ignore(this.background);

        if (emitters.length > 0) {
            camera.ignore(emitters);
        }
        this.game.particle.start("upgrade");
        this.game.events.emitEvent("openTreasure");

        this.game.audio.playMusic(SOUND.UPGRADE);
    }

    onUpdate(dt, seconds) {
        const camera = this.game.context.camera;

        if (!camera) return;

        const view = camera.worldView;

        if (this.upgradeCamera) {
            this.upgradeCamera.setScroll(
                view.x,
                view.y
            );

            this.upgradeCamera.setZoom(
                camera.zoom
            );
        }

        if (this.background) {
            this.background.setPosition(
                view.x,
                view.y
            );

            this.background.setSize(
                view.width,
                view.height
            );
        }
    }

    onExit() {
        if (this.upgradeCamera) {
            this.upgradeCamera.setVisible(false);
        }

        this.game.particle.stop("upgrade");

        this.game.audio.resumePreviousMusic();

        const camera = this.game.context.camera;

        if (this.blur && camera) {
            camera.filters.internal.remove(this.blur);
            this.blur = null;
        }

        if (this.background) {
            this.background.destroy();
            this.background = null;
        }
    }
}