// is the controller maxed
//  yes: change task
//  no: Do I have energy?
//    no: get energy
//    yes: am I in range?
//      no: move
//      yes: upgrade

var upgradeController = {
    run : function(creep){

        const getEnergy = require('./functions/fnc_getEnergy.js')
        
        if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            getEnergy.run(creep);
        } else if (creep.upgradeController(this.upgradeStructure(creep) === ERR_NOT_IN_RANGE)){
            creep.moveTo(this.upgradeStructure(creep), {visualizePathStyle:{}})
        }

    },
    upgradeStructure : function(creep) {
        
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType == STRUCTURE_CONTROLLER)
        });
    }
}

module.exports = upgradeController;