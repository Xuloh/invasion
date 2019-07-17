export default class Scene {
    constructor() {
        this.entities = [];
    }

    // eslint-disable-next-line no-empty-function
    load() {}

    unload() {
        this.entities = [];
    }

    update(dt) {
        this.entities.forEach(e => e.update(dt));
    }
}
