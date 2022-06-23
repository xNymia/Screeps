
const spawnController = {
    run : function(thisSpawn){

        if (thisSpawn.room.energyAvailable < 300){console.log("not nuff Engy"); return};

        let _ = require('lodash');
        let blueprint = require('./def_creeps.js');
        let fnc_spawnCreep = require('../functions/fnc_spawnCreep.js')

        let nextBuild = null;

        // What creeps do I have?
        let population = thisSpawn.room.find(FIND_MY_CREEPS)
        
        // Do I have less than the minimum of each creep?
        for (let itCreepRole in blueprint){           
            if (_.sum(population, (p) => p.memory.role) < blueprint[itCreepRole].minimum){
                
                if (nextBuild === null ){
                
                    nextBuild = blueprint[itCreepRole];
                
                } else if ( nextBuild != null && nextBuild.weight < blueprint[itCreepRole].weight ) {
                    
                    nextBuild = blueprint[itCreepRole];

                }
            } else {
                nextBuild = blueprint.harvester
            }
        }

        //console.log(typeof population)

        fnc_spawnCreep.run(thisSpawn, nextBuild, population.length)

    }
}


module.exports = spawnController;