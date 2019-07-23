/* eslint-disable camelcase */
import * as flatColor from "../shaders/flatColor";
import {upperCaseFirst} from "../util/Util.js";

export default class ShaderLibrary {
    constructor(renderer) {
        this.shaders = {
            flatColor: flatColor
        };
        this.renderer = renderer;
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
        const shader = this.renderer.gl.createShader(type);
        this.renderer.gl.shaderSource(shader, source);
        this.renderer.gl.compileShader(shader);

        // if shader compilation fails
        if(!this.renderer.gl.getShaderParameter(shader, this.renderer.gl.COMPILE_STATUS)) {
            console.error(`An error occured compiling shader : ${this.renderer.gl.getShaderInfoLog(shader)}`);
            this.renderer.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    loadProgram(shaderName) {
        const vs = this.loadShader(this.renderer.gl.VERTEX_SHADER, this.shaders[shaderName].vs);
        const fs = this.loadShader(this.renderer.gl.FRAGMENT_SHADER, this.shaders[shaderName].fs);

        let shaderProgram = this.renderer.gl.createProgram();
        this.renderer.gl.attachShader(shaderProgram, vs);
        this.renderer.gl.attachShader(shaderProgram, fs);
        this.renderer.gl.linkProgram(shaderProgram);

        // if shader program link fails
        if(!this.renderer.gl.getProgramParameter(shaderProgram, this.renderer.gl.LINK_STATUS)) {
            console.error(`Unable to initialize shader program '${shaderName}' : ${this.renderer.gl.getProgramInfoLog(shaderProgram)}`);
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
                programInfos.attribLocations[attribute] = this.renderer.gl.getAttribLocation(shaderProgram, `a${upperCaseFirst(attribute)}`);
            });
        }

        if(Object.prototype.hasOwnProperty.call(infos, "uniforms")) {
            programInfos.uniformLocations = {};
            infos.uniforms.forEach(uniform => {
                programInfos.uniformLocations[uniform] = this.renderer.gl.getUniformLocation(shaderProgram, `u${upperCaseFirst(uniform)}`);
            });
        }
    }
}
