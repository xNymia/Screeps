module.exports = {
    run : function (creep){


        let destination = Game.getObjectById(creep.tasks.target)
        if (destination === null){
            creep.tasks.type = null;
            return;
        }
        
        if (creep.isFull() === true || (creep.isEmpty() === false && creep.pos.inRangeTo(destination, 3) === true)) {

            if (creep.store.getUsedCapacity() === 5){
                creep.tasks.type = null;
                return;
            }

            if (destination != undefined) {
                if (creep.build(destination) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(destination);
                    return;
                }
            }
                   
        } else {
            creep.getEnergy(true, true);
        }
    }
};