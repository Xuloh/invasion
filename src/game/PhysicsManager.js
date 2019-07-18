import {Engine, World} from "matter-js";

export default class PhysicsManager {
    constructor(gravity) {
        if(gravity == null)
            gravity = {x: 0, y: 9.81};
        this.world = World.create({
            gravity: {
                x: gravity.x,
                y: gravity.y,
                scale: 1
            }
        });
        this.engine = Engine.create({
            constraintIterations: 2,
            enableSleeping: false,
            positionIterations: 6,
            velocityIterations: 4,
            world: this.world
        });
    }

    update(dt) {
        Engine.update(this.engine, dt);
    }
}
