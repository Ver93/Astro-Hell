import TEXTURE from "../data/character/Texture";
import SOUND from "../data/sound/Sound";

const Images = {
    [TEXTURE.EMPTY]:                        "/assets/images/empty.png",

    [TEXTURE.CHARACTER_ASTRO]:              "/assets/images/character_astro.png",

    [TEXTURE.ENEMY_COMET]:                  "/assets/images/enemy_comet.png",
    [TEXTURE.ENEMY_SATELLITE]:              "/assets/images/enemy_satellite.png",
    [TEXTURE.ENEMY_GRUB]:                   "/assets/images/enemy_honey_grub.png",
    [TEXTURE.ENEMY_BEE]:                    "/assets/images/enemy_honey_bee.png",

    [TEXTURE.PROJECTILE_DEFAULT]:           "/assets/images/default.png",
    [TEXTURE.PROJECTILE_BANANARANG]:        "/assets/images/projectile_bananarang.png",
    [TEXTURE.PROJECTILE_FLOPPY]:            "/assets/images/projectile_floppy.png",
    [TEXTURE.PROJECTILE_BULLET]:            "/assets/images/projectile_revolver.png",
    [TEXTURE.PROJECTILE_RUBBER_DUCK]:       "/assets/images/projectile_rubber_duck.png",
    [TEXTURE.PROJECTILE_HONEY_JAR]:         "/assets/images/projectile_honey_jar.png",
    [TEXTURE.PROJECTILE_HONEY_POOL]:        "/assets/images/projectile_honey_pool_2.png",
    [TEXTURE.PROJECTILE_FIREWORK]:          "/assets/images/projectile_firework.png",
    [TEXTURE.PROJECTILE_CHEESE]:            "/assets/images/projectile_cloud.png",
    [TEXTURE.PROJECTILE_BOOT]:              "/assets/images/projectile_boot.png",

    [TEXTURE.PARTICLE_HONEY]:               "/assets/images/particle_honey.png",
    [TEXTURE.PARTICLE_HONEY_ENTTIY]:        "/assets/images/particle_honey_effect.png",

    [TEXTURE.WEAPON_REVOLVER]:              "/assets/images/weapon_revolver_gun.png",
    [TEXTURE.WEAPON_ROMAN_CANDLE]:          "/assets/images/weapon_roman_candle.png",
    [TEXTURE.WEAWPON_MOON]:                 "/assets/images/weapon_moon.png",
    [TEXTURE.WEAPON_CHEESE]:                "/assets/images/weapon_moldy_cheese.png",

    [TEXTURE.ITEM_EXPERIENCE]:              "/assets/images/item_exp.png",
    [TEXTURE.ITEM_DYNAMITE]:                "/assets/images/item_dynamite.png",
    [TEXTURE.ITEM_TREASURE]:                "/assets/images/item_treasure_chest.png",
    [TEXTURE.ITEM_COLLECTOR]:               "/assets/images/item_collector.png",
    
    [TEXTURE.ITEM_CROWN]:                   "/assets/images/item_crown.png",
    [TEXTURE.ITEM_RING]:                    "/assets/images/item_ring.png",
    [TEXTURE.ITEM_PEARLS]:                  "/assets/images/item_pearls.png",
    [TEXTURE.ITEM_GOBLET]:                  "/assets/images/item_goblet.png",
    [TEXTURE.ITEM_PENDANT]:                 "/assets/images/item_pendant.png",
    
    [TEXTURE.ITEM_CRYSTAL]:                 "/assets/images/item_crystal.png",
    [TEXTURE.ITEM_DIAMOND]:                 "/assets/images/item_diamond.png",
    [TEXTURE.ITEM_SAPPHIRE]:                "/assets/images/item_sapphire.png",
    [TEXTURE.ITEM_RUBY]:                    "/assets/images/item_ruby.png",
    [TEXTURE.ITEM_TOPAZ]:                   "/assets/images/item_topaz.png",

    [TEXTURE.PASSIVE_DAMAGE]:               "/assets/images/passive_damage.png",
    [TEXTURE.PASSIVE_MOVESPEED]:            "/assets/images/item_pendant.png",
    [TEXTURE.PASSIVE_EXPERIENCE]:           "/assets/images/item_tome.png",
    [TEXTURE.PASSIVE_LUCK]:                 "/assets/images/passive_luck.png",
    [TEXTURE.PASSIVE_MAGNET]:               "/assets/images/passive_magnet.png",

};

const Sounds = {
    [SOUND.UPGRADE]:                        "/assets/sounds/upgrade.mp3",
    [SOUND.PAUSE]:                          "/assets/sounds/pause.mp3",
    [SOUND.SPACE]:                          "/assets/sounds/deep_space.mp3",
    [SOUND.HIT]:                            "/assets/sounds/hit.mp3",
    [SOUND.QUACK]:                          "/assets/sounds/quack.mp3",
    [SOUND.GLASS]:                          "/assets/sounds/glass.mp3",
    // [SOUND.BOING]:                          "/assets/sounds/boing.mp3",
    [SOUND.EXPLOSION]:                      "/assets/sounds/explosion.mp3",
    [SOUND.SPLAT]:                          "/assets/sounds/splat.mp3",
    [SOUND.REVOLVER]:                       "/assets/sounds/revolver.mp3",
    [SOUND.MENU]:                           "/assets/sounds/menu.mp3",
    [SOUND.POP]:                            "/assets/sounds/pop.mp3",
    [SOUND.PICKUP]:                         "/assets/sounds/pickup.mp3",
    [SOUND.DYNAMITE]:                       "/assets/sounds/dynamite.mp3",
};

export default {Images, Sounds};