import {registerHandler} from "./EventsDispatcher";

const keys = {};
const controls = {};
const mousePosition = {x: 0, y: 0};

registerHandler("keydown keyup mousedown mouseup mousemove", event => handleEvents(event));

function setControl(control, key) {
    controls[control] = key;
}

function isKeyPressed(key) {
    return Object.prototype.hasOwnProperty.call(keys, key) && keys[key];
}

function isControlPressed(control) {
    return Object.prototype.hasOwnProperty.call(controls, control) && this.isKeyPressed(controls[control]);
}

function getMousePosition() {
    return {
        get x() {
            return mousePosition.x;
        },
        get y() {
            return mousePosition.y;
        }
    };
}

function handleEvents(event) {
    const keyCode = event.originalEvent.code;
    const mouseButton = event.originalEvent.button;
    switch(event.type) {
        case "keydown":
            keys[keyCode] = true;
            break;
        case "keyup":
            keys[keyCode] = false;
            break;
        case "mousedown":
            keys[`mouse${mouseButton}`] = true;
            break;
        case "mouseup":
            keys[`mouse${mouseButton}`] = false;
            break;
        case "mousemove":
            mousePosition.x = event.originalEvent.clientX;
            mousePosition.y = event.originalEvent.clientY;
            break;
        default:
            break;
    }
}

export {
    setControl,
    isKeyPressed,
    isControlPressed,
    getMousePosition
};
