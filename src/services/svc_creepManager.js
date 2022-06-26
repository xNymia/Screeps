const tasks = {
    "harvest" : require('../tasks/tsk_harvest'),
    "upgrade" : require('../tasks/tsk_upgrade'),
    "build" : require('../tasks/tsk_build')
}



var creepManager = {
    run : function(creep){
    
        // does the creep have a task currently
        
        // console.log(creep.name +' chonkyBit: ' + creep.tasks.chonkyBit)

        if (creep.tasks.chonkyBit === false || (creep.tasks.chonkyBit == true && creep.isEmpty() === false)){
            this.runTask(creep)
            return
        }
        
        // if chonkyBit is true and the creep is empty, its time to reset
        creep.tasks.chonkyBit = false

        this.takeTask(creep)
        //this.runTask(creep)
        return;

    },

    takeTask : function(creep){
        let roomQ = creep.room.taskQueue.queue;


        for (let task in roomQ) {
            if (roomQ[task].role === creep.tasks.role){
                
                let myTask = roomQ[task]
                
            

                creep.tasks.type = myTask.type;
                creep.tasks.target = myTask.target;
                creep.tasks.role = myTask.role;
                creep.tasks.complete = myTask.complete;
                creep.tasks.id = myTask.id;


                console.log(creep.name + ' taking new task: ' + JSON.stringify(myTask))
  
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
