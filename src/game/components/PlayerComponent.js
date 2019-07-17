import Victor from "victor";
import Component from "../ecm/Component.js";

export default class PlayerComponent extends Component {
    constructor(parent, speed) {
        super(parent);
        this.speed = speed;
        this.fireCooldown = true;
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
            this._parent.move({y: -this.speed * dt});
        if(gameState.controlsManager.isControlPressed("down"))
            this._parent.move({y: this.speed * dt});
        if(gameState.controlsManager.isControlPressed("left"))
            this._parent.move({x: -this.speed * dt});
        if(gameState.controlsManager.isControlPressed("right"))
            this._parent.move({x: this.speed * dt});

        const x = this._parent.position.x;
        const y = this._parent.position.y;

        if(y - this._parent.origin.y < 0)
            this._parent.position.y = 0 + this._parent.origin.y;
        else if(y + this._parent.origin.y > window.innerHeight)
            this._parent.position.y = window.innerHeight - this._parent.origin.y;

        if(x - this._parent.origin.x < 0)
            this._parent.position.x = 0 + this._parent.origin.x;
        else if(x + this._parent.origin.x > window.innerWidth)
            this._parent.position.x = window.innerWidth - this._parent.origin.x;
    }
}
