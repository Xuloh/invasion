/* eslint-disable array-element-newline */
import Component from "../ecm/Component";
import {mat4} from "gl-matrix";

export default class TriangleComponent extends Component {
    constructor(parent) {
        super(parent);
        this.shader = "flatColor";
        this.vertices = [
            -0.5, 0.0,
            0.5, 0.0,
            0.0, 0.87
        ];
        this.colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0
        ];

        //TODO take position from parent entity
        this.modelViewMatrix = mat4.create();
        mat4.translate(
            this.modelViewMatrix,
            this.modelViewMatrix,
            [-0.0, 0.0, -6.0]
        );
    }

    render() {
        gameState.renderer.render({
            mode: gameState.renderer.gl.TRIANGLES,
            vertexCount: 3,
            shader: this.shader,
            attributes: {
                vertexPosition: this.vertices,
                vertexColor: this.colors
            },
            uniforms: {
                modelViewMatrix: this.modelViewMatrix
            }
        });
    }
}
