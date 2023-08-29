var creepManager = require('../services/svc_creepManager')

// Core Room Manager
Room.prototype.roomManager =
    function () {

        // Load any task from JSON
        for (let minion of this.find(FIND_MY_CREEPS)){
            if (minion.memory.task !== undefined){
                minion.task = JSON.parse(minion.memory.task)
            }
            
        }

        // For each spawn, run Spawn:prototype:spawnManager
        for (let spawnName of this.find(FIND_MY_SPAWNS)) {
            spawnName.spawnManager()
        }
     
        //TODO: REWORK TOWER
        
        // For each tower run structureTower:prototype:defend
        var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
        for (let tower of towers) {
            tower.defend();
        }

        // For each creep run creepManager:run
        for (let minion of this.find(FIND_MY_CREEPS)){
            creepManager.run(minion)
        }
               






        // Output some shit that makes sense to me
        console.log(' ')
        console.log (this.find(FIND_MY_CREEPS).length + ' creep task: ')
        for (let element of this.find(FIND_MY_CREEPS)){
            console.log(element.name + '   ' + JSON.stringify(element.task))
        }
    
        console.log(' ')
        console.log('Task In Memory: ')
        for (let minion of this.find(FIND_MY_CREEPS)){
            minion.memory.task = JSON.stringify(minion.task)
            
        }

        // Repair List
        console.log(' ')
        console.log('Needs Repair: ' + this.find(FIND_STRUCTURES, {    
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        }).length)

    
    }