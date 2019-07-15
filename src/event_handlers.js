import $ from "jquery";

const keyHandlers = {};
const mouseHandlers = {};

let eventsEnabled = true;

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

function enableEvents(enable) {
    enable = enable || true;
    eventsEnabled = enable;
}

function getNextEvent(events, disableEvents) {
    disableEvents = disableEvents || true;
    return new Promise(resolve => {
        enableEvents(!disableEvents);
        $(window).on(events, function oneTimeEvent(event) {
            $(window).off(event, oneTimeEvent);
            resolve(event);
        });
    });
}

function keyDownHandler(event) {
    if(eventsEnabled) {
        const keyCode = event.originalEvent.code;
        if(keyCode in keyHandlers) {
            event.preventDefault();
            keyHandlers[keyCode].forEach(h => h(event));
        }
    }
}

function keyUpHandler(event) {
    if(eventsEnabled) {
        const keyCode = event.originalEvent.code;
        if(keyCode in keyHandlers) {
            event.preventDefault();
            keyHandlers[keyCode].forEach(h => h(event));
        }
    }
}

function mouseMoveHandler(event) {
    if(eventsEnabled) {
        gameState.mouse.position = {
            x: event.originalEvent.clientX,
            y: event.originalEvent.clientY
        };
    }
}

function mouseDownHandler(event) {
    if(eventsEnabled) {
        const button = event.originalEvent.button;
        if(button in mouseHandlers) {
            event.preventDefault();
            mouseHandlers[button].forEach(h => h(event));
        }
    }
}

function mouseUpHandler(event) {
    if(eventsEnabled) {
        const button = event.originalEvent.button;
        if(button in mouseHandlers) {
            event.preventDefault();
            mouseHandlers[button].forEach(h => h(event));
        }
    }
}

export {
    registerKeyHandler,
    registerMouseHandler,
    initHandlers,
    getNextEvent
};
