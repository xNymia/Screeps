function task(type, target, role) {
    this.type = type,
    this.target = target,
    this.role = role,
    this.complete = false,
    this.id = false
}

var taskManager = {
    run : function (thisRoom) {
        /**
         * @type room {Room}
         */
        

        

        // TODO: Add possible urgent tasks to the front of the queue if necessary
        let roomQ = thisRoom.taskQueue.queue;
        let roomQlimit = thisRoom.taskQueue.limit;
      
        // console.log('queue not full')
        const defaultTask = new task('harvest', null, 'worker')
        const upgradeTask = new task('upgrade', null, 'worker')
        let buildTask = new task('build', null, 'worker')


        // do we have any construction?
        let construction = this.findNewConstruction(thisRoom)
        let oldConstruction = this.findOldConstruction(thisRoom)
        // do we have any construction tasks?
        let conTask = _.sum(roomQ, (c) => c.type == 'build');
        
        let conLimit = 4
        if (thisRoom.energyAvailable === thisRoom.energyCapacityAvailable){
            conLimit = 7    
        } 
            

        if (thisRoom.energyAvailable < 200) {
            this.addTask(roomQ, roomQlimit, defaultTask)
            return

        } else if (oldConstruction.length > 0 && conTask < conLimit) {
            buildTask.target = oldConstruction[0].id
            this.addTask(roomQ, roomQlimit, buildTask)
            return

        } else if (construction.length > 0 && conTask < conLimit) {           
            buildTask.target = construction[0].id
            this.addTask(roomQ, roomQlimit, buildTask)
            return

        } else {
            this.addTask(roomQ, roomQlimit, defaultTask)
            return
        }   
            
    },      
    

    addTask : function(roomQ, roomQlimit, genTask) {
        
        if (roomQ.length === roomQlimit) {
            return;
        }
        genTask.id = this.makeID(24)
        console.log('adding new task to queue: ' + JSON.stringify(genTask))
        roomQ.push(genTask)
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
    },
    makeID : function (length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

module.exports = taskManager;
