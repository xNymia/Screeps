module.exports = {
    run : function (creep){


        let destination = creep.room.controller

        if (creep.isFull() === true || creep.tasks.chonkyBit === true) {

            if (creep.tasks.chonkyBit != true){
                creep.tasks.chonkyBit = true;
            }

            if (destination != undefined) {
                if (creep.upgradeController(destination) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(destination);                 
                }
            }
                   
        } else {
            creep.getEnergy(true, true);
        }
    }
};