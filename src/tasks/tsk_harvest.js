var upgrade = require('./tsk_upgrade')

module.exports = {
    run : function (creep){

        if (creep.isFull() === true) {

            let destination = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });

            if (destination == undefined && creep.room.storage != undefined) {
                destination = creep.room.storage;
            }

            if (destination == undefined && creep.isFull() == true){
                creep.tasks.type = 'upgrade'
                console.log(creep.name + ' changing to upgrade')
                upgrade.run(creep);
                return;
            }

            
            if (destination != undefined) {
                if (creep.transfer(destination, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(destination);
                    return
                } else if (creep.transfer(destination, RESOURCE_ENERGY) === OK) {
                    console.log(creep.name +' harvest task reset');
                    creep.tasks.type = null;
                    return; 
                }
                
            }
        } else {
            creep.getEnergy(false, true);
        }
    }
};
