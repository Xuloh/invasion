import $ from "jquery";

const keyHandlers = {};
const mouseHandlers = {};

function registerKeyHandler(keyCode, handler) {
    if(!(keyCode in keyHandlers))
        keyHandlers[keyCode] = [];
    keyHandlers[keyCode].push(handler);
}

function registerMouseHandler(button, handler) {
    if(!(button in mouseHandlers))
        mouseHandlers[button] = [];
    mouseHandlers[button].push(handler);
}

function initHandlers() {
    $(window).on("keydown", keyDownHandler);
    $(window).on("keyup", keyUpHandler);
    $(window).on("mousemove", mouseMoveHandler);
    $(window).on("mousedown", mouseDownHandler);
    $(window).on("mouseup", mouseUpHandler);
}

function keyDownHandler(event) {
    const keyCode = event.originalEvent.code;
    if(keyCode in keyHandlers) {
        event.preventDefault();
        keyHandlers[keyCode].forEach(h => h(event));
    }
}

function keyUpHandler(event) {
    const keyCode = event.originalEvent.code;
    if(keyCode in keyHandlers) {
        event.preventDefault();
        keyHandlers[keyCode].forEach(h => h(event));
    }
}

function mouseMoveHandler(event) {
    gameState.mouse.position = {
        x: event.originalEvent.clientX,
        y: event.originalEvent.clientY
    };
}

function mouseDownHandler(event) {
    const button = event.originalEvent.button;
    if(button in mouseHandlers) {
        event.preventDefault();
        mouseHandlers[button].forEach(h => h(event));
    }
}

function mouseUpHandler(event) {
    const button = event.originalEvent.button;
    if(button in mouseHandlers) {
        event.preventDefault();
        mouseHandlers[button].forEach(h => h(event));
    }
}

export {
    registerKeyHandler,
    registerMouseHandler,
    initHandlers
};
