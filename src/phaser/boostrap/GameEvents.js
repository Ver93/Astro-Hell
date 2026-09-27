
export default class GameEvents {
    constructor(game) {
        this.game = game;
        this.scene = game.scene;
        this.events = this.scene.game.events;
        this.registerEvents();
    }

    registerEvents() {
        this.events.on("startGame", () => {
            this.game.startGame();
        }, this);

        this.events.on("resumeGame", () => {
            this.game.resumeGame();
        }, this);

        this.events.on("selectUpgrade", (upgrade) => {
            this.game.upgrade.apply(upgrade);
            this.game.resumeGame();
        }, this);

        this.events.on("selectTreasure", (treasures) => {
            for(const index in treasures){
                this.game.upgrade.apply(treasures[index]);
            }
            this.game.resumeGame();
        }, this);
    }

    emitEvent(eventName, data) {
        this.events.emit(eventName, data);
    }

    onEvent(eventName, callback) {
        this.events.on(eventName, callback, this);
    }

    offEvent(eventName, callback) {
        this.events.off(eventName, callback, this);
    }
}