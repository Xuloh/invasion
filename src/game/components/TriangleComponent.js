/* eslint-disable array-element-newline */
import * as Renderer from "game/Renderer";
import Component from "game/ecm/Component";
import Transform2DComponent from "game/components/Transform2DComponent";
import {createBufferInfoFromArrays} from "util/WebGLUtils";

// map to share geometry buffers between all triangles of the same size
const geometryBuffers = {};

export default class TriangleComponent extends Component {
    constructor(parent, color, radius) {
        super(parent);
        this.transform2d = this.require(Transform2DComponent);
        this.program = "flatColor";
        this.color = color;
        this.radius = radius;

        this._createVerticesAndBuffer();
    }

    render() {
        Renderer.queue({
            mode: Renderer.gl.TRIANGLES,
            program: this.program,
            bufferInfos: this.bufferInfos,
            uniforms: {
                uColor: this.color
            },
            transformMatrix: this.transform2d.transform2d
        });
    }

    _createVerticesAndBuffer() {
        const key = this.radius + "";
        if(Object.prototype.hasOwnProperty.call(geometryBuffers, key)) {
            this.bufferInfos = geometryBuffers[key].bufferInfos;
            this.vertices = geometryBuffers[key].vertices;
        }
        else {
            this.vertices = [];
            for(let i = 1; i <= 3; i++) {
                this.vertices.push(this.radius * Math.cos(2 * i * Math.PI / 3));
                this.vertices.push(this.radius * Math.sin(2 * i * Math.PI / 3));
            }

            this.bufferInfos = createBufferInfoFromArrays(Renderer.gl, {
                vertexPosition: {nbComponents: 2, data: this.vertices}
            });

            geometryBuffers[key] = {
                bufferInfos: this.bufferInfos,
                vertices: this.vertices
            };
        }
    }
}
