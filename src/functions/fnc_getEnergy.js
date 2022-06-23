/* 
Function to get energy from all sources
Call: getEnergy.run(creep) 
*/

var getEnergy = {
    // Master function - we call this
    run : function(creep) {

        let closest = [];
        closest.push(this.getFromStructure(creep));
        closest.push(this.harvestSimple(creep));
        
        if (creep.memory.role == 'harvester'){
            closest = closest[1];
            






        }else if (creep.memory.role == 'upgrader'){
            closest = creep.pos.findClosestByPath(closest);
        };
        
        console.log(closest);

    },

    // Find the closest 'source' object
    harvestSimple : function(creep){
        let close = []
        // Sources that could have energy
        let simpleTargets = [
            FIND_SOURCES_ACTIVE,
            FIND_TOMBSTONES,
            FIND_DROPPED_RESOURCES
        ];
        
        // Iterate over the list and find the closest of each
        for (let t of simpleTargets) {
                let res = creep.pos.findClosestByPath(t)
                if (res != null) {
                    close.push(res);
                }
        };
        // Return the closest of the identified objects
        return creep.pos.findClosestByPath(close);
    }, 

    // Find the closest storage structure that has energy and return
    getFromStructure : function(creep) {
        
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_STORAGE || s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_EXTENSION) && s.store[RESOURCE_ENERGY] > 0
        });
    }
};

module.exports = getEnergy;
 
