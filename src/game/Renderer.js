import Color from "color";
import fs from "../shaders/square.fs.glsl";
import vs from "../shaders/square.vs.glsl";

export default class Renderer {
    constructor(canvasId, options) {
        if(typeof canvasId !== "string")
            throw new TypeError("canvasId must be a string");

        if(options == null)
            options = {};

        if(typeof options !== "object")
            throw new TypeError("options must be an object");

        this.canvas = $("#" + canvasId)[0];

        if(this.canvas.getContext == null)
            throw new Error("Canvas API not supported on this browser");

        this.gl = this.canvas.getContext("webgl");

        if(this.gl == null)
            throw new Error("Couldn't initialize WebGL. It may not be supported on this browser");

        let clearColor = Color("#000");
        if(options.clearColor != null)
            clearColor = Color(options.clearColor);

        this.gl.clearColor(clearColor.red() / 255, clearColor.green() / 255, clearColor.blue() / 255, clearColor.alpha());
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.initShaderProgram();
        this.initProgramInfo();
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
}
