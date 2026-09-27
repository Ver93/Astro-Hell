
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

        player.entity_position_x = this.game.scene.scale.width / 2;
        player.entity_position_y = this.game.scene.scale.height / 2;
        
        this.game.ecs.forEach((id, e) => {

            if (e.entity_category === ENTITY_CATEGORY.PLAYER) {
                this.player = id;
            }

        });
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
        this.exp += (1 + (1 * this.game.ecs.getEntity(this.player).entity_passive_experience));
        console.log(1 + (1 * this.game.ecs.getEntity(this.player).entity_passive_experience));

        if (this.exp >= this.requiredExp) {
            this.exp -= this.requiredExp;
            this.player_level += 1;
            const player = this.game.ecs.getEntity(this.player);
            player.entity_stats_health = player.entity_stats_max_health;
            this.game.upgradeMenu();
        }

        this.updateHUD();
    }

    addKills(){
        this.kills +=1;
    }

    getCurrentWeapons() {

        const player = this.game.ecs.getEntity(this.player);

        if (!player) {
            return [];
        }

        return player.entity_weapon_slots;
    }

    getCurrentPassives() {

        const player = this.game.ecs.getEntity(this.player);

        if (!player) {
            return [];
        }

        return player.entity_passive_slots;
    }

    getHUDData() {

        this.requiredExp = (this.player_level * 20) / 0.4;

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
}
