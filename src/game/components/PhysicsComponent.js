import {Bodies, Body, World} from "matter-js";
import Component from "../ecm/Component";

export default class PhysicsComponent extends Component {
    constructor(parent, world, radius, options) {
        super(parent);
        this.world = world;
        const position = this._parent.position;
        this.body = Bodies.circle(position.x, position.y, radius, options);
        World.add(this.world, this.body);
    }

    update() {
        this._parent.position = {
            x: this.body.position.x,
            y: this.body.position.y
        };
        this._parent.angle = this.body.angle;
    }

    get velocity() {
        return this.body.velocity;
    }

    set velocity(velocity) {
        Body.setVelocity(this.body, velocity);
    }

    applyForce(force) {
        Body.applyForce(this.body, this.body.position, force);
    }

    destroy() {
        World.remove(this.world, this.body);
    }
}
