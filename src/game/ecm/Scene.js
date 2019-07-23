/* eslint-disable no-empty-function, no-unused-vars */

export default class Scene {
    constructor() {
        this.entities = [];
    }

    load() {}

    unload() {
        this.entities = [];
    }

    update(dt) {
        this.entities.forEach((e, idx, arr) => {
            if(e.isForDeletion) {
                e.destroy();
                arr.splice(idx, 1);
            }
            else if(e.alive)
                e.update(dt);
        });
    }

    render() {
        this.entities.forEach(e => {
            if(e.visible)
                e.render();
        });
    }

    handle(message) {}
}
