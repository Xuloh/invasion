import Color from "color";
import fs from "../shaders/square.fs.glsl";
import {mat4} from "gl-matrix";
import vs from "../shaders/square.vs.glsl";

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
        this.gl.clearColor(
            this.options.clearColor.red() / 255,
            this.options.clearColor.green() / 255,
            this.options.clearColor.blue() / 255,
            this.options.clearColor.alpha()
        );
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.initShaderProgram();
        this.initProgramInfo();
        this.initBuffers();
        this.render();
    }

    loadShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        // if shader compilation fails
        if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error("An error occured compiling the shader : " + this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    initShaderProgram() {
        console.log(vs);
        console.log(fs);
        const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vs);
        const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fs);

        let shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);

        // if shader program link fails
        if(!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            console.error("Unable to initialize shader program " + this.gl.getProgramInfoLog(shaderProgram));
            shaderProgram = null;
        }

        this.shaderProgram = shaderProgram;
    }

    initProgramInfo() {
        this.programInfo = {
            attribLocations: {
                vertexPosition: this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition")
            },
            uniformLocations: {
                projectionMatrix: this.gl.getUniformLocation(this.shaderProgram, "uProjectionMatrix"),
                modelViewMatrix: this.gl.getUniformLocation(this.shaderProgram, "uModelViewMatrix")
            }
        };
    }

    initBuffers() {
        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

        /* eslint-disable array-element-newline */
        const positions = [
            -1.0, 1.0,
            1.0, 1.0,
            -1.0, -1.0,
            1.0, -1.0
        ];
        /* eslint-enable array-element-newline */

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

        this.buffers = {
            position: positionBuffer
        };
    }

    render() {
        // clear the canvas
        this.gl.clearColor(
            this.options.clearColor.red() / 255,
            this.options.clearColor.green() / 255,
            this.options.clearColor.blue() / 255,
            this.options.clearColor.alpha()
        );
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // create perspective matrix
        const fov = 45 * Math.PI / 180; // field of view in radians
        const aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();

        mat4.perspective(
            projectionMatrix,
            fov,
            aspect,
            zNear,
            zFar
        );

        // set the position of the object
        const modelViewMatrix = mat4.create();

        mat4.translate(
            modelViewMatrix,
            modelViewMatrix,
            [-0.0, 0.0, -6.0]
        );

        this.gl.useProgram(this.shaderProgram);

        // put positions from buffer to vertexPosition attribute
        {
            const numComponents = 2;
            const type = this.gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
            this.gl.vertexAttribPointer(
                this.programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset
            );
            this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
        }

        // set shader uniforms
        this.gl.uniformMatrix4fv(
            this.programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix
        );
        this.gl.uniformMatrix4fv(
            this.programInfo.uniformLocations.projectionMatrix,
            false,
            modelViewMatrix
        );

        {
            const offset = 0;
            const vertexCount = 4;
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
        }
    }
}
