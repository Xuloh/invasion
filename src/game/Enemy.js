import Victor from "victor";
import Entity from "./ecm/Entity.js";

export default class Enemy extends Entity {
    constructor(position, speed) {
        super(position, {width: 50, height: 50});
        this.speed = speed;
        this.$container.addClass("enemy");
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
