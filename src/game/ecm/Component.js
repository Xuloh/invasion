export default class Component {
    constructor(parent) {
        this._parent = parent;
        this._isForDeletion = false;
    }

    // eslint-disable-next-line no-empty-function, no-unused-vars
    update(dt) {}

    get isForDeletion() {
        return this._isForDeletion;
    }

    setForDeletion() {
        this._isForDeletion = true;
    }

    // eslint-disable-next-line no-empty-function
    destroy() {}
}
