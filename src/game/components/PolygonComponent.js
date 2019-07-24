/* eslint-disable array-element-newline, no-loops/no-loops */
import Component from "../ecm/Component";
import Transform2DComponent from "./Transform2DComponent";

export default class PolygonComponent extends Component {
    constructor(parent, edges, color, radius) {
        super(parent);

        if(edges < 3)
            throw new Error("A polygon needs at least 3 edges");

        if(radius == null)
            radius = 1;

        if(!Array.isArray(color) || color.length < 4)
            color = [0.0, 0.0, 0.0, 1.0];

        this.edges = edges;
        this.radius = radius;
        this.transform2d = this.require(Transform2DComponent);

        this.shader = "flatColor";

        this._buildVertices();

        this.color = color;
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

    /* j'ai fait ça tout seul sans félix donc je le garde en commentaire
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
    */

    _buildVertices() {
        this.vertices = [0.0, 0.0];
        for(let i = 1; i <= this.edges; i++) {
            this.vertices.push(this.radius * Math.cos(2 * i * Math.PI / this.edges));
            this.vertices.push(this.radius * Math.sin(2 * i * Math.PI / this.edges));
        }
        this.vertices.push(this.vertices[2]);
        this.vertices.push(this.vertices[3]);
    }
}
