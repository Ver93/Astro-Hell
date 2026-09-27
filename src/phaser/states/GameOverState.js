import SOUND from "../../shared/data/sound/Sound";
import State from "./State";

export default class GameOverState extends State {
    constructor(game) {
        super(game);
        this.game = game;
    }

    onEnter() {}
    onUpdate(dt, seconds){}
    onExit(){}

}