import UpgradeDefinitions from "../../shared/data/upgrade/UpgradeDefinitions";

export default class UpgradeGenerator {

    generate(player, count = 3) {

        const currentWeapons = this.getCurrentWeapons(player);
        const currentPassives = this.getCurrentPassives(player);

        const currentLoadout = [
            ...currentWeapons,
            ...currentPassives,
        ];

        return this.generateUpgrades(currentWeapons, currentPassives, currentLoadout, count);
    }

    getCurrentWeapons(player) {
        return player.entity_weapon_slots.map(weapon => ({
            id: weapon.id,
            level: weapon.level,
            type: "weapon"
        }));
    }

    getCurrentPassives(player) {
        return player.entity_passive_slots.map(passive => ({
            id: passive.id,
            level: passive.level,
            type: "passive"
        }));
    }

    generateUpgrades(currentWeapons, currentPassives, currentLoadout, count) {

        const upgrades = [];

        const weaponCount = currentWeapons.length;
        const passiveCount = currentPassives.length;

        const maxWeapons = 5;
        const maxPassives = 5;

        for (const definition of Object.values(UpgradeDefinitions)) {

            const current = currentLoadout.find(item => item.id === definition.id);

            const isWeapon = definition.type === "weapon";
            const isPassive = definition.type === "passive";

            // Blockera nya vapen om spelaren redan har 5
            if (!current && isWeapon && weaponCount >= maxWeapons) {
                continue;
            }

            // Blockera nya passives om spelaren redan har 5
            if (!current && isPassive && passiveCount >= maxPassives) {
                continue;
            }

            // Blockera level-ups över 5
            if (current && current.level >= 5) {
                continue;
            }

            // Nytt item (weapon/passive)
            if (!current) {
                upgrades.push({
                    id: definition.id,
                    name: definition.name,
                    description: definition.description,
                    texture: definition.texture,
                    level: 1,
                    status: "new",
                    type: definition.type
                });
                continue;
            }

            // Level up
            upgrades.push({
                id: definition.id,
                name: definition.name,
                description: definition.description,
                texture: definition.texture,
                level: current.level + 1,
                status: "upgrade",
                type: definition.type
            });
        }

        upgrades.sort(() => Math.random() - 0.5);
        return upgrades.slice(0, count);
    }
}
