import ENTITY_TYPE from "../data/entity/EntityType";


export default class ExperienceSystem {
    constructor(game){
        this.game = game;
        this.ecs = game.ecs;
        this.entityManager = game.managers.entity;
    }

    update(dt, seconds){
        const experienceList = this.ecs.components[ENTITY_TYPE.ITEM_EXPERIENCE];
        console.log(experienceList); 
    }
}