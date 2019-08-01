import Entity from "game/ecm/Entity";
import Transform2DComponent from "game/components/Transform2DComponent";

export default class Entity2D extends Entity {
    constructor(position, rotation, scale, label) {
        super(label);
        this.addComponent(Transform2DComponent, position, rotation, scale);
    }
}
