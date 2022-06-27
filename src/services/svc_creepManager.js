const tasks = {
    "store" : require('../tasks/tsk_store'),
    "upgrade" : require('../tasks/tsk_upgrade'),
    "build" : require('../tasks/tsk_build'),
    "repair" : require('../tasks/tsk_repair')
}

var creepManager = {
    run : function(creep){

        // Variables for decision making
        var room = creep.room
        var roomCreeps = room.find(FIND_MY_CREEPS)
        var creepCount = {}
        for (let task in tasks) {
            creepCount[task] = _.sum(roomCreeps, (c) => c.task.type == task);
        }
        let conSites = room.find(FIND_MY_CONSTRUCTION_SITES)

        

      

        // If the creep is empty but still has a task - nuke the task
        if (creep.isEmpty() === true && creep.task.type != undefined){  
            creep.task.type = undefined
            creep.task.destination = undefined
        }   
        
        // If the creep is empty or has getChonk set - Go get Energy
        if (creep.isEmpty() === true || creep.task.getChonk === true){            
            if (creep.task.getChonk === false){
                creep.task.getChonk = true
            }

            creep.getEnergy()

            // If the creep got full on this tick, remove getChonk
            if (creep.isFull() === true){
                creep.task.getChonk = false
            }
            return
        }

        // If creep is chonky, and has a task - do the task
        if ( creep.task.getChonk === false && creep.task.type != undefined ){
            tasks[creep.task.type].run(creep)
            return

        }
        // If the creep has no task, get one.
        else if ( creep.task.type === undefined ){
            
            /** 
             * This is the main decision tree for the room
             * executed on a per creep basis, what does the room need
             * then apply the creep to that
             */

            if (room.energyAvailable < room.energyCapacityAvailable ){
                this.giveTask(creep, 'store')
                return
            }

            if (creepCount['repair'] < 2 && room.controller.level > 2){
                this.giveTask(creep, 'repair')
            }

            
            if (conSites.length > 0){
                let inProg = _.filter(conSites, c => c.progress > 0)
                
                if (inProg.length > 0){
                    this.giveTask(creep, 'build', inProg[0].id)
                    return
                } else {
                    this.giveTask(creep, 'build', conSites[0].id)
                    return
                }
            }


            this.giveTask(creep, 'upgrade')



        }
    },

    giveTask : function(creep, task, destination) {

        /**
         * @type {Creep} creep
         * @type {task} string
         * @type {destination} objectID
         */

        creep.task.type = task
        if (destination != undefined){
            creep.task.destination = destination
        } else {
            creep.task.destination = undefined
        }

    }
    
}




module.exports = creepManager;
