import * as Settings from "settings";
import {createBufferInfoFromArrays, setAttributes, setUniforms} from "util/WebGLUtils";
import {mat4, vec2, vec3} from "gl-matrix";
import Color from "color";
import OrthographicCamera from "game/OrthographicCamera";
import ShaderManager from "game/ShaderManager";
import WebGLDebugUtils from "util/webgl-debug";

let canvas = null;
let gl = null;
let shaderManager = null;
let options = null;
let renderQueue = [];
let camera = null;

const pixelRatio = 50;

let bgBufferInfos = null;

function init(canvasId, opts) {
    // get canvas
    if(typeof canvasId !== "string")
        throw new TypeError("canvasId must be a string");
    canvas = document.getElementById(canvasId);

    // get webgl context
    if(canvas.getContext == null)
        throw new Error("Canvas API not supported on this browser");

    gl = canvas.getContext("webgl2");
    console.info(
        `webgl debug is %c${opts.debug ? "on" : "off"}`,
        `font-weight: bold; text-decoration: underline; color: ${opts.debug ? "#009432" : "#EA2027"}`
    );
    if(opts.debug) {
        gl = WebGLDebugUtils.makeDebugContext(gl, undefined, (functionName, args) => {
            console.log("gl." + functionName + "(" + WebGLDebugUtils.glFunctionArgsToString(functionName, args) + ")");
        });
    }

    if(gl == null)
        throw new Error("Couldn't initialize WebGL. It may not be supported on this browser");

    handleOptions(opts);

    shaderManager = new ShaderManager(gl);

    camera = new OrthographicCamera(canvas.clientWidth, canvas.clientHeight, pixelRatio);
    createBackground();

    // init some webgl stuff
    if(opts.debug) console.groupCollapsed("webgl init"); // eslint-disable-line
    gl.clearColor(...options.clearColor);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    if(opts.debug) console.groupEnd("webgl init"); // eslint-disable-line
}

/* eslint-disable array-element-newline */
function createBackground() {
    bgBufferInfos = createBufferInfoFromArrays(gl, {
        position: {
            nbComponents: 2,
            data: [
                -1.0, 1.0,
                1.0, 1.0,
                1.0, -1.0,
                -1.0, 1.0,
                1.0, -1.0,
                -1.0, -1.0
            ]
        }
    });
}
/* eslint-enable array-element-newline */

function handleOptions(opts) {
    if(opts != null && typeof opts !== "object")
        throw new TypeError("opts must be an object or null or undefined");
    if(opts == null)
        opts = {};

    if(opts.clearColor != null) {
        const clearColor = Color(opts.clearColor);
        opts.clearColor = [
            clearColor.red() / 255,
            clearColor.green() / 255,
            clearColor.blue() / 255,
            clearColor.alpha()
        ];
    }

    options = {
        clearColor: [0.0, 0.0, 0.0, 1.0],
        debug: false,
        ...opts
    };
}

function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if(canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        camera.updateProjectionMatrix(canvas.clientWidth, canvas.clientHeight, pixelRatio);
        camera.updateViewProjectionMatrix();
    }
}

function queue(params) {
    renderQueue.push(params);
}

function render() {
    if(Settings.get("showGrid")) {
        queue({
            mode: gl.TRIANGLES,
            program: "grid",
            bufferInfos: bgBufferInfos,
            uniforms: {
                uBgColor: [1.0, 1.0, 1.0, 1.0],
                uGridColor: [0.8, 0.94, 1.0, 1.0],
                uInterval: 2.0,
                uLineWidth: 0.1,
                uInvViewProjection: camera.invViewProjectionMatrix
            }
        });
    }

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(options.debug) console.groupCollapsed("webgl render"); // eslint-disable-line
    renderQueue.forEach((params, idx) => {
        if(options.debug) console.groupCollapsed("render " + idx); // eslint-disable-line

        const programInfos = shaderManager.programs[params.program];
        gl.useProgram(programInfos.program);

        if(params.transformMatrix) {
            const transformMatrix = mat4.create();
            mat4.multiply(transformMatrix, camera.viewProjectionMatrix, params.transformMatrix);
            params.uniforms.uTransformMatrix = transformMatrix;
        }

        setUniforms(programInfos, params.uniforms);
        setAttributes(programInfos, params.bufferInfos.attribs);

        gl.drawArrays(params.mode, params.offset || 0, params.bufferInfos.nbElements);

        if(options.debug) console.groupEnd("render " + idx); // eslint-disable-line
    });
    if(options.debug) console.groupEnd("webgl render"); // eslint-disable-line
    renderQueue = [];
}

function mapWorldToScreenCoordinates(worldPos) {
    if(worldPos.length === 2)
        worldPos = vec3.fromValues(worldPos[0], worldPos[1], 0.0);
    vec3.transformMat4(worldPos, worldPos, camera.viewProjectionMatrix);
    const screenX = Math.round(((worldPos[0] + 1) / 2) * canvas.clientWidth);
    const screenY = Math.round(((1 - worldPos[1]) / 2) * canvas.clientHeight);
    return vec2.fromValues(screenX, screenY);
}

function mapScreenToWorldCoordinates(screenPos) {
    const worldX = 2 * screenPos[0] / canvas.clientWidth - 1;
    const worldY = -2 * screenPos[1] / canvas.clientHeight + 1;
    const worldPos = vec3.fromValues(worldX, worldY, 0);
    vec3.transformMat4(worldPos, worldPos, camera.invViewProjectionMatrix);
    return worldPos;
}

export {
    init,
    resize,
    queue,
    render,
    gl,
    camera,
    mapWorldToScreenCoordinates,
    mapScreenToWorldCoordinates
};
