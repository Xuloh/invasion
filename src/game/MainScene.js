import EnemySpawner from "game/entities/EnemySpawner";
import Player from "game/entities/Player";
import Pointer from "game/entities/Pointer";
import Scene from "game/ecm/Scene";

export default class MainScene extends Scene {
    load() {
        // const player = this.entityFactory.makePlayer();
        const player = new Player([0, 0]);
        this.entities.push(player);
        this.entities.push(new EnemySpawner(player));
        this.entities.push(new Pointer(player));
        //this.entities.push(this.entityFactory.makeTest());
        // this.entities.push(player);
        // this.entities.push(this.entityFactory.makePointer(player));
        // this.entities.push(this.entityFactory.makeEnemy([100 * 1 / ratio, 100 * 1 / ratio], player));
        // this.entities.push(this.entityFactory.makeEnemy([100 * 1 / ratio, (window.innerHeight - 100) * 1 / ratio], player));
        // this.entities.push(this.entityFactory.makeEnemy([(window.innerWidth - 100) * 1 / ratio, (window.innerHeight / 2) * 1 / ratio], player));
    }

    handle(message) {
        switch(message.type) {
            case "spawn": {
                const entity = new message.args.entity(...message.args.options);
                this.entities.push(entity);
                break;
            }
            default:
                break;
        }
    }
}
