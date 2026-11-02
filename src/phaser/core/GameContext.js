
import ENTITY_CATEGORY from "../data/entity/EntityCategory";
import ENTITY_TYPE from "../data/entity/EntityType";

export default class GameContext {

    constructor(game) {

        this.game = game;
        this.camera = this.game.scene.cameras.main;

        this.player = null;
        this.world = null;
        this.level = null;

        this.input = {
            moveX: 0,
            moveY: 0
        };

        this.boost = false;

        this.crystals = 0;

        this.exp = 0;
        this.player_level = 1;
        this.kills = 0;
        this.requiredExp = 1;

        this.game.events.onEvent(
            "crystal",
            () => this.addCrystal()
        );

        this.game.events.onEvent(
            "exp",
            () => this.addExp()
        );
    }

    createPlayer() {

        const player = this.game.entity.spawnEntity(
            ENTITY_CATEGORY.PLAYER,
            ENTITY_TYPE.CHARACTER_ASTRO
        );

        if (!player) {
            console.error("Kunde inte skapa spelaren!");
            this.player = null;
            return;
        }

        player.entity_position_x = this.game.scene.scale.width / 2;
        player.entity_position_y = this.game.scene.scale.height / 2;

        this.player = null;

        this.game.ecs.forEach((id, entity) => {

            if (entity === player) {
                this.player = id;
            }

        });

        if (this.player === null) {
            console.error("Spelaren skapades men kunde inte hittas i ECS!");
            return;
        }

        return this.player;
    }

    getFinalScore() {

        const levelScore = this.player_level * 100;
        const killScore = this.kills * 10;
        const crystalScore = this.crystals * 25;

        return levelScore + killScore + crystalScore;
    }

    gameOver() {

        const score = this.getFinalScore();

        this.game.events.emitEvent("gameOver", {
            score,
            level: this.player_level,
            kills: this.kills,
            crystals: this.crystals
        });
    }

    addCrystal() {

        this.crystals += 1;
        this.updateHUD();
    }

    addExp() {

        const player = this.game.ecs.getEntity(this.player);

        if (!player) return;

        this.exp += (
            1 + (1 * (player.entity_passive_experience || 0))
        );

        if (this.exp >= this.requiredExp) {

            this.exp -= this.requiredExp;
            this.player_level += 1;

            player.entity_stats_health = player.entity_stats_max_health;

            this.game.upgradeMenu();
        }

        this.updateHUD();
    }

    addKills() {

        this.kills += 1;
        this.updateHUD();
    }

    getCurrentWeapons() {

        const player = this.game.ecs.getEntity(this.player);

        if (!player) {
            return [];
        }

        return player.entity_weapon_slots || [];
    }

    getCurrentPassives() {

        const player = this.game.ecs.getEntity(this.player);

        if (!player) {
            return [];
        }

        return player.entity_passive_slots || [];
    }

    getHUDData() {

        this.requiredExp = (this.player_level * 10) / 0.4;

        return {
            level: this.player_level,
            progress: this.exp / this.requiredExp,
            crystals: this.crystals,
            kills: this.kills,
            currentWeapons: this.getCurrentWeapons(),
            currentPassives: this.getCurrentPassives()
        };
    }

    updateHUD() {

        this.game.events.emitEvent(
            "updateHUD",
            this.getHUDData()
        );
    }

    reset() {

        this.player = null;

        this.crystals = 0;
        this.exp = 0;
        this.player_level = 1;
        this.kills = 0;
        this.requiredExp = 1;

        this.input = {
            moveX: 0,
            moveY: 0
        };

        this.boost = false;

        this.world = null;
        this.level = null;

        // Skapa en ny spelare
        this.createPlayer();

        // Uppdatera HUD efter reset
        this.updateHUD();
    }
}
