const tasks = {
    "harvest" : require('../tasks/tsk_harvest'),
    "upgrade" : require('../tasks/tsk_upgrade')
}



var creepManager = {
    run : function(creep){

        // does the creep have a task currently
        if (creep.memory.task != null){
            let Task = JSON.parse(creep.memory.task)
            this.runTask(creep, Task)
        } else {
            
            let Task = this.takeTask(creep)
            
            console.log(creep.name + ' taking new task: ' + JSON.stringify(Task))
            
            this.runTask(creep, Task)
            this.saveTask(creep, Task)
        }
    },

    takeTask : function(creep){
        let roomQ = creep.room.taskQueue.queue;
        
        for (const task in roomQ) {
            if (roomQ[task].role === creep.memory.role){
                let myTask = roomQ[task]
                roomQ.shift()
                return myTask
            }
        }
    },

    runTask : function(creep, Task) {
        tasks[Task.type].run(creep);
    },

    saveTask : function(creep, Task) {
        creep.memory.task = JSON.stringify(Task)
    }

}




module.exports = creepManager;
