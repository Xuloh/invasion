import Component from "../ecm/Component.js";
import PhysicsComponent from "./PhysicsComponent.js";
import Victor from "victor";

export default class BulletComponent extends Component {
    constructor(parent, direction, speed) {
        super(parent);
        this.speed = speed;

        this.physicsComponent = this._parent.getComponent(PhysicsComponent);
        if(this.physicsComponent == null)
            throw new Error("BulletComponent needs a PhysicsComponent, please add one to its parent entity");

        if(direction == null)
            this.direction = new Victor(0, 0);
        else if(typeof direction === "object")
            this.direction = Victor.fromObject(direction);
        else if(Array.isArray(direction))
            this.direction = Victor.fromArray(direction);
        else
            throw TypeError("direction should either be an array or an object with a x and y property");

        this.direction.norm();
    }

    update(dt) {
        super.update(dt);
        if(this._parent.position.x >= 0 && this._parent.position.x <= window.innerWidth && this._parent.position.y >= 0 && this._parent.position.y <= window.innerHeight) {
            this._parent.move(
                this.direction
                    .clone()
                    .multiply(new Victor(this.speed, this.speed))
                    .multiply(new Victor(dt, dt))
            );
        }
        else
            this._parent.setForDeletion();
    }
}
