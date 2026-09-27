import AssetRegistry from './AssetRegistry.js';

export default class AssetResolver {
    constructor(scene) {
        this.scene = scene;
    }

    preloadImages(){
        for(const key in AssetRegistry.Images){
            this.scene.load.image(key, AssetRegistry.Images[key]);
        }
    }

    preloadSounds(){
        for(const key in AssetRegistry.Sounds){
            this.scene.load.audio(key, AssetRegistry.Sounds[key]);
        }
    }

    preloadAllAssets(){
        this.preloadImages();
        this.preloadSounds();
    }
}