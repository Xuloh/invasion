/* eslint-disable no-empty-function, no-unused-vars */

export default class Component {
    constructor(parent) {
        this._parent = parent;
        this._isForDeletion = false;
    }

    update(dt) {}

    render() {}

    get isForDeletion() {
        return this._isForDeletion;
    }

    setForDeletion() {
        this._isForDeletion = true;
    }

    destroy() {}

    require(component) {
        const comp = this._parent.getComponent(component);
        if(comp == null)
            throw new Error(`${this.constructor.name} needs a ${component.name}, please add one to its parent entity`);
        return comp;
    }
}
