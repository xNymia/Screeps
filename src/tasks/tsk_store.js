
module.exports = {
    run : function (creep){
        
        let store = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                            || s.structureType == STRUCTURE_EXTENSION
                            || s.structureType == STRUCTURE_TOWER)
                            && s.energy < s.energyCapacity
        });

        if (store == undefined && creep.room.storage != undefined) {
            store = creep.room.storage;
        }
        
        if (store != undefined) {
            if (creep.transfer(store, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(store);
            }
        } else if (store === null) {
            creep.task.type = undefined
            return
        }
    }
}
