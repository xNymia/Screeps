var taskManager = require('../services/svc_taskManager')
var creepManager = require('../services/svc_creepManager')

// Task Queue Definitions
Room.prototype.taskQueue = {}
Room.prototype.taskQueue.queue = [];
Room.prototype.taskQueue.limit = 8

// Core Room Manager
Room.prototype.roomManager =
    function () {

        // Load any tasks from JSON
        for (let minion of this.find(FIND_MY_CREEPS)){
            minion.tasks = JSON.parse(minion.memory.task)
        }

        for (let spawnName of this.find(FIND_MY_SPAWNS)) {
            // spawnManager is prototype of spawn
            spawnName.spawnManager()
        }
     
               
        // Run Task Manager
        taskManager.run(this);

        // Run Creep Manager for each creep
        for (let minion of this.find(FIND_MY_CREEPS)){
            creepManager.run(minion)
        }
        



        
        // Output some shit that makes sense to me
                
        console.log (this.name + ' room queue ' + '(' + this.taskQueue.queue.length + ')')
    
        for (let element in this.taskQueue.queue){
            let e = this.taskQueue.queue[element]
            console.log('   ' +e.type + ' ' + e.target + ' ' + e.role + ' ' + e.complete )
        }

        console.log (this.find(FIND_MY_CREEPS).length + ' creep tasks: ')
        for (let element of this.find(FIND_MY_CREEPS)){
            console.log(element.name + '   ' + JSON.stringify(element.tasks))
        }
    
        // console.log(' ')
        // console.log('Tasks In Memory: ')
        for (let minion of this.find(FIND_MY_CREEPS)){
            minion.memory.task = JSON.stringify(minion.tasks)
            //console.log(minion.name + ': ' + minion.memory.task)
        }
    
    }