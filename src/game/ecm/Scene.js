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
        this.entities.forEach((e, idx, arr) => {
            if(e.isForDeletion) {
                e.destroy();
                arr.splice(idx, 1);
            }
            else if(e.alive)
                e.update(dt);
        });
    }
}
