import Entity2D from "./Entity2D";
import PhysicsComponent from "../components/PhysicsComponent";
import PlayerComponent from "../components/PlayerComponent";
import PolygonComponent from "../components/PolygonComponent";

export default class Player extends Entity2D {
    constructor(position) {
        super(position, 0.0, 1.0, "Player");
        this.addComponent(PhysicsComponent, 1, {
            label: "Player"
        });
        this.addComponent(PlayerComponent, 1, {x: 3, y: 3});
        this.addComponent(PolygonComponent, 20, [0.4, 0.6, 0.4, 1.0], 1);
    }
}
