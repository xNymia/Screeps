function task(type, target, role) {
    this.type = type,
    this.target = target,
    this.role = role,
    this.complete = false
}

var taskManager = {
    run : function (thisRoom, analysis) {
        /**
         * @type room {Room}
         */
        

        let roomQ = thisRoom.taskQueue.queue;
        let roomQlimit = thisRoom.taskQueue.limit;
        

        // TODO: Add possible urgent tasks to the front of the queue if necessary

        if (roomQ.length < roomQlimit) {
        
            const defaultTask = new task('harvest', null, 'worker')
            const upgradeTask = new task('upgrade', null, 'worker')


            if (roomQ.length > 2 && (roomQ[0].type != 'upgrade') && thisRoom.controller.level < 2 ){
                roomQ.unshift(upgradeTask)
            } else {
                roomQ.push(defaultTask)
            }

            
        }
        

        
    }

}

module.exports = taskManager;


