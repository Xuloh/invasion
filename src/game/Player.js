import Victor from "victor";
import Bullet from "./Bullet.js";
import Entity from "./Entity.js";

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

        if(this.fireCooldown && gameState.mouse.buttons.left === "down") {
            const container = $('<div class="bullet entity"/>');
            container.appendTo(gameState.$container);
            const bullet = new Bullet(container, this.position, Victor.fromObject(gameState.mouse.position).subtract(this.position), 800);
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
        if(gameState.keyState.up === "down")
            this.move({y: -this.speed * dt});
        if(gameState.keyState.down === "down")
            this.move({y: this.speed * dt});
        if(gameState.keyState.left === "down")
            this.move({x: -this.speed * dt});
        if(gameState.keyState.right === "down")
            this.move({x: this.speed * dt});

        const x = this.position.x;
        const y = this.position.y;

        if(y - this.center.y < 0)
            this.position.y = 0 + this.center.y;
        else if(y + this.center.y > window.innerHeight)
            this.position.y = window.innerHeight - this.center.y;

        if(x - this.center.x < 0)
            this.position.x = 0 + this.center.x;
        else if(x + this.center.x > window.innerWidth)
            this.position.x = window.innerWidth - this.center.x;
    }
}
