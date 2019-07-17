export default class Component {
    constructor(parent) {
        this._parent = parent;
        this._isForDeletion = false;
    }

    // eslint-disable-next-line no-empty-function, no-unused-vars
    update(dt) {}

    setForDeletion() {
        this._isForDeletion = true;
    }
}
