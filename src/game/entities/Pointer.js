import Entity2D from "game/entities/Entity2D";
import PointerComponent from "game/components/PointerComponent";
import TriangleComponent from "game/components/TriangleComponent";

export default class Pointer extends Entity2D {
    constructor(player) {
        super([0.0, 0.0], 0.0, 1.0, "Pointer");
        this.addComponent(PointerComponent, player, 1.5);
        this.addComponent(TriangleComponent, [0.0, 0.0, 0.0, 1.0], 0.3);
    }
}
