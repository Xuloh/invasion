import Component from "game/ecm/Component";
import Transform2DComponent from "game/components/Transform2DComponent";
import {camera} from "game/Renderer";

export default class CameraFollowComponent extends Component {
    constructor(parent) {
        super(parent);
        this.transform2d = this.require(Transform2DComponent);
    }

    update() {
        camera.position = this.transform2d.position;
    }
}
