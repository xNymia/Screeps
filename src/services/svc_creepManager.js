const tasks = {
    "harvest" : require('../tasks/tsk_harvest'),
    "upgrade" : require('../tasks/tsk_upgrade'),
    "build" : require('../tasks/tsk_build')
}



var creepManager = {
    run : function(creep){
        // console.log('')
        // console.log(creep.name + " @ creepManager:run")
        // console.log(JSON.stringify(creep.tasks))
        // does the creep have a task currently
        
        if (creep.chonkyBit === false || (creep.chonkyBit == true && creep.isEmpty() === false)){
            // console.log(JSON.stringify(creep.tasks))
            this.runTask(creep)
            return
        }
        
        // if chonkyBit is true and the creep is empty, its time to reset
        creep.chonkyBit = false

        // console.log(JSON.stringify(creep.tasks))
        this.takeTask(creep)
        //this.runTask(creep)
        return;

    },

    takeTask : function(creep){
        let roomQ = creep.room.taskQueue.queue;
        // console.log(creep.name + ' creepManager:runTask')
        // console.log('Room Queue ' + roomQ)

        for (let task in roomQ) {
            if (roomQ[task].role === creep.tasks.role){
                
                let myTask = roomQ[task]
                
                // console.log('mytask: '+myTask)

                creep.tasks.type = myTask.type;
                creep.tasks.target = myTask.target;
                creep.tasks.role = myTask.role;
                creep.tasks.complete = myTask.complete;
                creep.tasks.id = myTask.id;
                creep.chonkyBit = false;


                console.log(creep.name + ' taking new task: ' + JSON.stringify(myTask))
                // console.log('Room Queue ' + roomQ)
                // console.log(roomQ.length)

                const index = roomQ.indexOf(myTask);
                roomQ.splice(index,1)
                return;
                
                
                
                //return myTask
            }
        }
    },

    runTask : function(creep) {        
        tasks[creep.tasks.type].run(creep);
    },
}




module.exports = creepManager;
