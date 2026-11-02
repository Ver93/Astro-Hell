import State from "./State";

export default class GamePlayState extends State {

    constructor(game) {
        super(game);
        this.game = game;
    }

    onEnter() {
        this.game.audio.resumeMusic();
    }

    onUpdate(dt, seconds) {
        // this.game.managers.update(
        //     dt,
        //     seconds
        // );

        this.game.pipelines.update(
            dt,
            seconds
        );
    }

    onExit() {
        this.game.audio.pauseMusic();
    }
}