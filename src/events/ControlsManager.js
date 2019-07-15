export default class ControlsManager {
    constructor() {
        this.keys = {};
        this.controls = {};
        gameState.eventsDispatcher.registerHandler("keydown keyup mousedown mouseup", event => this._handleEvents(event));
    }

    setControl(control, key) {
        this.controls[control] = key;
    }

    isKeyPressed(key) {
        return Object.prototype.hasOwnProperty.call(this.keys, key) && this.keys[key];
    }

    isControlPressed(control) {
        return Object.prototype.hasOwnProperty.call(this.controls, control) && this.isKeyPressed(this.controls[control]);
    }

    _handleEvents(event) {
        const keyCode = event.originalEvent.code;
        const mouseButton = event.originalEvent.button;
        switch(event.type) {
            case "keydown":
                this.keys[keyCode] = true;
                break;
            case "keyup":
                this.keys[keyCode] = false;
                break;
            case "mousedown":
                this.keys[`mouse${mouseButton}`] = true;
                break;
            case "mouseup":
                this.keys[`mouse${mouseButton}`] = false;
                break;
            default:
                break;
        }
    }
}
