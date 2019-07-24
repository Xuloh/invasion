import {Bodies, Body, World} from "matter-js";
import Component from "../ecm/Component";
import Transform2DComponent from "./Transform2DComponent";
import {getWorld} from "../PhysicsManager";

export default class PhysicsComponent extends Component {
    constructor(parent, radius, options) {
        super(parent);
        this.world = getWorld();
        this.transform2d = this.require(Transform2DComponent);
        const position = this.transform2d.position;
        this.body = Bodies.circle(position.x, position.y, radius, options);
        World.add(this.world, this.body);
    }

    update() {
        /*this.transform2d.position = [
            this.body.position.x,
            this.body.position.y
        ];
        this.transform2d.rotation = this.body.angle;*/
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
