/* eslint-disable camelcase */
import * as flatColor from "shaders/flatColor";
import * as grid from "shaders/grid";
import {createProgram} from "util/WebGLUtils";

export default class ShaderManager {
    constructor(webGLContext) {
        this.shaders = {
            flatColor: flatColor,
            grid: grid
        };
        this.gl = webGLContext;
        this.programs = {};
        this.init();
    }

    init() {
        console.groupCollapsed("shader init");
        Object.keys(this.shaders).forEach(shaderName => {
            this.programs[shaderName] = createProgram(
                this.gl,
                this.shaders[shaderName].vs,
                this.shaders[shaderName].fs
            );
        });
        console.groupEnd("shader init");
    }
}
