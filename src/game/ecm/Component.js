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
}
