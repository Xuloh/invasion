/* eslint-disable array-element-newline, no-loops/no-loops */
import {mat4, vec3} from "gl-matrix";
import Component from "../ecm/Component";
import Transform2DComponent from "./Transform2DComponent";

export default class PolygonComponent extends Component {
    constructor(parent, edges, radius) {
        super(parent);

        if(edges < 3)
            throw new Error("A polygon needs at least 3 edges");

        if(radius == null)
            radius = 1;

        this.edges = edges;
        this.radius = radius;
        this.transform2d = this.require(Transform2DComponent);

        this.shader = "flatColor";

        this._buildVertices();

        this.color = [0.0, 0.0, 0.0, 1.0];
    }

    render() {
        gameState.renderer.render({
            mode: gameState.renderer.gl.TRIANGLE_FAN,
            vertexCount: 2 + this.edges,
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

    _buildVertices() {
        // first vertices : center and rightmost one
        this.vertices = [0.0, 0.0, this.radius, 0.0];

        // init math stuff
        const transform = mat4.create();
        const point = vec3.fromValues(this.radius, 0.0, 0.0);
        const angle = (Math.PI * 2) / this.edges;

        for(let i = 4; i <= this.edges * 2; i += 2) {
            const pos = vec3.create();
            mat4.rotateZ(transform, transform, angle);
            vec3.transformMat4(pos, point, transform);
            this.vertices.push(pos[0]);
            this.vertices.push(pos[1]);
        }

        // close polygon by repeating the 2 point
        this.vertices.push(this.radius);
        this.vertices.push(0.0);
    }
}
