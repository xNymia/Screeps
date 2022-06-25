function task(type, target, role) {
    this.type = type,
    this.target = target,
    this.role = role,
    this.complete = false
}

var taskManager = {
    run : function (analysis) {
        
        let roomQ = Room.prototype.taskQueue.queue;
        let roomQlimit = Room.prototype.taskQueue.limit;
        


        // TODO: Add possible urgent tasks to the front of the queue if necessary

        if (roomQ.length < roomQlimit) {
        
            const defaultTask = new task('move', [9,25], 'worker')

            roomQ.push(defaultTask)    
        }
        

        
    }

}

module.exports = taskManager;


