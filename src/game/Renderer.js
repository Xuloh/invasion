import Color from "color";
import ShaderLibrary from "./ShaderLibrary";
import {mat4} from "gl-matrix";

export default class Renderer {
    constructor(canvasId, options) {
        // get canvas
        if(typeof canvasId !== "string")
            throw new TypeError("canvasId must be a string");
        this.canvas = document.getElementById(canvasId);

        // get webgl context
        if(this.canvas.getContext == null)
            throw new Error("Canvas API not supported on this browser");
        this.gl = this.canvas.getContext("webgl");
        if(this.gl == null)
            throw new Error("Couldn't initialize WebGL. It may not be supported on this browser");

        // handle options
        if(options == null)
            options = {};
        if(typeof options !== "object")
            throw new TypeError("options must be an object");

        const clearColor = Color("#000");
        if(options.clearColor != null)
            options.clearColor = Color(options.clearColor);
        else
            options.clearColor = clearColor;
        this.options = options;

        this.shaderLibrary = new ShaderLibrary(this);

        this.resetProjection();

        // init some webgl stuff
        this.gl.clearColor(
            this.options.clearColor.red() / 255,
            this.options.clearColor.green() / 255,
            this.options.clearColor.blue() / 255,
            this.options.clearColor.alpha()
        );
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
    }

    resetProjection() {
        // create projection matrix
        const fov = 45 * Math.PI / 180; // field of view in radians
        const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;
        this.projectionMatrix = mat4.create();

        mat4.perspective(
            this.projectionMatrix,
            fov,
            aspect,
            zNear,
            zFar
        );
    }

    initBuffers() {
        /* eslint-disable array-element-newline */

        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

        const positions = [
            1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            -1.0, -1.0
        ];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

        const colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);

        const colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0
        ];

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);

        this.buffers = {
            color: colorBuffer,
            position: positionBuffer
        };

        /* eslint-enable array-element-newline */
    }

    render(params) {
        // clear the canvas
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        const buffers = [];

        const shader = this.shaderLibrary.shaderPrograms[params.shader];
        Object.keys(params.attributes).forEach(attribute => {
            const bufferIdx = buffers.push(this.gl.createBuffer()) - 1;
            const data = params.attributes[attribute];
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers[bufferIdx]);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.DYNAMIC_DRAW);
            this.putAttribArray(shader.infos.attribLocations[attribute], buffers[bufferIdx], data.length / params.vertexCount);
        });

        this.gl.useProgram(shader.program);

        Object.keys(params.uniforms).forEach(uniform => {
            const data = params.uniforms[uniform];
            this.putUniformMatrix(shader.infos.uniformLocations[uniform], data);
        });

        // set shader uniforms
        this.putUniformMatrix(shader.infos.uniformLocations.projectionMatrix, this.projectionMatrix);

        const offset = 0;
        this.gl.drawArrays(params.mode, offset, params.vertexCount);

        buffers.forEach(b => this.gl.deleteBuffer(b));
    }

    putAttribArray(location, buffer, numComponents) {
        const type = this.gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        this.gl.vertexAttribPointer(
            location,
            numComponents,
            type,
            normalize,
            stride,
            offset
        );
        this.gl.enableVertexAttribArray(location);
    }

    putUniformMatrix(location, matrix) {
        this.gl.uniformMatrix4fv(
            location,
            false,
            matrix
        );
    }
}
