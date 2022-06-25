var roomAnalyser = require('../services/svc_roomAnalyser')
var taskManager = require('../services/svc_taskManager')
var creepManager = require('../services/svc_creepManager')

// Task Queue Definitions
Room.prototype.taskQueue = {}
Room.prototype.taskQueue.queue = [];
Room.prototype.taskQueue.limit = 5

// Core Room Manager
Room.prototype.roomManager =
    function () {

        for (let spawnName of this.find(FIND_MY_SPAWNS)) {
            // spawnManager is prototype
            spawnName.spawnManager()
        }

        /** @type roomAnalysis {object} */
        // let roomAnalysis = roomAnalyser.run(this);

        let roomAnalysis = {};

        taskManager.run(roomAnalysis);

        for (let minion of this.find(FIND_MY_CREEPS)){
            creepManager.run(minion)
        }
        


     
        // console.log (this.name + ' room queue: ')
        // for (let element in Room.prototype.taskQueue.queue){
        //     let e = Room.prototype.taskQueue.queue[element]
        //     console.log(e.type + ' ' + e.target + ' ' + e.role + ' ' + e.complete )
        // }
        
    
    
    }