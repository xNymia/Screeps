
module.exports = {
    run : function (creep){
               
        let repairTargets = creep.pos.findClosestByPath(creep.room.find(FIND_STRUCTURES, {    
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        }));
        
        if (repairTargets != null) {
            if (creep.repair(repairTargets) === ERR_NOT_IN_RANGE) {
                creep.moveTo(repairTargets);
                return;
            }
        } else if (repairTargets === null) {
            creep.task.type = undefined
            return
        }
                   
    }
};