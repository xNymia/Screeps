require('./prototypes/proto_creeps');
require('./prototypes/proto_spawn');
require('./prototypes/proto_room');




module.exports.loop = function () {

    // Clear dead creeps from memory
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let x in Game.rooms) {
        Game.rooms[x].roomManager()
    }
 
}