import Victor from "victor";
import Entity from "./Entity.js";

export default class Enemy extends Entity {
    constructor(container, position, speed) {
        super(container, position);
        this.speed = speed;
    }

    update(dt) {
        super.update(dt);
        this.move(
            gameState.player.position
                .clone()
                .subtract(this.position)
                .norm()
                .multiply(new Victor(this.speed, this.speed))
                .multiply(new Victor(dt, dt))
        );
    }
}
