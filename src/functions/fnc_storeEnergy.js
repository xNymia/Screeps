/* 
Function to store creep energy
Call: getEnergy.run(creep) 
*/

var storeEnergy = {
    // Master function - we call this
    run : function(creep) {

        if (creep.transfer(this.storeInStructure(creep), RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
            creep.moveTo(this.storeInStructure(creep), {visualizePathStyle:{}})
        }
        
    },
 
    storeInStructure : function(creep) {
        
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType == STRUCTURE_SPAWN || s.structureType === STRUCTURE_STORAGE || s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_EXTENSION)
        });
    }
};

module.exports = storeEnergy;