import {Bodies, World} from "matter-js";
import Component from "../ecm/Component.js";

export default class PhysicsComponent extends Component {
    constructor(parent, radius, options) {
        super(parent);
        const position = this._parent.position;
        this.body = Bodies.circle(position.x, -position.y, radius, options);
        World.add(gameState.physicsManager.world, this.body);
    }

    update() {
        this._parent.position = {
            x: this.body.position.x,
            y: -this.body.position.y
        };
    }

    destroy() {
        World.remove(gameState.physicsManager.world, this.body);
    }
}
