import Victor from "victor";
import Component from "../ecm/Component.js";

export default class EnemyComponent extends Component {
    constructor(parent, speed) {
        super(parent);
        this.speed = speed;
    }

    update(dt) {
        super.update(dt);
        this.parent.move(
            gameState.player.position
                .clone()
                .subtract(this.parent.position)
                .norm()
                .multiply(new Victor(this.speed, this.speed))
                .multiply(new Victor(dt, dt))
        );
    }
}
