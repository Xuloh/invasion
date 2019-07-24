import {Engine, World} from "matter-js";

let world = null;
let engine = null;

function init(gravity) {
    if(gravity == null)
        gravity = {x: 0, y: 9.81};
    world = World.create({
        gravity: {
            x: gravity.x,
            y: gravity.y,
            scale: 1
        }
    });
    engine = Engine.create({
        constraintIterations: 2,
        enableSleeping: false,
        positionIterations: 6,
        velocityIterations: 4,
        world: this.world
    });
}

function update(dt) {
    Engine.update(engine, dt);
}

function getWorld() {
    return world;
}

export default {
    init,
    update,
    getWorld
};
