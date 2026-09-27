import AssetRegistry from './AssetRegistry.js';

export default class AssetResolver {
    
    static image(key){
        return AssetRegistry.Images[key] ?? null;
    }

    static sound(key){
        return AssetRegistry.Sounds[key] ?? null;
    }
}