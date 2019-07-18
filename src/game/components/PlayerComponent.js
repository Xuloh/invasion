import Component from "../ecm/Component.js";
import PhysicsComponent from "./PhysicsComponent.js";
import Victor from "victor";

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

        if(this.fireCooldown && gameState.controlsManager.isControlPressed("fire")) {
            const bullet = gameState.ef.makeBullet(this._parent.position, Victor.fromObject(gameState.mouse.position).subtract(this._parent.position));
            gameState.mainScene.entities.push(bullet);
            this.fireCooldown = false;
            setTimeout(() => this.fireCooldown = true, 500);
        }
    }

    movePlayer(dt) {
        if(gameState.controlsManager.isControlPressed("up"))
            this.physicsComponent.applyForce({x: 0, y: -this.speed * dt});
        if(gameState.controlsManager.isControlPressed("down"))
            this.physicsComponent.applyForce({x: 0, y: this.speed * dt});
        if(gameState.controlsManager.isControlPressed("left"))
            this.physicsComponent.applyForce({x: -this.speed * dt, y: 0});
        if(gameState.controlsManager.isControlPressed("right"))
            this.physicsComponent.applyForce({x: this.speed * dt, y: 0});

        const velocity = this.physicsComponent.velocity;
        this.physicsComponent.velocity = {
            x: Math.sign(velocity.x) * Math.min(Math.abs(velocity.x), this._maxVelocity.x),
            y: Math.sign(velocity.y) * Math.min(Math.abs(velocity.y), this._maxVelocity.y)
        };
    }
}
