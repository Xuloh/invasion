import * as Settings from "settings";
import CameraFollowComponent from "game/components/CameraFollowComponent";
import Entity2D from "game/entities/Entity2D";
import HealthComponent from "game/components/HealthComponent";
import PhysicsComponent from "game/components/PhysicsComponent";
import PlayerComponent from "game/components/PlayerComponent";
import PolygonComponent from "game/components/PolygonComponent";

export default class Player extends Entity2D {
    constructor(position) {
        super(position, 0.0, 1.0, "Player");
        this.addComponent(PhysicsComponent, 1, "player");
        this.addComponent(PolygonComponent, 30, [0.4, 0.6, 0.4, 1.0], 1);
        this.addComponent(HealthComponent, 3, Settings.get("displayPlayerHP"));
        this.addComponent(PlayerComponent, 1, 3);
        this.addComponent(CameraFollowComponent);
    }
}
