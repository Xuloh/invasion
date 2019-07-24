import Component from "../ecm/Component";
import {mat3, vec2} from "gl-matrix";

export default class Transform2DComponent extends Component {
    constructor(parent, position, rotation, scale) {
        super(parent);

        if(position == null)
            position = vec2.create();
        if(rotation == null);
            rotation = 0.0;
        if(scale == null)
            scale = 1.0;

        this._2dTransform = mat3.create();

        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }

    get position() {
        return this._position;
    }

    set position(position) {
        this._position = position;
        mat3.translate(this._2dTransform, this._2dTransform, this._position);
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(rotation) {
        this._rotation = rotation;
        mat3.rotate(this._2dTransform, this._2dTransform, this._rotation);
    }

    get scale() {
        return this._scale;
    }

    set scale(scale) {
        this._scale = scale;
        mat3.scale(this._2dTransform, this._2dTransform, this._scale);
    }
}
