module.exports = {
    run : function (creep){


        let destination = creep.room.controller

        if (creep.isFull() === true || (creep.isEmpty() === false && creep.pos.inRangeTo(destination, 3) === true)) {
        
            if (creep.store.getUsedCapacity() <= 2){
                creep.tasks.type = null;
            }

            if (destination != undefined) {
                if (creep.upgradeController(destination) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(destination);
                    return;
                }
            }
                   
        } else {
            creep.getEnergy(true, true);
        }
    }
};