
import TEXTURE from "../data/character/Texture";
import SOUND from "../data/sound/Sound";

const BASE = import.meta.env.BASE_URL;

const Images = {
    [TEXTURE.EMPTY]:                        `${BASE}assets/images/empty.png`,

    [TEXTURE.CHARACTER_ASTRO]:              `${BASE}assets/images/character_astro.png`,

    [TEXTURE.ENEMY_COMET]:                  `${BASE}assets/images/enemy_comet.png`,
    [TEXTURE.ENEMY_SATELLITE]:              `${BASE}assets/images/enemy_satellite.png`,
    [TEXTURE.ENEMY_GRUB]:                   `${BASE}assets/images/enemy_honey_grub.png`,
    [TEXTURE.ENEMY_BEE]:                    `${BASE}assets/images/enemy_honey_bee.png`,

    [TEXTURE.PROJECTILE_DEFAULT]:           `${BASE}assets/images/default.png`,
    [TEXTURE.PROJECTILE_BANANARANG]:        `${BASE}assets/images/projectile_bananarang.png`,
    [TEXTURE.PROJECTILE_FLOPPY]:            `${BASE}assets/images/projectile_floppy.png`,
    [TEXTURE.PROJECTILE_BULLET]:            `${BASE}assets/images/projectile_revolver.png`,
    [TEXTURE.PROJECTILE_RUBBER_DUCK]:       `${BASE}assets/images/projectile_rubber_duck.png`,
    [TEXTURE.PROJECTILE_HONEY_JAR]:         `${BASE}assets/images/projectile_honey_jar.png`,
    [TEXTURE.PROJECTILE_HONEY_POOL]:        `${BASE}assets/images/projectile_honey_pool_2.png`,
    [TEXTURE.PROJECTILE_FIREWORK]:          `${BASE}assets/images/projectile_firework.png`,
    [TEXTURE.PROJECTILE_CHEESE]:            `${BASE}assets/images/projectile_cloud.png`,
    [TEXTURE.PROJECTILE_BOOT]:              `${BASE}assets/images/projectile_boot.png`,
    [TEXTURE.PROJECTILE_RAY]:               `${BASE}assets/images/projectile_ray.png`,

    [TEXTURE.PARTICLE_HONEY]:               `${BASE}assets/images/particle_honey.png`,
    [TEXTURE.PARTICLE_HONEY_ENTTIY]:        `${BASE}assets/images/particle_honey_effect.png`,

    [TEXTURE.WEAPON_REVOLVER]:              `${BASE}assets/images/weapon_revolver_gun.png`,
    [TEXTURE.WEAPON_ROMAN_CANDLE]:          `${BASE}assets/images/weapon_roman_candle.png`,
    [TEXTURE.WEAPON_MOON]:                  `${BASE}assets/images/weapon_moon.png`,
    [TEXTURE.WEAPON_CHEESE]:                `${BASE}assets/images/weapon_moldy_cheese.png`,
    [TEXTURE.WEAPON_RAYGUN]:                `${BASE}assets/images/weapon_ray_gun.png`,

    [TEXTURE.ITEM_EXPERIENCE]:              `${BASE}assets/images/item_exp.png`,
    [TEXTURE.ITEM_DYNAMITE]:                `${BASE}assets/images/item_dynamite.png`,
    [TEXTURE.ITEM_TREASURE]:                `${BASE}assets/images/item_treasure_chest.png`,
    [TEXTURE.ITEM_COLLECTOR]:               `${BASE}assets/images/item_collector.png`,

    [TEXTURE.ITEM_CROWN]:                   `${BASE}assets/images/item_crown.png`,
    [TEXTURE.ITEM_RING]:                    `${BASE}assets/images/item_ring.png`,
    [TEXTURE.ITEM_PEARLS]:                  `${BASE}assets/images/item_pearls.png`,
    [TEXTURE.ITEM_GOBLET]:                  `${BASE}assets/images/item_goblet.png`,
    [TEXTURE.ITEM_PENDANT]:                 `${BASE}assets/images/item_pendant.png`,

    [TEXTURE.ITEM_CRYSTAL]:                 `${BASE}assets/images/item_crystal.png`,
    [TEXTURE.ITEM_DIAMOND]:                 `${BASE}assets/images/item_diamond.png`,
    [TEXTURE.ITEM_SAPPHIRE]:                `${BASE}assets/images/item_sapphire.png`,
    [TEXTURE.ITEM_RUBY]:                    `${BASE}assets/images/item_ruby.png`,
    [TEXTURE.ITEM_TOPAZ]:                   `${BASE}assets/images/item_topaz.png`,

    [TEXTURE.PASSIVE_DAMAGE]:               `${BASE}assets/images/passive_damage.png`,
    [TEXTURE.PASSIVE_MOVESPEED]:            `${BASE}assets/images/item_pendant.png`,
    [TEXTURE.PASSIVE_EXPERIENCE]:           `${BASE}assets/images/item_tome.png`,
    [TEXTURE.PASSIVE_LUCK]:                 `${BASE}assets/images/passive_luck.png`,
    [TEXTURE.PASSIVE_MAGNET]:               `${BASE}assets/images/passive_magnet.png`,
};

const Sounds = {
    [SOUND.UPGRADE]:                        `${BASE}assets/sounds/upgrade.mp3`,
    [SOUND.PAUSE]:                          `${BASE}assets/sounds/pause.mp3`,
    [SOUND.SPACE]:                          `${BASE}assets/sounds/deep_space.mp3`,
    [SOUND.HIT]:                            `${BASE}assets/sounds/hit.mp3`,
    [SOUND.QUACK]:                          `${BASE}assets/sounds/quack.mp3`,
    [SOUND.GLASS]:                          `${BASE}assets/sounds/glass.mp3`,
    [SOUND.EXPLOSION]:                      `${BASE}assets/sounds/explosion.mp3`,
    [SOUND.SPLAT]:                          `${BASE}assets/sounds/splat.mp3`,
    [SOUND.REVOLVER]:                       `${BASE}assets/sounds/revolver.mp3`,
    [SOUND.MENU]:                           `${BASE}assets/sounds/menu.mp3`,
    [SOUND.POP]:                            `${BASE}assets/sounds/pop.mp3`,
    [SOUND.PICKUP]:                         `${BASE}assets/sounds/pickup.mp3`,
    [SOUND.DYNAMITE]:                       `${BASE}assets/sounds/dynamite.mp3`,
    [SOUND.SCORE]:                          `${BASE}assets/sounds/score.mp3`,
    [SOUND.BOOST]:                          `${BASE}assets/sounds/boost.mp3`,
    [SOUND.RAY]:                            `${BASE}assets/sounds/ray.mp3`,
};

export default { Images, Sounds };