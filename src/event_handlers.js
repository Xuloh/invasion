// *** key handlers to update key state ***
export {
    keyDownHandler,
    keyUpHandler,
    mouseMoveHandler,
    mouseDownHandler,
    mouseUpHandler
};

function keyDownHandler(event) {
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
}

function keyUpHandler(event) {
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
        case "Escape":
            event.preventDefault();
            window.cancelAnimationFrame(gameState.stopMain);
            $("#menu").show();
            $("#game").addClass("inactive");
        default:
            break;
    }
}
// *** *** ***

// *** mouse handler to update mouse state
function mouseMoveHandler(event) {
    gameState.mouse.position = {
        x: event.originalEvent.clientX,
        y: event.originalEvent.clientY
    };
}

function mouseDownHandler(event) {
    if(event.originalEvent.button === 0) {
        event.preventDefault();
        gameState.mouse.buttons.left = "down";
    }
}

function mouseUpHandler(event) {
    if(event.originalEvent.button === 0) {
        event.preventDefault();
        gameState.mouse.buttons.left = "up";
    }
}
