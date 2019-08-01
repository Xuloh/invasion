import Component from "game/ecm/Component";
import PhysicsComponent from "game/components/PhysicsComponent";
import Timeout from "util/Timeout";
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
        this.timeout = new Timeout(2);
    }

    update(dt) {
        super.update(dt);

        if(this.timeout.update(dt))
            this._parent.setForDeletion();
        else {
            const velocity = vec2.create();
            vec2.copy(velocity, this.direction);
            vec2.multiply(velocity, velocity, [this.speed, this.speed]);

            this.physicsComponent.velocity = velocity;
        }
    }
}
