import PASSIVE from "../../../phaser/data/passive/Passive";
import WEAPON from "../../../phaser/data/weapon/Weapon";
import TEXTURE from "../character/Texture";

const UpgradeDefinitions = {

    // -------------------------
    // WEAPONS
    // -------------------------

    [WEAPON.BANANARANG]: {
        id: WEAPON.BANANARANG,
        type: "weapon",
        name: "Banana Rang",
        description: "Flings spinning bananas that slice through enemies and whip back to the player. Higher levels unleash absurd amounts of flying fruit.",
        texture: TEXTURE.PROJECTILE_BANANARANG,

        levels: {
            1: { projectile_count: 4, projectiles_per_shot: 4 },
            2: { projectile_count: 8, projectiles_per_shot: 8 },
            3: { projectile_count: 12, projectiles_per_shot: 12 },
            4: { projectile_count: 25, projectiles_per_shot: 25 },
            5: { projectile_count: 50, projectiles_per_shot: 50 },
        },
    },

    [WEAPON.FLOPPY_SHIELD]: {
        id: WEAPON.FLOPPY_SHIELD,
        type: "weapon",
        name: "Floppy Shield",
        description: "Summons floppy disks that orbit the player like a retro forcefield, smacking enemies that get too close.",
        texture: TEXTURE.PROJECTILE_FLOPPY,

        levels: {
            1: { projectile_count: 2 },
            2: { projectile_count: 4 },
            3: { projectile_count: 6 },
            4: { projectile_count: 8 },
            5: { projectile_count: 10 },
        },
    },

    [WEAPON.REVOLVER]: {
        id: WEAPON.REVOLVER,
        type: "weapon",
        name: "Revolver",
        description: "Fires precise shots toward nearby enemies. Higher levels unleash more bullets per burst, shredding targets with overwhelming firepower.",
        texture: TEXTURE.WEAPON_REVOLVER,

        levels: {
            1: { projectile_count: 5, projectiles_per_shot: 5 },
            2: { projectile_count: 10, projectiles_per_shot: 10 },
            3: { projectile_count: 15, projectiles_per_shot: 15 },
            4: { projectile_count: 25, projectiles_per_shot: 25 },
            5: { projectile_count: 50, projectiles_per_shot: 50 },
        },
    },

    [WEAPON.RUBBER_DUCKY]: {
        id: WEAPON.RUBBER_DUCKY,
        type: "weapon",
        name: "Rubber Ducky",
        description: "Throws a rubber duck that bounces chaotically around the screen, ricocheting off enemies and walls.",
        texture: TEXTURE.PROJECTILE_RUBBER_DUCK,

        levels: {
            1: { projectile_count: 5 },
            2: { projectile_count: 10 },
            3: { projectile_count: 15 },
            4: { projectile_count: 20 },
            5: { projectile_count: 40 },
        },
    },

    [WEAPON.HONEY_JAR]: {
        id: WEAPON.HONEY_JAR,
        type: "weapon",
        name: "Honey Jar",
        description: "Drops a jar of sticky honey that splashes on impact, slowing and damaging enemies caught in the goo.",
        texture: TEXTURE.PROJECTILE_HONEY_JAR,

        levels: {
            1: { projectile_count: 2, projectiles_per_shot: 2 },
            2: { projectile_count: 4, projectiles_per_shot: 4 },
            3: { projectile_count: 6, projectiles_per_shot: 6 },
            4: { projectile_count: 12, projectiles_per_shot: 12 },
            5: { projectile_count: 25, projectiles_per_shot: 25 },
        },
    },

    [WEAPON.ROMAN_CANDLE]: {
        id: WEAPON.ROMAN_CANDLE,
        type: "weapon",
        name: "Roman Candle",
        description: "Launches colorful fireworks that zig‑zag through the air before exploding in a burst of damage.",
        texture: TEXTURE.WEAPON_ROMAN_CANDLE,

        levels: {
            1: { projectile_count: 3, projectiles_per_shot: 3, damage: 3, fire_interval: 180, explosion_radius: 120 },
            2: { projectile_count: 5, projectiles_per_shot: 5, damage: 4, fire_interval: 150, explosion_radius: 135 },
            3: { projectile_count: 10, projectiles_per_shot: 10, damage: 5, fire_interval: 120, explosion_radius: 150 },
            4: { projectile_count: 15, projectiles_per_shot: 15, damage: 6, fire_interval: 90, explosion_radius: 170 },
            5: { projectile_count: 25, projectiles_per_shot: 25, damage: 8, fire_interval: 65, explosion_radius: 195 },
        },
    },

    [WEAPON.MOON_PULSE]: {
        id: WEAPON.MOON_PULSE,
        type: "weapon",
        name: "Moon Pulse",
        description: "Creates a growing lunar aura around the player that pulses outward, damaging all enemies within its radius.",
        texture: TEXTURE.WEAWPON_MOON,

        levels: {
            1: { projectile_count: 1, projectiles_per_shot: 1, radius: 100, cooldown: 1900, damage: 10 },
            2: { projectile_count: 1, projectiles_per_shot: 1, radius: 120, cooldown: 1800, damage: 12 },
            3: { projectile_count: 1, projectiles_per_shot: 1, radius: 140, cooldown: 1500, damage: 14 },
            4: { projectile_count: 1, projectiles_per_shot: 1, radius: 160, cooldown: 1250, damage: 16 },
            5: { projectile_count: 1, projectiles_per_shot: 1, radius: 180, cooldown: 1000, damage: 20 },
        },
    },

    [WEAPON.OLD_CHEESE]: {
        id: WEAPON.OLD_CHEESE,
        type: "weapon",
        name: "Moldy Cheese",
        description: "Surrounds the player with a foul-smelling cloud that periodically damages nearby enemies.",
        texture: TEXTURE.WEAPON_CHEESE,

        levels: {
            1: { projectile_count: 1, projectiles_per_shot: 1, radius: 100, cooldown: 1900, damage: 10 },
            2: { projectile_count: 1, projectiles_per_shot: 1, radius: 120, cooldown: 1800, damage: 12 },
            3: { projectile_count: 1, projectiles_per_shot: 1, radius: 140, cooldown: 1500, damage: 14 },
            4: { projectile_count: 1, projectiles_per_shot: 1, radius: 160, cooldown: 1250, damage: 16 },
            5: { projectile_count: 1, projectiles_per_shot: 1, radius: 180, cooldown: 1000, damage: 20 },
        },
    },

    [WEAPON.OLD_BOOT]: {
        id: WEAPON.OLD_BOOT,
        type: "weapon",
        name: "Old Boot",
        description: "Throws an old boot in a high arc toward a random target. More boots mean more airborne footwear raining down on enemies.",
        texture: TEXTURE.PROJECTILE_BOOT,

        levels: {
            1: { projectile_count: 1 },
            2: { projectile_count: 2 },
            3: { projectile_count: 3 },
            4: { projectile_count: 4 },
            5: { projectile_count: 5 },
        },
    },


    [PASSIVE.MAGNET]: {
        id: PASSIVE.MAGNET,
        type: "passive",
        name: "Item Magnet",
        description: "Increases pickup range, pulling experience and items toward the player from further away.",
        texture: TEXTURE.PASSIVE_MAGNET,
        levels: { 1:{},2:{},3:{},4:{},5:{} },
    },

    [PASSIVE.LUCK]: {
        id: PASSIVE.LUCK,
        type: "passive",
        name: "Luck",
        description: "Boosts luck, increasing the chance for rare item drops and beneficial effects.",
        texture: TEXTURE.PASSIVE_LUCK,
        levels: { 1:{},2:{},3:{},4:{},5:{} },
    },

    [PASSIVE.DAMAGE]: {
        id: PASSIVE.DAMAGE,
        type: "passive",
        name: "Damage",
        description: "Increases all damage dealt by the player’s weapons.",
        texture: TEXTURE.PASSIVE_DAMAGE,
        levels: { 1:{},2:{},3:{},4:{},5:{} },
    },

    [PASSIVE.MOVE_SPEED]: {
        id: PASSIVE.MOVE_SPEED,
        type: "passive",
        name: "Speed Boots",
        description: "Increases movement speed, letting the player dodge danger and reposition faster.",
        texture: TEXTURE.PASSIVE_DAMAGE,
        levels: { 1:{},2:{},3:{},4:{},5:{} },
    },

    [PASSIVE.EXPERIENCE]: {
        id: PASSIVE.EXPERIENCE,
        type: "passive",
        name: "Experience Tome",
        description: "Boosts experience gain, helping the player level up faster and unlock upgrades sooner.",
        texture: TEXTURE.PASSIVE_EXPERIENCE,
        levels: { 1:{},2:{},3:{},4:{},5:{} },
    },
};

export default UpgradeDefinitions;
