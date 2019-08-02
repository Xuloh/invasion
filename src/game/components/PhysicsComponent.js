import {Bodies, Body, World} from "matter-js";
import {getCollisionFilter, getWorld} from "game/PhysicsManager";
import Component from "game/ecm/Component";
import Transform2DComponent from "game/components/Transform2DComponent";

export default class PhysicsComponent extends Component {
    constructor(parent, radius, category, options) {
        super(parent);
        this.world = getWorld();
        this.transform2d = this.require(Transform2DComponent);
        this.collisionHandlers = [];
        let collisionFilter = null;
        if(category != null && typeof category === "string")
            collisionFilter = getCollisionFilter(category);

        const position = this.transform2d.position;
        const angle = this.transform2d.rotation;
        this.body = Bodies.circle(position[0], position[1], radius, {
            label: this._parent.label,
            ...options,
            angle: angle,
            collisionFilter: collisionFilter
        });
        this.body._physicsComponent = this;
        World.add(this.world, this.body);
    }

    update() {
        this.transform2d.position = [
            this.body.position.x,
            this.body.position.y
        ];
        this.transform2d.rotation = this.body.angle;
    }

    onCollision(handler) {
        this.collisionHandlers.push(handler);
    }

    collisionEvent(event) {
        this.collisionHandlers.forEach(h => h(event));
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
