class Entity {
    constructor(container, position) {
        if(typeof container === "string")
            this.$container = $(container);
        else if(container instanceof jQuery)
            this.$container = container;

        if(position == null)
            this.position = new Victor(0, 0);
        else if(Array.isArray(position))
            this.position = Victor.fromArray(position);
        else if(typeof position === "object")
            this.position = Victor.fromObject(position);
        else
            throw TypeError("position should either be an array or an object with a x and y property");

        this.center = new Victor(this.$container.width() / 2, this.$container.height() / 2);

        this.$container.css({
            top: Math.round(this.position.y - this.center.y) + "px",
            left: Math.round(this.position.x - this.center.x) + "px"
        });
    }

    update(dt) {
        this.$container.css({
            top: Math.round(this.position.y - this.center.y) + "px",
            left: Math.round(this.position.x - this.center.x) + "px"
        });
    }

    move(movement) {
        if(typeof movement === "object")
            movement = Victor.fromObject(movement);
        else if(Array.isArray(movement))
            movement = Victor.fromArray(movement);
        else
            throw TypeError("movement should either be an array or an object with a x and y property");

        this.position.add(movement);

        return this;
    }

    setPosition(position) {
        if(typeof position === "object")
            position = Victor.fromObject(position);
        else if(Array.isArray(position))
            position = Victor.fromArray(position);
        else
            throw TypeError("position should either be an array or an object with a x and y property");

        this.position.copy(position);
        return this;
    }
}

class Player extends Entity {
    constructor(container, position, speed) {
        super(container, position);
        this.speed = speed;
        this.fireCooldown = true;
    }

    update(dt) {
        super.update(dt);
        this.movePlayer(dt);

        if(this.fireCooldown && gameState.mouse.buttons.left === "down") {
            let container = $('<div class="bullet entity"/>');
            container.appendTo(gameState.$container);
            let bullet = new Bullet(container, this.position, Victor.fromObject(gameState.mouse.position).subtract(this.position), 800);
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

        let x = this.position.x;
        let y = this.position.y;

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

class Pointer extends Entity {
    constructor(container, position, player, distanceToPlayer) {
        super(container, position);
        this.player = player;
        this.distanceToPlayer = distanceToPlayer;
    }

    update(dt) {
        super.update(dt);
        let mousePos = Victor.fromObject(gameState.mouse.position);
        let playerPos = this.player.position;
        let playerToMouse = mousePos.distance(playerPos);
        this.setPosition({
            x: playerPos.x + (mousePos.x - playerPos.x) * this.distanceToPlayer / playerToMouse,
            y: playerPos.y + (mousePos.y - playerPos.y) * this.distanceToPlayer / playerToMouse
        });
    }
}

class Bullet extends Entity {
    constructor(container, position, direction, speed) {
        super(container, position);
        this.speed = speed;

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
        if(this.position.x >= 0 && this.position.x <= window.innerWidth && this.position.y >= 0 && this.position.y <= window.innerHeight)
            this.move(this.direction.clone().multiply(new Victor(this.speed, this.speed)).multiply(new Victor(dt, dt)));
        else {
            this.$container.remove();
            gameState.bullets[this.idx] = null;
        }
    }
}

class Enemy extends Entity {
    constructor(container, position, speed) {
        super(container, position);
        this.speed = speed;
    }

    update(dt) {
        super.update(dt);
        this.move(
            gameState.player.position
                .clone()
                .subtract(this.position)
                .norm()
                .multiply(new Victor(this.speed, this.speed))
                .multiply(new Victor(dt, dt))
        );
    }
}

function update(dt) {
    gameState.player.update(dt);
    gameState.pointer.update(dt);
    gameState.bullets.filter(b => b != null).forEach(b => b.update(dt));
    gameState.enemies.filter(e => e != null).forEach(e => e.update(dt));
};

$(() => {
    let player = new Player("#player", {x: window.innerWidth / 2, y: window.innerHeight / 2}, 450);
    let pointer = new Pointer("#pointer", {x: window.innerWidth / 2, y: window.innerHeight / 2}, player, 70);

    let enemy1 = $('<div class="enemy entity"/>');
    let enemy2 = $('<div class="enemy entity"/>');
    let enemy3 = $('<div class="enemy entity"/>');

    window.gameState = {
        $container: $("#game"),
        player: player,
        pointer: pointer,
        bullets: [],
        enemies: [],
        keyState: {
            up: "up",
            down: "up",
            left: "up",
            right: "up"
        },
        mouse: {
            position: {
                x: 0,
                y: 0
            },
            buttons: {
                left: "up"
            }
        }
    };

    enemy1.appendTo(gameState.$container);
    enemy2.appendTo(gameState.$container);
    enemy3.appendTo(gameState.$container);

    gameState.enemies = [
        new Enemy(enemy1, [100, 100], 300),
        new Enemy(enemy2, [100, window.innerHeight - 100], 300),
        new Enemy(enemy3, [window.innerWidth - 100, window.innerHeight / 2], 300)
    ];

    $("#start").on("click", event => {
        $("#menu").hide();
        $("#game").removeClass("inactive");
        let lastUpdate = window.performance.now();
        let main = now => {
            window.requestAnimationFrame(main);
            let dt = (now - lastUpdate) / 1000;
            lastUpdate = now;
            update(dt);
        };
        main(lastUpdate);
    });

    // *** key handlers to update key state ***
    $(window).on("keydown", event => {
        switch(event.originalEvent.code) {
            case "KeyW":
                event.preventDefault();
                gameState.keyState.up = "down";
                break;
            case "KeyS":
                event.preventDefault();
                gameState.keyState.down = "down";
                break;
            case "KeyA":
                event.preventDefault();
                gameState.keyState.left = "down";
                break;
            case "KeyD":
                event.preventDefault();
                gameState.keyState.right = "down";
                break;
            default:
                break;
        }
    });

    $(window).on("keyup", event => {
        switch(event.originalEvent.code) {
            case "KeyW":
                event.preventDefault();
                gameState.keyState.up = "up";
                break;
            case "KeyS":
                event.preventDefault();
                gameState.keyState.down = "up";
                break;
            case "KeyA":
                event.preventDefault();
                gameState.keyState.left = "up";
                break;
            case "KeyD":
                event.preventDefault();
                gameState.keyState.right = "up";
                break;
            default:
                break;
        }
    });
    // *** *** ***

    // *** mouse handler to update mouse state
    $(window).on("mousemove", event => {
        gameState.mouse.position = {
            x: event.originalEvent.clientX,
            y: event.originalEvent.clientY
        };
    });

    $(window).on("mousedown", event => {
        if(event.originalEvent.button === 0) {
            event.preventDefault();
            gameState.mouse.buttons.left = "down";
        }
    });

    $(window).on("mouseup", event => {
        if(event.originalEvent.button === 0) {
            event.preventDefault();
            gameState.mouse.buttons.left = "up";
        }
    });
});
