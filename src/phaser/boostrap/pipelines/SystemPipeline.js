export default class SystemPipeline {
    constructor(){
        this.systems = [];
    }

    add(system){
        this.systems.push(system);
    }

    update(dt, seconds){
        for(const system of this.systems){
            system.update(dt, seconds);
        }
    }

    reset(){
        for(const system of this.systems){
            if(system.reset){
                system.reset();
            }
        }
    }

    clear(){
        this.systems.length = 0;
    }
}