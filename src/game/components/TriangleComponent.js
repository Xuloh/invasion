/* eslint-disable array-element-newline */
import * as Renderer from "game/Renderer";
import Component from "game/ecm/Component";
import Transform2DComponent from "game/components/Transform2DComponent";

export default class TriangleComponent extends Component {
    constructor(parent) {
        super(parent);
        this.transform2d = this.require(Transform2DComponent);
        this.shader = "flatColor";
        this.vertices = [
            -0.5, 0.87,
            0.0, 0.0,
            0.5, 0.87
        ];
        this.color = [0.0, 0.0, 0.0, 1.0];
    }

    render() {
        Renderer.render({
            mode: Renderer.gl.TRIANGLES,
            vertexCount: 3,
            shader: this.shader,
            attributes: {
                vertexPosition: this.vertices
            },
            uniforms: {
                modelViewMatrix: {
                    type: "mat4",
                    value: this.transform2d.transform2d
                },
                color: {
                    type: "vec4",
                    value: this.color
                }
            }
        });
    }
}
