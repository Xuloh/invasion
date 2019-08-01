import EnemySpawner from "game/entities/EnemySpawner";
import Player from "game/entities/Player";
import Pointer from "game/entities/Pointer";
import Scene from "game/ecm/Scene";

export default class MainScene extends Scene {
    load() {
        const player = new Player([0, 0]);
        this.entities.push(player);
        this.entities.push(new EnemySpawner(player));
        this.entities.push(new Pointer(player));
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
