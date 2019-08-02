import * as PhysicsManager from "game/PhysicsManager";
import Component from "game/ecm/Component";
import Entity2D from "game/entities/Entity2D";
import HealthComponent from "game/components/HealthComponent";
import PhysicsComponent from "game/components/PhysicsComponent";
import Transform2DComponent from "game/components/Transform2DComponent";
import {vec2} from "gl-matrix";

export default class EnemyComponent extends Component {
    constructor(parent, player, speed, maxVelocity) {
        super(parent);
        if(!(player instanceof Entity2D))
            throw new TypeError("Given player must be an instance of Entity2D");
        this.player = player.getComponent(Transform2DComponent);
        this.speed = speed;
        this._maxVelocity = maxVelocity;
        this.touchingPlayer = false;
        this.physicsComponent = this.require(PhysicsComponent);
        this.transform2d = this.require(Transform2DComponent);
        this.healthComponent = this.require(HealthComponent);
        this.physicsComponent.onCollision(event => this.onCollision(event));
    }

    update(dt) {
        super.update(dt);

        if(!this.touchingPlayer) {
            const force = vec2.fromValues(this.player.position[0], this.player.position[1]);
            vec2.subtract(force, force, this.transform2d.position);
            vec2.normalize(force, force);
            vec2.multiply(force, force, [this.speed, this.speed]);
            vec2.multiply(force, force, [dt, dt]);

            this.physicsComponent.applyForce(force);

            const velocity = this.physicsComponent.velocity;
            this.physicsComponent.velocity = [
                Math.sign(velocity[0]) * Math.min(Math.abs(velocity[0]), this._maxVelocity),
                Math.sign(velocity[1]) * Math.min(Math.abs(velocity[1]), this._maxVelocity)
            ];
        }
    }

    onCollision(event) {
        if(event.name === "collisionStart") {
            switch(event.other.collisionFilter.category) {
                case PhysicsManager.getCollisionFilter("bullet").category:
                    this.healthComponent.health--;
                    break;
                case PhysicsManager.getCollisionFilter("player").category:
                    this.touchingPlayer = true;
                    break;
                default:
                    break;
            }
        }
        else if(event.name === "collisionEnd")
            this.touchingPlayer = false;
    }
}
