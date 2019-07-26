import * as SceneManager from "game/SceneManager";
import Component from "game/ecm/Component";
import Entity2D from "game/entities/Entity2D";

export default class EntitySpawnerComponent extends Component {
    constructor(parent, entity, interval, position, args) {
        super(parent);
        if(!(entity.prototype instanceof Entity2D))
            throw new TypeError(`${entity.name} is not a subclass of Entity`);
        this.entity = entity;

        setTimeout(() => {
            let pos;
            if(!Object.prototype.hasOwnProperty.call(position, "width") || !Object.prototype.hasOwnProperty.call(position, "height"))
                pos = [position.x, position.y];
            else {
                pos = [
                    Math.floor(Math.random() * (position.width)) + position.x,
                    Math.floor(Math.random() * (position.height)) + position.y
                ];
            }
            SceneManager.message({
                type: "spawn",
                args: {
                    entity: this.entity,
                    options: [pos, ...args]
                }
            });
        }, interval);
    }
}
