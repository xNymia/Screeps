const tasks = {
    "harvest" : require('../tasks/tsk_harvest'),
    "upgrade" : require('../tasks/tsk_upgrade')
}



var creepManager = {
    run : function(creep){

        // does the creep have a task currently
        
        if (creep.tasks.type != null){
            this.runTask(creep, creep.tasks)
        }
        // if creep task is null after iteration, get a new task else return
        if (creep.tasks.type != null){return;}
    
        let Task = this.takeTask(creep)
        
    },

    takeTask : function(creep){
        let roomQ = creep.room.taskQueue.queue;

        for (const task in roomQ) {
            if (roomQ[task].role === creep.tasks.role){
                
                let myTask = roomQ[task]
                
                creep.tasks.type = myTask.type;
                creep.tasks.target = myTask.target;
                creep.tasks.role = myTask.role;
                creep.tasks.complete = myTask.complete;


                console.log(creep.name + ' taking new task: ' + JSON.stringify(myTask))

                roomQ.splice(task, 1)
                return myTask
            }
        }
    },

    runTask : function(creep, Task) {        
        tasks[Task.type].run(creep);
    },
}




module.exports = creepManager;
