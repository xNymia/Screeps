# Screeps
Screeps Notes and Code


Cycle:

Start
    Set up task queue

Tick
    Clear Memory
    Start Room Manager for each room
        run Spawn Manager for each spawn
            check spawning and energy
            get creep count by role
            spawn workers if < 3
        run Room Analyser
        run Task Manager
            if roomQ < limit
                Assess room based on analyser report
                if no other tasks create default task
        run Creep Manager


