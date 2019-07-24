import Entity from "../ecm/Entity";
import Transform2DComponent from "../components/Transform2DComponent";

export default class Entity2D extends Entity {
    constructor(position, rotation, scale, label) {
        super(label);
        this.addComponent(Transform2DComponent, position, rotation, scale);
    }
}
