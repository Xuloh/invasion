import Entity2D from "game/entities/Entity2D";
import PointerComponent from "game/components/PointerComponent";
import PolygonComponent from "game/components/PolygonComponent";

export default class Pointer extends Entity2D {
    constructor(player) {
        super([0.0, 0.0], 0.0, 1.0, "Pointer");
        this.addComponent(PointerComponent, player, 1.5);
        this.addComponent(PolygonComponent, 10, null, 0.1);
    }
}
