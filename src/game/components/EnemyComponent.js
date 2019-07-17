import Victor from "victor";
import Component from "../ecm/Component.js";

export default class EnemyComponent extends Component {
    constructor(parent, player, speed) {
        super(parent);
        this.player = player;
        this.speed = speed;
    }

    update(dt) {
        super.update(dt);
        this._parent.move(
            this.player.position
                .clone()
                .subtract(this._parent.position)
                .norm()
                .multiply(new Victor(this.speed, this.speed))
                .multiply(new Victor(dt, dt))
        );
    }
}
