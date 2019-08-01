import Component from "game/ecm/Component";

export default class Entity {
    constructor(label) {
        if(label == null || typeof label !== "string")
            label = "Entity";

        this.label = label;
        this._components = [];

        this.alive = true;
        this.visible = true;
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

    render() {
        this._components.forEach(c => c.render());
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

    destroy() {
        this._components.forEach(c => c.destroy());
    }
}
