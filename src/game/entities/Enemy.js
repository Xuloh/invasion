import EnemyComponent from "game/components/EnemyComponent";
import Entity2D from "game/entities/Entity2D";
import PhysicsComponent from "game/components/PhysicsComponent";
import PolygonComponent from "game/components/PolygonComponent";

export default class Enemy extends Entity2D {
    constructor(position, player) {
        super(position, 0.0, 1.0, "Enemy");
        this.addComponent(PhysicsComponent, 1, "enemy");
        this.addComponent(EnemyComponent, player, 0.7, 2.5);
        this.addComponent(PolygonComponent, 30, [0.65, 0.4, 0.35, 1.0], 1);
    }
}
