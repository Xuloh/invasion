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

        this._handleOptions();

        this.shaderLibrary = new ShaderLibrary(this);

        this.createProjection();

        // init some webgl stuff
        this.gl.clearColor(...options.clearColor);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
    }

    _handleOptions(options) {
        if(options != null && typeof options !== "object")
            throw new TypeError("options must be an object or null or undefined");
        if(options == null)
            options = {};

        if(options.clearColor != null) {
            const clearColor = Color(options.clearColor);
            options.clearColor = [
                clearColor.red() / 255,
                clearColor.green() / 255,
                clearColor.blue() / 255,
                clearColor.alpha()
            ];
        }

        this.options = {
            clearColor: [0.0, 0.0, 0.0, 1.0],
            ratio: 50,
            ...options
        };
    }

    createProjection() {
        // create projection matrix
        const ratio = this.options.ratio;
        const width = this.canvas.clientWidth * 1 / ratio;
        const height = this.canvas.clientHeight * 1 / ratio;

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

    resize() {
        this.gl.viewport(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
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

    render(params) {
        //TODO implement a render queue instead of rendering everything on the spot
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
}
