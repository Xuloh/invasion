import Victor from "victor";
import Entity from "./Entity.js";

export default class Bullet extends Entity {
    constructor(container, position, direction, speed) {
        super(container, position);
        this.speed = speed;

        if(direction == null)
            this.direction = new Victor(0, 0);
        else if(typeof direction === "object")
            this.direction = Victor.fromObject(direction);
        else if(Array.isArray(direction))
            this.direction = Victor.fromArray(direction);
        else
            throw TypeError("direction should either be an array or an object with a x and y property");

        this.direction.norm();
    }

    update(dt) {
        super.update(dt);
        if(this.position.x >= 0 && this.position.x <= window.innerWidth && this.position.y >= 0 && this.position.y <= window.innerHeight)
            this.move(this.direction.clone().multiply(new Victor(this.speed, this.speed)).multiply(new Victor(dt, dt)));
        else {
            this.$container.remove();
            gameState.bullets[this.idx] = null;
        }
    }
}
