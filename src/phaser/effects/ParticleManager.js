export default class ParticleManager {

    constructor(game) {
        this.game = game;
        this.scene = game.scene;
        this.effects = new Map();
    }

    add(key, effect) {
        this.effects.set(key, effect);
    }

    get(key) {
        return this.effects.get(key);
    }

    spawn(key) {
        const factory = this.get(key);

        if (typeof factory !== "function") {
            console.warn(
                `[ParticleManager] Missing particle factory: ${key}`
            );
            return null;
        }

        return factory();
    }

    start(key, ...args) {
        const effect = this.get(key);

        if (effect?.start) {
            effect.start(...args);
        }
    }

    update(key, ...args) {
        const effect = this.get(key);

        if (effect?.update) {
            effect.update(...args);
        }
    }

    apply(key, ...args) {
        const effect = this.get(key);

        if (!effect) {
            console.warn(
                `[ParticleManager] Missing particle effect: ${key}`
            );
            return null;
        }

        if (effect.apply) {
            return effect.apply(...args);
        }

        return null;
    }

    stop(key) {
        const effect = this.get(key);

        if (effect?.stop) {
            effect.stop();
        }
    }

    reset() {
        for (const effect of this.effects.values()) {
            if (effect?.reset) {
                effect.reset();
            } else if (effect?.stop) {
                effect.stop();
            } else if (effect?.clear) {
                effect.clear();
            }
        }
    }

    clear() {
        this.reset();
        this.effects.clear();
    }
}