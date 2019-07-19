import {Bodies, Body, World} from "matter-js";
import Component from "../ecm/Component";

export default class PhysicsComponent extends Component {
    constructor(parent, type, options) {
        super(parent);
        const position = this._parent.position;

        if(options.label == null)
            options.label = this._parent.label;

        if(type === "circle") {
            if(options.radius == null)
                options.radius = 1;
            this.body = Bodies.circle(position.x, position.y, options.radius, options);
        }
        else if(type === "rectangle") {
            if(options.width == null)
                options.width = 1;
            if(options.height == null)
                options.height = 1;
            this.body = Bodies.circle(position.x, position.y, options.width, options.height, options);
        }
        World.add(gameState.physicsManager.world, this.body);
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
        World.remove(gameState.physicsManager.world, this.body);
    }
}
