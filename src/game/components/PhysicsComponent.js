import {Bodies, Body, World} from "matter-js";
import Component from "game/ecm/Component";
import Transform2DComponent from "game/components/Transform2DComponent";
import {getWorld} from "game/PhysicsManager";

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
        const velocity = this.body.velocity;
        return [velocity.x, velocity.y];
    }

    set velocity(velocity) {
        Body.setVelocity(this.body, {x: velocity[0], y: velocity[1]});
    }

    applyForce(force) {
        Body.applyForce(this.body, this.body.position, {x: force[0], y: force[1]});
    }

    destroy() {
        World.remove(this.world, this.body);
    }
}
