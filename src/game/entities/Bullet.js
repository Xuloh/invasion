import BulletComponent from "../components/BulletComponent";
import Entity2D from "./Entity2D";
import PhysicsComponent from "../components/PhysicsComponent";
import PolygonComponent from "../components/PolygonComponent";

export default class Bullet extends Entity2D {
    constructor(position, direction) {
        super(position, 0.0, 1.0, "Bullet");
        this.addComponent(PhysicsComponent, 0.2, {
            label: "Bullet"
        });
        this.addComponent(PolygonComponent, 10, null, 0.2);
        this.addComponent(BulletComponent, direction, 2);
    }
}
