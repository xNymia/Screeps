var harvest = require('./tsk_harvest')

module.exports = {
    run : function (creep){

           
        let destination = Game.getObjectById(creep.tasks.target)

        // console.log(' ')
        // console.log('Build Destination: ' + destination)
        // console.log(' ')
        
        
        if (destination === null){
            creep.tasks.type = 'harvest'
            creep.tasks.destination = null
            console.log(creep.name + ' no build site changing to harvest')
            harvest.run(creep);
            return;
        }
        

        if (creep.isFull() === true || creep.chonkyBit === true) {

            if (creep.chonkyBit != true){
                creep.chonkyBit = true;
            }
            
            if (destination != undefined) {
                if (creep.build(destination) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(destination);
                    return;
                }
            }
                   
        } else {
            creep.getEnergy(true, true);
        }
    }
};