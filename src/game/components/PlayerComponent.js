import * as PhysicsManager from "game/PhysicsManager";
import * as SceneManager from "game/SceneManager";
import {getMousePosition, isControlPressed} from "events/ControlsManager";
import Bullet from "game/entities/Bullet";
import Component from "game/ecm/Component";
import HealthComponent from "game/components/HealthComponent";
import PhysicsComponent from "game/components/PhysicsComponent";
import Timeout from "util/Timeout";
import Transform2DComponent from "game/components/Transform2DComponent";
import {mapScreenToWorldCoordinates} from "game/Renderer";
import {vec2} from "gl-matrix";

export default class PlayerComponent extends Component {
    constructor(parent, speed, maxVelocity) {
        super(parent);
        this.speed = speed;
        this._maxVelocity = maxVelocity;
        this.physicsComponent = this.require(PhysicsComponent);
        this.transform2d = this.require(Transform2DComponent);
        this.healthComponent = this.require(HealthComponent);
        this.physicsComponent.onCollision(event => this.onCollision(event));
        this.fireCooldown = new Timeout(0.5);
    }

    update(dt) {
        super.update(dt);
        this.movePlayer(dt);
        this.fire(dt);
    }

    movePlayer(dt) {
        if(isControlPressed("up"))
            this.physicsComponent.applyForce([0, this.speed * dt]);
        if(isControlPressed("down"))
            this.physicsComponent.applyForce([0, -this.speed * dt]);
        if(isControlPressed("left"))
            this.physicsComponent.applyForce([-this.speed * dt, 0]);
        if(isControlPressed("right"))
            this.physicsComponent.applyForce([this.speed * dt, 0]);

        const velocity = this.physicsComponent.velocity;
        this.physicsComponent.velocity = [
            Math.sign(velocity[0]) * Math.min(Math.abs(velocity[0]), this._maxVelocity),
            Math.sign(velocity[1]) * Math.min(Math.abs(velocity[1]), this._maxVelocity)
        ];
    }

    fire(dt) {
        if(this.fireCooldown.update(dt) && isControlPressed("fire")) {
            this.fireCooldown.reset();

            const mousePos = mapScreenToWorldCoordinates([getMousePosition().x, getMousePosition().y]);
            const playerPos = this.transform2d.position;
            const playerToMouse = vec2.distance(mousePos, playerPos);

            const position = [
                playerPos[0] + (mousePos[0] - playerPos[0]) * 1.5 / playerToMouse,
                playerPos[1] + (mousePos[1] - playerPos[1]) * 1.5 / playerToMouse
            ];

            const direction = vec2.create();
            vec2.subtract(direction, mousePos, playerPos);
            vec2.normalize(direction, direction);

            SceneManager.message({
                type: "spawn",
                args: {
                    entity: Bullet,
                    options: [position, direction]
                }
            });
        }
    }

    onCollision(event) {
        if(event.other.collisionFilter.category === PhysicsManager.getCollisionFilter("enemy").category)
            this.healthComponent.health--;
    }
}
