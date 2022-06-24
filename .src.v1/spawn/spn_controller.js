
const spawnController = {
    run : function(thisSpawn){

        
        //if (thisSpawn.room.energyAvailable < 300){return};
        


        let _ = require('lodash');
        let blueprint = this.defs()
        let fnc_spawnCreep = require('../functions/fnc_spawnCreep.js')

        let nextBuild = null;

        // What creeps do I have?
        let population = thisSpawn.room.find(FIND_MY_CREEPS);
    
  
        let buildQ = [];
  
        // Do I have less than the minimum of each creep?
        for (let entry in blueprint){

            if (_.sum(population, (p) => p.memory.role === blueprint[entry].role) < blueprint[entry].minimum ){
                buildQ.push(blueprint[entry])
            }       
        }   
                 
        for (const element of buildQ) {
            if ((nextBuild === null) || (element.weight > nextBuild.weight)){
                nextBuild = element
            }
        }

        if (nextBuild === null){return;}

        fnc_spawnCreep.run(thisSpawn, nextBuild, population.length)

    },

    defs : function(){

        const creepDefinitions = {
            upgrader : { body: [WORK, CARRY, MOVE, MOVE], minimum: 2, role: 'upgrader', weight: 10 },
            harvester : { body: [WORK, CARRY, MOVE, MOVE], minimum: 3, role: 'harvester', weight: 20 }
        };
        
        return creepDefinitions
    }
}


module.exports = spawnController;