/* eslint-disable camelcase */
import * as flatColor from "shaders/flatColor";
import {upperCaseFirst} from "util/Util.js";

export default class ShaderManager {
    constructor(webGLContext) {
        this.shaders = {
            flatColor: flatColor
        };
        this.gl = webGLContext;
        this.shaderPrograms = {};
        this.initLibrary();
    }

    initLibrary() {
        Object.keys(this.shaders).forEach(shaderName => {
            this.loadProgram(shaderName);
            this.loadInfos(shaderName);
        });
    }

    loadShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        // if shader compilation fails
        if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(`An error occured compiling shader : ${this.gl.getShaderInfoLog(shader)}`);
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    loadProgram(shaderName) {
        const vs = this.loadShader(this.gl.VERTEX_SHADER, this.shaders[shaderName].vs);
        const fs = this.loadShader(this.gl.FRAGMENT_SHADER, this.shaders[shaderName].fs);

        let shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vs);
        this.gl.attachShader(shaderProgram, fs);
        this.gl.linkProgram(shaderProgram);

        // if shader program link fails
        if(!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            console.error(`Unable to initialize shader program '${shaderName}' : ${this.gl.getProgramInfoLog(shaderProgram)}`);
            shaderProgram = null;
        }

        this.shaderPrograms[shaderName] = {
            program: shaderProgram,
            infos: {}
        };
    }

    loadInfos(shaderName) {
        const infos = this.shaders[shaderName].infos;
        const shaderProgram = this.shaderPrograms[shaderName].program;
        const programInfos = this.shaderPrograms[shaderName].infos;

        if(Object.prototype.hasOwnProperty.call(infos, "attributes")) {
            programInfos.attribLocations = {};
            infos.attributes.forEach(attribute => {
                programInfos.attribLocations[attribute] = this.gl.getAttribLocation(shaderProgram, `a${upperCaseFirst(attribute)}`);
            });
        }

        if(Object.prototype.hasOwnProperty.call(infos, "uniforms")) {
            programInfos.uniformLocations = {};
            infos.uniforms.forEach(uniform => {
                programInfos.uniformLocations[uniform] = this.gl.getUniformLocation(shaderProgram, `u${upperCaseFirst(uniform)}`);
            });
        }
    }
}
