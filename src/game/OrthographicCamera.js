import {mat4} from "gl-matrix";

export default class OrthographicCamera {
    constructor(width, height, pixelRatio) {
        this.createProjectionMatrix(width, height, pixelRatio);
        this.createViewMatrix();
        this.createViewProjectionMatrix();
    }

    createProjectionMatrix(width, height, pixelRatio) {
        // create projection matrix
        width = width * 1 / pixelRatio;
        height = height * 1 / pixelRatio;

        this.projectionMatrix = mat4.create();

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

    createViewMatrix() {
        this.cameraMatrix = mat4.create();
        mat4.identity(this.cameraMatrix);

        this.viewMatrix = mat4.create();
        mat4.invert(this.viewMatrix, this.cameraMatrix);
    }

    createViewProjectionMatrix() {
        this.viewProjectionMatrix = mat4.create();
        mat4.multiply(this.viewProjectionMatrix, this.projectionMatrix, this.viewMatrix);
        this.invViewProjectionMatrix = mat4.create();
        mat4.invert(this.invViewProjectionMatrix, this.viewProjectionMatrix);
    }
}
