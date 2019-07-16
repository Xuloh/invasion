import Victor from "victor";
import Entity from "./ecm/Entity.js";

export default class Pointer extends Entity {
    constructor(position, player, distanceToPlayer) {
        super(position, {width: 10, height: 10});
        this.player = player;
        this.distanceToPlayer = distanceToPlayer;
        this.$container.addClass("pointer");
    }

    update(dt) {
        super.update(dt);
        const mousePos = Victor.fromObject(gameState.mouse.position);
        const playerPos = this.player.position;
        const playerToMouse = mousePos.distance(playerPos);
        this.setPosition({
            x: playerPos.x + (mousePos.x - playerPos.x) * this.distanceToPlayer / playerToMouse,
            y: playerPos.y + (mousePos.y - playerPos.y) * this.distanceToPlayer / playerToMouse
        });
    }
}
