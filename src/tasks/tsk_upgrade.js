module.exports = {
    run : function (creep){

        let destination = creep.room.controller

        if (destination != undefined) {
            if (creep.upgradeController(destination) === ERR_NOT_IN_RANGE) {
                creep.moveTo(destination);                 
            }
        }
                  
    }
};