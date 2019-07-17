import Victor from "victor";
import Component from "../ecm/Component.js";

export default class PointerComponent extends Component {
    constructor(parent, player, distanceToPlayer) {
        super(parent);
        this.player = player;
        this.distanceToPlayer = distanceToPlayer;
    }

    update(dt) {
        super.update(dt);
        const mousePos = Victor.fromObject(gameState.mouse.position);
        const playerPos = this.player.position;
        const playerToMouse = mousePos.distance(playerPos);
        this.parent.setPosition({
            x: playerPos.x + (mousePos.x - playerPos.x) * this.distanceToPlayer / playerToMouse,
            y: playerPos.y + (mousePos.y - playerPos.y) * this.distanceToPlayer / playerToMouse
        });
    }
}
