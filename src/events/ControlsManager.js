import {registerHandler} from "./EventsDispatcher";

const keys = {};
const controls = {};

registerHandler("keydown keyup mousedown mouseup", event => handleEvents(event));

function setControl(control, key) {
    controls[control] = key;
}

function isKeyPressed(key) {
    return Object.prototype.hasOwnProperty.call(keys, key) && keys[key];
}

function isControlPressed(control) {
    return Object.prototype.hasOwnProperty.call(controls, control) && this.isKeyPressed(controls[control]);
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
        default:
            break;
    }
}

export {
    setControl,
    isKeyPressed,
    isControlPressed
};
