require('./prototypes/proto_creeps');
require('./prototypes/proto_spawn');


module.exports.loop = function () {

    // Clear dead creeps from memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }


}