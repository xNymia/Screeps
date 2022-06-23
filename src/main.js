const getEnergy = require('./functions/fnc_getEnergy.js')
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


    for (let spawn in Game.spawns) {
        if (Game.spawns[spawn].spawning == null) {
            spawnController.run(Game.spawns[spawn])
        }
    }


    for (let name in Game.creeps) {
        var creep = Game.creeps[name]
        getEnergy.run(creep)
    }
}