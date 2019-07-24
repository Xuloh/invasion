/* eslint-disable array-element-newline */
import Component from "../ecm/Component";
import Transform2DComponent from "./Transform2DComponent";

export default class TriangleComponent extends Component {
    constructor(parent) {
        super(parent);
        this.transform2d = this.require(Transform2DComponent);
        this.shader = "flatColor";
        this.vertices = [
            -0.5, 0.87,
            0.5, 0.87,
            0.0, 0.0
        ];
        this.colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0
        ];
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
                modelViewMatrix: this.transform2d.transform2d
            }
        });
    }
}
