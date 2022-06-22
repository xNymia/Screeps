
let creep=Game.spawns.Spawn1;

let simpleTargets = [
    FIND_SOURCES_ACTIVE,
    FIND_TOMBSTONES,
    FIND_DROPPED_RESOURCES
];

let closest = []

for (let t of simpleTargets) {
        let res = creep.pos.findClosestByPath(t)
        if (res != null) {
            closest.push(res);
        }
};  

closest.push(
    creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => (s.structureType === STRUCTURE_STORAGE || s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_EXTENSION)
    }
));


console.log(closest)

