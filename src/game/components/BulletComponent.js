import Component from "game/ecm/Component";
import PhysicsComponent from "game/components/PhysicsComponent";
import {timeout} from "util/PromiseUtil";
import {vec2} from "gl-matrix";

export default class BulletComponent extends Component {
    constructor(parent, direction, speed) {
        super(parent);
        this.speed = speed;

        this.physicsComponent = this.require(PhysicsComponent);
        if(direction == null)
            this.direction = vec2.create();
        else if(Array.isArray(direction))
            this.direction = vec2.fromValues(...direction);
        else if(direction instanceof Float32Array)
            this.direction = direction;
        else
            throw TypeError("direction should be an array");

        vec2.normalize(this.direction, this.direction);

        // bullet ttl
        timeout(2000).then(() => this._parent.setForDeletion());
    }

    update(dt) {
        super.update(dt);

        const force = vec2.create();
        vec2.copy(force, this.direction);
        vec2.multiply(force, force, [this.speed, this.speed]);
        vec2.multiply(force, force, [dt, dt]);

        this.physicsComponent.applyForce(force);
    }
}
