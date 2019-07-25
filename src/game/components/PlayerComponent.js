import * as SceneManager from "game/SceneManager";
import {getMousePosition, isControlPressed} from "events/ControlsManager";
import Bullet from "game/entities/Bullet";
import Component from "game/ecm/Component";
import PhysicsComponent from "game/components/PhysicsComponent";
import Transform2DComponent from "game/components/Transform2DComponent";
import {mapScreenToWorldCoordinates} from "game/Renderer";
import {timeout} from "util/PromiseUtil";
import {vec2} from "gl-matrix";

export default class PlayerComponent extends Component {
    constructor(parent, speed, maxVelocity) {
        super(parent);
        this.speed = speed;
        this.fireCooldown = true;
        this._maxVelocity = maxVelocity;
        this.physicsComponent = this.require(PhysicsComponent);
        this.transform2d = this.require(Transform2DComponent);
    }

    update(dt) {
        super.update(dt);
        this.movePlayer(dt);
        this.fire();
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

    fire() {
        if(this.fireCooldown && isControlPressed("fire")) {
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

            this.fireCooldown = false;
            timeout(500).then(() => this.fireCooldown = true);
        }
    }
}
