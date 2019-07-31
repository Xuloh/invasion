import Component from "game/ecm/Component";
import Entity2D from "game/entities/Entity2D";
import Transform2DComponent from "game/components/Transform2DComponent";
import {getMousePosition} from "events/ControlsManager";
import {mapScreenToWorldCoordinates} from "game/Renderer";
import {vec2} from "gl-matrix";

export default class PointerComponent extends Component {
    constructor(parent, player, distanceToPlayer) {
        super(parent);
        if(!(player instanceof Entity2D))
            throw new TypeError("Given player must be an instance of Entity2D");
        this.transform2d = this.require(Transform2DComponent);
        this.player = player.getComponent(Transform2DComponent);
        this.distanceToPlayer = distanceToPlayer;
    }

    update(dt) {
        super.update(dt);
        const mousePos = mapScreenToWorldCoordinates([getMousePosition().x, getMousePosition().y]);
        const playerPos = this.player.position;
        const playerToMouse = vec2.distance(mousePos, playerPos);
        this.transform2d.position = [
            playerPos[0] + (mousePos[0] - playerPos[0]) * this.distanceToPlayer / playerToMouse,
            playerPos[1] + (mousePos[1] - playerPos[1]) * this.distanceToPlayer / playerToMouse
        ];
        vec2.subtract(mousePos, mousePos, playerPos);
        this.transform2d.rotation = vec2.angle(mousePos, [1, 0]);
    }
}
