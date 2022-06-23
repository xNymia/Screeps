

const creepDefinitions = {
    harvester : {
        body: [WORK, CARRY, MOVE, MOVE],
        minimum: 3,
        role: 'harvester',
        weight: 50
    },
    upgrader : {
        body: [WORK, CARRY, MOVE, MOVE],
        minimum: 1,
        role: 'upgrader',
        weight: 40
    },
}


module.exports = creepDefinitions;