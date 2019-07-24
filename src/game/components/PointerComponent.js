import Component from "../ecm/Component";
import Transform2DComponent from "./Transform2DComponent";
import Victor from "victor";
import {getMousePosition} from "../../events/ControlsManager";

export default class PointerComponent extends Component {
    constructor(parent, player, distanceToPlayer) {
        super(parent);
        this.transform2d = this.require(Transform2DComponent);
        this.player = player;
        this.distanceToPlayer = distanceToPlayer;
    }

    update(dt) {
        super.update(dt);
        const ratio = gameState.pixelToMetersRatio;
        const mousePos = Victor.fromObject(getMousePosition).multiply({x: 1 / ratio, y: 1 / ratio});
        const playerPos = this.player.position;
        const playerToMouse = mousePos.distance(playerPos);
        this.transform2d.position = {
            x: playerPos.x + (mousePos.x - playerPos.x) * this.distanceToPlayer / playerToMouse,
            y: playerPos.y + (mousePos.y - playerPos.y) * this.distanceToPlayer / playerToMouse
        };
        this.transform2d.angle = mousePos.subtract(playerPos).angle();
    }
}
