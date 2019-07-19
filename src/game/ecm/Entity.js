import Component from "./Component.js";
import Victor from "victor";

export default class Entity {
    constructor(position, size, label) {
        if(position == null)
            this._position = new Victor(0, 0);
        else if(Array.isArray(position))
            this._position = Victor.fromArray(position);
        else if(typeof position === "object")
            this._position = Victor.fromObject(position);
        else
            throw TypeError("position should either be an array or an object with an x and y property");

        if(size == null || !("width" in size) || !("height" in size))
            size = {width: 1, height: 1};

        if(label == null || typeof label !== "string")
            label = "Entity";

        this.label = label;
        this._components = [];
        this.size = size;
        this.origin = new Victor(size.width / 2, size.height / 2);
        this.angle = 0;

        this.alive = true;
        this._isForDeletion = false;
    }

    update(dt) {
        this._components.forEach((c, idx, arr) => {
            if(c.isForDeletion) {
                c.destroy();
                arr.splice(idx, 1);
            }
            else
                c.update(dt);
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

    addComponent(component, ...args) {
        if(!(component.prototype instanceof Component))
            throw new TypeError(`${component.name} is not a subclass of Component`);
        this._components.push(new component(this, ...args));
    }

    getComponent(component) {
        if(!(component.prototype instanceof Component))
            throw new TypeError(`${component.name} is not a subclass of Component`);
        return this._components.find(c => c instanceof component);
    }

    getComponents(component) {
        if(!(component.prototype instanceof Component))
            throw new TypeError(`${component.name} is not a subclass of Component`);
        return this._components.filter(c => c instanceof component);
    }

    get isForDeletion() {
        return this._isForDeletion;
    }

    setForDeletion() {
        this._isForDeletion = true;
    }

    get position() {
        return this._position;
    }

    set position(position) {
        if(typeof position === "object")
            position = Victor.fromObject(position);
        else if(Array.isArray(position))
            position = Victor.fromArray(position);
        else
            throw TypeError("position should either be an array or an object with a x and y property");

        this._position.copy(position);
        return this;
    }

    destroy() {
        this._components.forEach(c => c.destroy());
    }
}
