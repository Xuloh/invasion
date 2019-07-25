import Component from "game/ecm/Component";
import PhysicsComponent from "game/components/PhysicsComponent";
import Transform2DComponent from "game/components/Transform2DComponent";
import Victor from "victor";

export default class EnemyComponent extends Component {
    constructor(parent, player, speed, maxVelocity) {
        super(parent);
        this.player = player;
        this.speed = speed;
        this._maxVelocity = maxVelocity;
        this.physicsComponent = this.require(PhysicsComponent);
        this.transform2d = this.require(Transform2DComponent);
        if(this.physicsComponent == null)
            throw new Error("EnemyComponent needs a PhysicsComponent, please add one to its parent entity");
    }

    update(dt) {
        super.update(dt);
        this.physicsComponent.applyForce(
            this.player.position
                .clone()
                .subtract(this.transform2d.position)
                .norm()
                .multiply(new Victor(this.speed, this.speed))
                .multiply(new Victor(dt, dt))
        );
        const velocity = this.physicsComponent.velocity;
        this.physicsComponent.velocity = {
            x: Math.sign(velocity.x) * Math.min(Math.abs(velocity.x), this._maxVelocity.x),
            y: Math.sign(velocity.y) * Math.min(Math.abs(velocity.y), this._maxVelocity.y)
        };
    }
}
