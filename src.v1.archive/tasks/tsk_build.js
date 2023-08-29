var harvest = require('./tsk_store')

module.exports = {
    run : function (creep){

           
        let destination = Game.getObjectById(creep.task.destination)
        
        if (destination != undefined) {
            if (creep.build(destination) === ERR_NOT_IN_RANGE) {
                creep.moveTo(destination);
                return;
            }
        } else if (destination === null) {
            creep.task.type = undefined
            creep.task.destination = undefined
            return
        }
    }
};