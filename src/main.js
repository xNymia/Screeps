require('./prototypes/proto_creeps');
require('./prototypes/proto_spawn');
require('./prototypes/proto_room');
require('./prototypes/proto_tower');

// TODO RE-WORK TOWER




module.exports.loop = function () {

    // FUCKIN DIRTY
    
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    console.log('-----------------NEW TICK------------------------')
    console.log(JSON.stringify(Game.cpu))

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