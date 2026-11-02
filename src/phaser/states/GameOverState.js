import SOUND from "../../shared/data/sound/Sound";
import State from "./State";

export default class GameOverState extends State {
    constructor(game) {
        super(game);
        this.game = game;
    }

    onEnter() {
        this.game.audio.playMusic(SOUND.PAUSE);
    }
    onUpdate(dt, seconds){}
    onExit(){
        this.game.audio.pauseMusic();
        this.game.audio.playMusic(SOUND.SPACE);
    }

}