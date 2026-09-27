import SOUND from "../../shared/data/sound/Sound";
import State from "./State";

export default class GamePauseState extends State {

    constructor(game) {
        super(game);
        this.game = game;
    }

    onEnter() {
        this.game.audio.playMusic(
            SOUND.PAUSE
        );
    }

    onUpdate(dt, seconds) {
        // Game är pausat
    }

    onExit() {
        this.game.audio.resumePreviousMusic();
    }
}