const harvestEnergy = require('./tasks/tsk_harvestEnergy.js')
const upgradeController = require('./tasks/tsk_upgradeController.js')
const spawnController = require('./spawn/spn_controller.js')

module.exports.loop = function () {

    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }


    for (let name in Game.spawns) {
        if (Game.spawns[name].spawning == null) {
            spawnController.run(Game.spawns[name])
        }
    }


    for (let name in Game.creeps) {
        

        switch (Game.creeps[name].memory.role) {
            case 'harvester':
                harvestEnergy.run(Game.creeps[name]);
            case 'upgrader':    
                upgradeController.run(Game.creeps[name]);
            default:
                break;
        }

    }

    

}