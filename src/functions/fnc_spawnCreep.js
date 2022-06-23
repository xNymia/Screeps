
const spawnCreep = {
    run : function(thisSpawn, creep, num){
  
        let name = creep.role + (num + 1);
        thisSpawn.spawnCreep(creep.body, name, {
            memory: {role: creep.role}
        })
        
    }
}

module.exports = spawnCreep;