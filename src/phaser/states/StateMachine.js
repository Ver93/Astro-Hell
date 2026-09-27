export default class StateMachine {
    constructor(game) {
        this.game = game;
        this.states = {};
        this.currentState = null;
    }

    addState(name, state) {
        this.states[name] = state;
        return this;
    }

    switchState(name) {
        const nextState = this.states[name];
        if (!nextState) {
            console.warn( "State saknas:", name );
            return;
        }

        if (this.currentState) {
            this.currentState.onExit?.();
        }

        this.currentState = nextState;
        this.currentState.onEnter?.();
    }

    getState() {
        return Object.keys(this.states).find(
            key => this.states[key] === this.currentState
        );
    }

    isState(state){
        return this.getState() === state;
    }

    update(dt, seconds) {
        this.currentState?.onUpdate?.(dt, seconds);
    }
}