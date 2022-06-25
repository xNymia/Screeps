const roles = ['worker']

// If more than 2 harvesters then change a harvester to an upgrader

StructureSpawn.prototype.spawnManager = 
    function () {

        // 200 energy is minimum for a viable creep
        if (this.spawning != null || this.room.energyAvailable < 200){return;}

        // Define variables
        let room = this.room;       
        let roomCreeps = room.find(FIND_MY_CREEPS);
        let creepCount = {};
        let maxEnergy = room.energyAvailable;
        let name = undefined;
        
        
        for (let role of roles) {
            creepCount[role] = _.sum(roomCreeps, (c) => c.memory.role == role);
        }
        
        if (creepCount['worker'] < 10){
            let spawned = this.createWorkerCreep(maxEnergy, 'worker')
        }

    }



StructureSpawn.prototype.createWorkerCreep =
    function (energy, roleName) {
        // create a balanced body as big as possible with the given energy
        var numberOfParts = Math.floor(energy / 200);
        // make sure the creep is not too big (more than 50 parts)
        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
        var body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        // create creep with the created body and the given role
        return this.spawnCreep(body, roleName + '_' + Game.time, { memory: { role: roleName, task: null }});
    };