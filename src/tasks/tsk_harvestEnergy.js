// Energy Harvest Task

// if not full of energy go get some
// if full go deposit

var harvestEnergy = {
    run : function(name){

               

        const getEnergy = require('./functions/fnc_getEnergy.js')
        const storeEnergy = require('./functions/fnc_storeEnergy.js')

        if(name.store[RESOURCE_ENERGY] < name.store.getCapacity()) {
            getEnergy.run(name);
        } else {
            storeEnergy.run(name);
        }

    }
}

module.exports = harvestEnergy;