import UpgradeGenerator from "./UpgradeGenerator";
import UpgradeDefinitions from "../../shared/data/upgrade/UpgradeDefinitions";
import PASSIVE from "../../phaser/data/passive/Passive";

export default class UpgradeManager {

    constructor(game) {
        this.game = game;
        this.ecs = game.ecs;
        this.player = game.context.player;
        this.generator = new UpgradeGenerator();
    }

    generate(count) {
        const player = this.ecs.getEntity(this.player);
        return this.generator.generate(player, count);
    }

    apply(upgrade) {

        const player = this.ecs.getEntity(this.player);
        const definition = UpgradeDefinitions[upgrade.id];

        if (!definition) {
            console.error("Unknown upgrade:", upgrade.id);
            return;
        }

        if (definition.type === "weapon") {

            const weapon = player.entity_weapon_slots.find(
                w => w.id === upgrade.id
            );

            if (weapon) {
                weapon.level = upgrade.level;
                return;
            }

            player.entity_weapon_slots.push({
                id: upgrade.id,
                level: 1,
                modifier: [],
                timer: 0,
                projectile_count: 0
            });

            return;
        }
        if (definition.type === "passive") {

            const passive = player.entity_passive_slots.find(
                p => p.id === upgrade.id
            );

            if (passive) {
                passive.level = upgrade.level;
                this.applyPassiveStats(player, upgrade.id, upgrade.level);
                return;
            }

            player.entity_passive_slots.push({
                id: upgrade.id,
                level: 1
            });

            this.applyPassiveStats(player, upgrade.id, 1);
            return;
        }

        console.error("Upgrade has no valid type:", upgrade);
    }

    applyPassiveStats(player, id, level) {

        switch (id) {

            case PASSIVE.MAGNET:
                player.entity_passive_magnet_radius = 50 * level;
                break;

            case PASSIVE.EXPERIENCE:
                player.entity_passive_experience = level + (0.10 * level);
                break;

            case PASSIVE.LUCK:
                player.entity_passive_luck = level * 2;
                // console.log(player.entity_passive_luck);
                break;

            case PASSIVE.MOVE_SPEED:
                player.entity_passive_move_speed = level * 0.5;
                // console.log(player.entity_passive_move_speed);
                break;

            case PASSIVE.DAMAGE:
                player.entity_passive_damage = level * 2;
                // console.log(player.entity_passive_damage);
                break;

            default:
                console.warn("Passive has no stat handler:", id);
                break;
        }

        // console.log(player);
    }
}
