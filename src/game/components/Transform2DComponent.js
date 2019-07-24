import {mat4, quat, vec2} from "gl-matrix";
import Component from "../ecm/Component";

export default class Transform2DComponent extends Component {
    constructor(parent, position, rotation, scale) {
        super(parent);

        if(position == null)
            position = vec2.create();
        if(rotation == null)
            rotation = 0.0;
        if(scale == null)
            scale = vec2.fromValues(1.0, 1.0);

        this._rotation = rotation;
        this._position = position;
        this._scale = scale;

        this._2dTransform = mat4.create();
        const quatRotation = quat.create();
        quat.rotateZ(quatRotation, quatRotation, this._rotation);
        mat4.fromRotationTranslationScale(
            this._2dTransform,
            quatRotation,
            [...this._position, 0.0],
            [...this._scale, 1.0]
        );
    }

    get position() {
        return this._position;
    }

    set position(position) {
        this._position = position;
        mat4.translate(this._2dTransform, this._2dTransform, [...this._position, 0.0]);
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(rotation) {
        this._rotation = rotation;
        mat4.rotateZ(this._2dTransform, this._2dTransform, this._rotation);
    }

    get scale() {
        return this._scale;
    }

    set scale(scale) {
        this._scale = scale;
        mat4.scale(this._2dTransform, this._2dTransform, [...this._scale, 1.0]);
    }

    get transform2d() {
        return this._2dTransform;
    }
}