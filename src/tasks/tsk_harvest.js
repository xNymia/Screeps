var upgrade = require('./tsk_upgrade')

module.exports = {
    run : function (creep){
        
        if (creep.isFull() === true || creep.tasks.chonkyBit === true) {

            if (creep.tasks.chonkyBit === false){
                creep.tasks.chonkyBit = true;
            }

            let destination = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });

            if (destination == undefined && creep.room.storage != undefined) {
                destination = creep.room.storage;
            }

            if (destination == undefined && creep.tasks.chonkyBit === true){
                creep.tasks.type = 'upgrade'
                console.log(creep.name + ' changing to upgrade')
                upgrade.run(creep);
                return;
            }

            
            if (destination != undefined) {
                if (creep.transfer(destination, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(destination);
                }
            }


        } else {
            creep.getEnergy(false, true);
        }
    }
};
