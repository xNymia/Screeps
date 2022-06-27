
Creep.prototype.task = {}
Creep.prototype.task.type = undefined;
Creep.prototype.task.destination = undefined;
Creep.prototype.task.getChonk = false;



Creep.prototype.execute =
    function () {
        // Do Role
    }


Creep.prototype.getEnergy =
    function () {
        
        let container;
        
        // check for dropped resources in ruins
        container = this.pos.findClosestByPath(this.room.find(FIND_DROPPED_RESOURCES, {
            filter: s => (s.amount > 0 && s.resourceType == RESOURCE_ENERGY)
        }));

        if (container != undefined) {
            if (this.pickup(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(container);
                return
            }
        }

        // check for dropped resources in ruins
        container = this.pos.findClosestByPath(this.room.find(FIND_RUINS, {
            filter: s => s.store[RESOURCE_ENERGY] > 0
        }));

        if (container != undefined) {
            if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(container);
                return
            }
        }

        // If no ruins check tombstones
        container = this.pos.findClosestByPath(this.room.find(FIND_TOMBSTONES, {
            filter: s => s.store[RESOURCE_ENERGY] > 0
        }));

        if (container != undefined) {
            if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(container);
                return
            }
        }


        if (container == undefined) {
            container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                            s.store[RESOURCE_ENERGY] > 0
            });
        }
            // if one was found
        if (container != undefined) {
            // try to withdraw energy, if the container is not in range
            if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards it
                this.moveTo(container);
                return
            }
        }
        
        // if no container was found and the Creep should look for Sources
        if (container == undefined) {
            // find closest source
            var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            
            // try to harvest energy, if the source is not in range
            if (this.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards it
                this.moveTo(source);
                return
            }
        }

    };

Creep.prototype.isFull =
    function () {
        if (this.store.getFreeCapacity() != 0){
            return false;
        } else {
            return true;
        }
    };

Creep.prototype.isEmpty =
    function () {
        if (this.store.getUsedCapacity() === 0){
            return true;
        } else {
            return false;
        }
    };