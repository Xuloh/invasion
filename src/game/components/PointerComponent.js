import Component from "../ecm/Component";
import Victor from "victor";

export default class PointerComponent extends Component {
    constructor(parent, player, distanceToPlayer) {
        super(parent);
        this.player = player;
        this.distanceToPlayer = distanceToPlayer;
    }

    update(dt) {
        super.update(dt);
        const ratio = gameState.pixelToMetersRatio;
        const mousePos = Victor.fromObject(gameState.mouse.position).multiply({x: 1 / ratio, y: 1 / ratio});
        const playerPos = this.player.position;
        const playerToMouse = mousePos.distance(playerPos);
        this._parent.position = {
            x: playerPos.x + (mousePos.x - playerPos.x) * this.distanceToPlayer / playerToMouse,
            y: playerPos.y + (mousePos.y - playerPos.y) * this.distanceToPlayer / playerToMouse
        };
        this._parent.angle = mousePos.subtract(playerPos).angle();
    }
}
