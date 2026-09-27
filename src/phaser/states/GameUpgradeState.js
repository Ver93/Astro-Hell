import SOUND from "../../shared/data/sound/Sound";
import State from "./State";

export default class GameUpgradeState extends State {

    constructor(game) {
        super(game);
        this.game = game;
    }

    onEnter() {
        this.game.audio.playMusic(
            SOUND.UPGRADE
        );
    }

    onUpdate(dt, seconds) {
        // Upgrade-menyn
    }

    onExit() {
        this.game.audio.resumePreviousMusic();
    }
}