const roles = ['worker']



StructureSpawn.prototype.spawnManager = 
    function () {

        // Re-Define room
        let room = this.room;

        // Get a list of creep objects
        let roomCreeps = room.find(FIND_MY_CREEPS);
        
        // What energy is available in the room this tick?
        let maxEnergy = room.energyAvailable;
        
         
        
        // Get a count of each creep in each role
        let creepCount = {};
        for (let role of roles) {
            creepCount[role] = _.sum(roomCreeps, (c) => c.memory.role == role);
        }

        // TODO: Do math here for spawning special creeps

        
        // Define variables that will change based on RCL
        let workerLimit
        let spawnEnergyMinimum;

        switch (this.room.controller.level) {
            case 1:
                spawnEnergyMinimum = 200
                workerLimit= 10
                break;
            case 2:
                spawnEnergyMinimum = 300
                workerLimit = 15
                break;
            case 3:
                spawnEnergyMinimum = 600
                workerLimit = 15
                break;
            case 4:
                spawnEnergyMinimum = 1000
                workerLimit = 15
                break;
            
            default:
                spawnEnergyMinimum = 1200
                workerLimit = 10
        }

        console.log('creep limit: ' + workerLimit)

        // check viable spawn energy - minimum for a viable creep
        if (this.spawning != null || (this.spawning === null && this.room.energyAvailable < spawnEnergyMinimum)){return;}


        
        if (creepCount['worker'] < workerLimit){
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
        return this.spawnCreep(body, roleName + '_' + Game.time, { memory: { role: roleName } } );
    };