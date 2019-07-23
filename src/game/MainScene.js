import EntityFactory from "./EntityFactory";
import Scene from "./ecm/Scene";

export default class MainScene extends Scene {
    constructor() {
        super();
        this.entityFactory = new EntityFactory();
    }

    load() {
        // const player = this.entityFactory.makePlayer();
        // const ratio = gameState.pixelToMetersRatio;
        this.entities.push(this.entityFactory.makeTest());
        // this.entities.push(player);
        // this.entities.push(this.entityFactory.makePointer(player));
        // this.entities.push(this.entityFactory.makeEnemy([100 * 1 / ratio, 100 * 1 / ratio], player));
        // this.entities.push(this.entityFactory.makeEnemy([100 * 1 / ratio, (window.innerHeight - 100) * 1 / ratio], player));
        // this.entities.push(this.entityFactory.makeEnemy([(window.innerWidth - 100) * 1 / ratio, (window.innerHeight / 2) * 1 / ratio], player));
    }

    handle(message) {
        switch(message.type) {
            case "spawn":
                this.entities.push(new message.args.entity(...message.args.options));
                break;
            default:
                break;
        }
    }
}
