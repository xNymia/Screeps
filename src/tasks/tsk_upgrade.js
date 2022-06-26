module.exports = {
    run : function (creep){


        let destination = creep.room.controller

        if (creep.isFull() === true || creep.chonkyBit === true) {

            if (creep.chonkyBit != true){
                creep.chonkyBit = true;
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