/* eslint-disable array-element-newline */
import * as Renderer from "game/Renderer";
import Component from "game/ecm/Component";
import Transform2DComponent from "game/components/Transform2DComponent";
import {createBufferInfoFromArrays} from "util/WebGLUtils";

// map to share geometry buffers between rectangles of the same size
const geometryBuffers = {};

export default class RectangleComponent extends Component {
    constructor(parent, width, height, color) {
        super(parent);

        this.transform2d = this.require(Transform2DComponent);

        this.width = width;
        this.height = height;
        this.program = "flatColor";
        this.color = color;

        this._createVerticesAndBuffer();
    }

    render() {
        Renderer.queue({
            mode: Renderer.gl.TRIANGLE_STRIP,
            program: this.program,
            bufferInfos: this.bufferInfos,
            uniforms: {
                uColor: this.color
            },
            transformMatrix: this.transform2d.transform2d
        });
    }

    _createVerticesAndBuffer() {
        const key = this.width + "," + this.height;
        if(Object.prototype.hasOwnProperty.call(geometryBuffers, key)) {
            this.bufferInfos = geometryBuffers[key].bufferInfos;
            this.vertices = geometryBuffers[key].vertices;
        }
        else {
            this.vertices = [
                this.width / 2, this.height / 2,
                -this.width / 2, this.height / 2,
                this.width / 2, -this.height / 2,
                -this.width / 2, -this.height / 2
            ];

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
