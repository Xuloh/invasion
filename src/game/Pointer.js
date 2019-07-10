import Victor from "victor";
import Entity from "./Entity.js";

export default class Pointer extends Entity {
    constructor(container, position, player, distanceToPlayer) {
        super(container, position);
        this.player = player;
        this.distanceToPlayer = distanceToPlayer;
    }

    update(dt) {
        super.update(dt);
        let mousePos = Victor.fromObject(gameState.mouse.position);
        let playerPos = this.player.position;
        let playerToMouse = mousePos.distance(playerPos);
        this.setPosition({
            x: playerPos.x + (mousePos.x - playerPos.x) * this.distanceToPlayer / playerToMouse,
            y: playerPos.y + (mousePos.y - playerPos.y) * this.distanceToPlayer / playerToMouse
        });
    }
}
