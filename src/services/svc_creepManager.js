
var creepManager = {
    run : function(minion){

        // does the creep have a task currently
        if (minion.memory.task != null){
            console.log('task')
        }else{
            console.log('no task')
        }


    }
}




module.exports = creepManager;
