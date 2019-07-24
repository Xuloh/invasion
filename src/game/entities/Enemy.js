import Entity2D from "./Entity2D";
import PhysicsComponent from "../components/PhysicsComponent";
import EnemyComponent from "../components/PlayerComponent";
import PolygonComponent from "../components/PolygonComponent";

export default class Enemy extends Entity2D {
    constructor(position, player) {
        super(position, 0.0, 1.0, "Enemy");
        this.addComponent(PhysicsComponent, 1, {
            label: "Enemy"
        });
        this.addComponent(EnemyComponentd, 0.7, {x: 2.5, y: 2.5});
        this.addComponent(PolygonComponent, 20, [0.4, 0.6, 0.4, 1.0], 1);
    }
}
