import * as SceneManager from "game/SceneManager";
import Component from "game/ecm/Component";
import Entity2D from "game/entities/Entity2D";
import Timeout from "util/Timeout";

export default class EntitySpawnerComponent extends Component {
    constructor(parent, entity, interval, position, args) {
        super(parent);
        if(!(entity.prototype instanceof Entity2D))
            throw new TypeError(`${entity.name} is not a subclass of Entity`);
        this.entity = entity;
        this.spawnPosition = position;
        this.entity = entity;
        this.spawnArgs = args;
        this.timeout = new Timeout(interval);
    }

    update(dt) {
        super.update(dt);
        if(this.timeout.update(dt, true))
            this.spawn();
    }

    spawn() {
        let pos;
        if(!Object.prototype.hasOwnProperty.call(this.spawnPosition, "width") || !Object.prototype.hasOwnProperty.call(this.spawnPosition, "height"))
            pos = [this.spawnPosition.x, this.spawnPosition.y];
        else {
            pos = [
                Math.floor(Math.random() * (this.spawnPosition.width)) + this.spawnPosition.x,
                Math.floor(Math.random() * (this.spawnPosition.height)) + this.spawnPosition.y
            ];
        }
        SceneManager.message({
            type: "spawn",
            args: {
                entity: this.entity,
                options: [pos, ...this.spawnArgs]
            }
        });
    }
}
