import {mat4, quat, vec2} from "gl-matrix";
import Component from "game/ecm/Component";

// TODO implement mechanism similar to z-index
export default class Transform2DComponent extends Component {
    constructor(parent, position, rotation, scale) {
        super(parent);

        if(position == null)
            position = vec2.create();
        if(rotation == null)
            rotation = 0.0;
        if(typeof scale === "number")
            scale = [scale, scale];
        if(scale == null)
            scale = vec2.fromValues(1.0, 1.0);

        this._rotation = rotation;
        this._position = position;
        this._scale = scale;

        this._2dTransform = mat4.create();
        this._updateTransform();
        this._modified = false;
    }

    update() {
        if(this._modified) {
            this._updateTransform();
            this._modified = false;
        }
    }

    _updateTransform() {
        const quatRotation = quat.create();
        quat.rotateZ(quatRotation, quatRotation, this._rotation);
        mat4.fromRotationTranslationScale(
            this._2dTransform,
            quatRotation,
            [this._position[0], this._position[1], 0.0],
            [this._scale[0], this._scale[1], 1.0]
        );
    }

    get position() {
        return this._position;
    }

    set position(position) {
        this._position = position;
        this._modified = true;
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(rotation) {
        this._rotation = rotation;
        this._modified = true;
    }

    get scale() {
        return this._scale;
    }

    set scale(scale) {
        this._scale = scale;
        this._modified = true;
    }

    get transform2d() {
        return this._2dTransform;
    }
}
