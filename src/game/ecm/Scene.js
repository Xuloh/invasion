export default class Scene {
    constructor() {
        this.entities = [];
    }

    load() {}

    unload() {
        this.entities = [];
    }

    update(dt) {
        this.entities.forEach(e => e.update(dt));
    }
}
