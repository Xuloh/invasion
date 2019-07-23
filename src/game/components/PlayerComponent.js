import Component from "../ecm/Component";
import PhysicsComponent from "./PhysicsComponent";
import Victor from "victor";
import {isControlPressed} from "../../events/ControlsManager";

export default class PlayerComponent extends Component {
    constructor(parent, speed, maxVelocity) {
        super(parent);
        this.speed = speed;
        this.fireCooldown = true;
        this._maxVelocity = maxVelocity;
        this.physicsComponent = this._parent.getComponent(PhysicsComponent);

        if(this.physicsComponent == null)
            throw new Error("PlayerComponent needs a PhysicsComponent, please add one to its parent entity");
    }

    update(dt) {
        super.update(dt);
        this.movePlayer(dt);
        this.fire();
    }

    movePlayer(dt) {
        if(isControlPressed("up"))
            this.physicsComponent.applyForce({x: 0, y: -this.speed * dt});
        if(isControlPressed("down"))
            this.physicsComponent.applyForce({x: 0, y: this.speed * dt});
        if(isControlPressed("left"))
            this.physicsComponent.applyForce({x: -this.speed * dt, y: 0});
        if(isControlPressed("right"))
            this.physicsComponent.applyForce({x: this.speed * dt, y: 0});

        const velocity = this.physicsComponent.velocity;
        this.physicsComponent.velocity = {
            x: Math.sign(velocity.x) * Math.min(Math.abs(velocity.x), this._maxVelocity.x),
            y: Math.sign(velocity.y) * Math.min(Math.abs(velocity.y), this._maxVelocity.y)
        };
    }

    fire() {
        if(this.fireCooldown && isControlPressed("fire")) {
            const ratio = gameState.pixelToMetersRatio;

            const mousePos = Victor.fromObject(gameState.mouse.position).multiply({x: 1 / ratio, y: 1 / ratio});
            const playerPos = this._parent.position;
            const playerToMouse = mousePos.distance(playerPos);

            const position = {
                x: playerPos.x + (mousePos.x - playerPos.x) * 1.5 / playerToMouse,
                y: playerPos.y + (mousePos.y - playerPos.y) * 1.5 / playerToMouse
            };
            const direction = mousePos.subtract(this._parent.position).norm();

            const bullet = gameState.ef.makeBullet(position, direction);

            gameState.mainScene.entities.push(bullet);
            this.fireCooldown = false;
            setTimeout(() => this.fireCooldown = true, 500);
        }
    }
}
