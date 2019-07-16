import Victor from "victor";
import Bullet from "./Bullet.js";
import Entity from "./ecm/Entity.js";

export default class Player extends Entity {
    constructor(position, speed) {
        super(position, {width: 50, height: 50});
        this.speed = speed;
        this.fireCooldown = true;
        this.$container.addClass("player");
    }

    update(dt) {
        super.update(dt);
        this.movePlayer(dt);

        if(this.fireCooldown && gameState.controlsManager.isControlPressed("fire")) {
            const bullet = new Bullet(this.position, Victor.fromObject(gameState.mouse.position).subtract(this.position), 800);
            let idx = gameState.bullets.indexOf(null);
            if(idx >= 0) {
                bullet.idx = idx;
                gameState.bullets[idx] = bullet;
            }
            else {
                idx = gameState.bullets.push(bullet);
                bullet.idx = idx - 1;
            }

            this.fireCooldown = false;
            setTimeout(() => this.fireCooldown = true, 500);
        }
    }

    movePlayer(dt) {
        if(gameState.controlsManager.isControlPressed("up"))
            this.move({y: -this.speed * dt});
        if(gameState.controlsManager.isControlPressed("down"))
            this.move({y: this.speed * dt});
        if(gameState.controlsManager.isControlPressed("left"))
            this.move({x: -this.speed * dt});
        if(gameState.controlsManager.isControlPressed("right"))
            this.move({x: this.speed * dt});

        const x = this.position.x;
        const y = this.position.y;

        if(y - this.origin.y < 0)
            this.position.y = 0 + this.origin.y;
        else if(y + this.origin.y > window.innerHeight)
            this.position.y = window.innerHeight - this.origin.y;

        if(x - this.origin.x < 0)
            this.position.x = 0 + this.origin.x;
        else if(x + this.origin.x > window.innerWidth)
            this.position.x = window.innerWidth - this.origin.x;
    }
}
