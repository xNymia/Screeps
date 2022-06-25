function task(type, target, role) {
    this.type = type,
    this.target = target,
    this.role = role,
    this.complete = false
}

var taskManager = {
    run : function (thisRoom) {
        /**
         * @type room {Room}
         * @type analysis {Object}
         */
        

        let roomQ = thisRoom.taskQueue.queue;
        let roomQlimit = thisRoom.taskQueue.limit;

        // TODO: Add possible urgent tasks to the front of the queue if necessary

        if (roomQ.length === roomQlimit) {
            return;
        } else {
        
            const defaultTask = new task('harvest', null, 'worker')
            const upgradeTask = new task('upgrade', null, 'worker')
            let buildTask = new task('build', null, 'worker')


            // do we have any construction?
            let construction = this.findNewConstruction(thisRoom)
            let oldConstruction = this.findOldConstruction(thisRoom)
            // do we have any construction tasks?
            let conTask = _.sum(roomQ, (c) => c.type == 'build');
            let upgTask = _.sum(roomQ, (c) => c.type == 'upgrade');

            
            if (roomQ.length > 2 && upgTask <= 1 ){
                roomQ.push(upgradeTask)
            } else if (oldConstruction.length > 0 && conTask < 2) {
                buildTask.target = oldConstruction[0].id
                roomQ.push(buildTask)
            } else if (construction.length > 0 && conTask < 2) {
                buildTask.target = construction[0].id
                roomQ.push(buildTask)
            } else {
                roomQ.push(defaultTask)
            }   
        }
    },

    findNewConstruction : function (thisRoom) {
        let target = thisRoom.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: (s) => s.progress === 0
        })
        return target
    },
    
    findOldConstruction : function (thisRoom) {
        let target = thisRoom.find(FIND_MY_CONSTRUCTION_SITES, {
            filter: (s) => s.progress > 0
        })
        return target
    }
}

module.exports = taskManager;


