import {mat4} from "gl-matrix";

export default class OrthographicCamera {
    constructor(width, height, pixelRatio) {
        this.cameraMatrix = mat4.create();
        mat4.identity(this.cameraMatrix);

        this.viewMatrix = mat4.create();
        this.projectionMatrix = mat4.create();
        this.viewProjectionMatrix = mat4.create();
        this.invViewProjectionMatrix = mat4.create();

        this.updateProjectionMatrix(width, height, pixelRatio);
        this.updateViewMatrix();
        this.updateViewProjectionMatrix();
    }

    updateProjectionMatrix(width, height, pixelRatio) {
        // create projection matrix
        width = width * 1 / pixelRatio;
        height = height * 1 / pixelRatio;

        mat4.ortho(
            this.projectionMatrix,
            -width / 2,
            width / 2,
            -height / 2,
            height / 2,
            0.0,
            100.0
        );
    }

    updateViewMatrix() {
        mat4.invert(this.viewMatrix, this.cameraMatrix);
    }

    updateViewProjectionMatrix() {
        mat4.multiply(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
        mat4.invert(this.invViewProjectionMatrix, this.viewProjectionMatrix);
    }

    set position(position) {
        this.cameraMatrix[12] = position[0];
        this.cameraMatrix[13] = position[1];
        this.updateViewMatrix();
        this.updateViewProjectionMatrix();
    }

    get position() {
        return [this.cameraMatrix[12], this.cameraMatrix[13]];
    }
}
