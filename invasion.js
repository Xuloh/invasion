class Entity {
    constructor(container, position) {
        if(typeof container === "string")
            this.$container = $(container);
        else if(container instanceof jQuery)
            this.$container = container;

        if(position == null)
            this.position = {
                x: 0,
                y: 0
            };
        else
            this.position = position;

        this.center = {
            x: this.$container.width() / 2,
            y: this.$container.height() / 2
        };

        this.$container.css({
            top: (this.position.y - this.center.y) + "px",
            left: (this.position.x - this.center.x) + "px"
        });
    }

    update(dt) {
        this.$container.css({
            top: (this.position.y - this.center.y) + "px",
            left: (this.position.x - this.center.x) + "px"
        });
    }

    move(movement) {
        if(typeof movement !== "object" || movement.x == null && movement.y == null)
            throw TypeError("movement should be an object with a top and a left property");

        if(movement.x == null)
            movement.x = 0;
        if(movement.y == null)
            movement.y = 0;

        this.position = {
            x: this.position.x + movement.x,
            y: this.position.y + movement.y
        };

        return this;
    }

    setPosition(position) {
        this.position = {
            x: position.x,
            y: position.y
        };
        return this;
    }
}

class Player extends Entity {
    constructor(container, position, speed) {
        super(container, position);
        this.speed = speed;
    }

    update(dt) {
        super.update(dt);
        this.movePlayer(dt);
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

    computeMouseAngle() {
        let mouseVec = {
            x: (gameState.mouse.position.x - this.position.x) / window.innerWidth,
            y: (gameState.mouse.position.y - this.position.y) / window.innerHeight
        };

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
        let mousePos = gameState.mouse.position;
        let playerPos = this.player.position;
        let playerToMouse = Math.sqrt(Math.pow(mousePos.x - playerPos.x, 2) + Math.pow(mousePos.y - playerPos.y, 2));
        this.setPosition({
            x: playerPos.x + (mousePos.x - playerPos.x) * this.distanceToPlayer / playerToMouse,
            y: playerPos.y + (mousePos.y - playerPos.y) * this.distanceToPlayer / playerToMouse
        });
    }
}

function update(dt) {
    gameState.player.update(dt);
    gameState.pointer.update(dt);
};

$(() => {
    let player = new Player("#player", {x: window.innerWidth / 2, y: window.innerHeight / 2}, 1);
    let pointer = new Pointer("#pointer", {x: window.innerWidth / 2, y: window.innerHeight / 2}, player, 70);
    window.gameState = {
        player: player,
        pointer: pointer,
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
            }
        }
    };

    $("#start").on("click", (event) => {
        $("#menu").hide();
        $("#game").removeClass("inactive");
        let lastUpdate = Date.now();
        let mainLoop = setInterval(() => {
            let now = Date.now();
            let dt = now - lastUpdate;
            lastUpdate = now;
            update(dt);
        }, 0);
    });

    // *** key handlers to update key state ***
    $(window).on("keydown", (event) => {
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

    $(window).on("keyup", (event) => {
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
    $(window).on("mousemove", (event) => {
        gameState.mouse.position = {
            x: event.originalEvent.clientX,
            y: event.originalEvent.clientY
        };
    });
});
