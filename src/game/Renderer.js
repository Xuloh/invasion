import {mat4, vec2, vec3} from "gl-matrix";
import {setAttributes, setUniforms} from "util/WebGLUtils";
import Color from "color";
import ShaderManager from "game/ShaderManager";
import WebGLDebugUtils from "util/webgl-debug";

let canvas = null;
let gl = null;
let shaderManager = null;
let options = null;
let projectionMatrix = null;
let invProjectionMatrix = null;
let renderQueue = [];

const pixelRatio = 50;

function init(canvasId, opts) {
    // get canvas
    if(typeof canvasId !== "string")
        throw new TypeError("canvasId must be a string");
    canvas = document.getElementById(canvasId);

    // get webgl context
    if(canvas.getContext == null)
        throw new Error("Canvas API not supported on this browser");

    gl = canvas.getContext("webgl");
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

    createProjection();

    // init some webgl stuff
    if(opts.debug) console.groupCollapsed("webgl init"); // eslint-disable-line
    gl.clearColor(...options.clearColor);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    if(opts.debug) console.groupEnd("webgl init"); // eslint-disable-line
}

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

function createProjection() {
    // create projection matrix
    const width = canvas.clientWidth * 1 / pixelRatio;
    const height = canvas.clientHeight * 1 / pixelRatio;

    projectionMatrix = mat4.create();

    mat4.ortho(
        projectionMatrix,
        -width / 2,
        width / 2,
        -height / 2,
        height / 2,
        0.0,
        100.0
    );

    invProjectionMatrix = mat4.create();
    mat4.invert(invProjectionMatrix, projectionMatrix);
}

function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if(canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        createProjection();
    }
}

function queue(params) {
    renderQueue.push(params);
}

function render() {
    //TODO implement a render queue instead of rendering everything on the spot
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(options.debug) console.groupCollapsed("webgl render"); // eslint-disable-line
    renderQueue.forEach((params, idx) => {
        if(options.debug) console.groupCollapsed("render " + idx); // eslint-disable-line
        const programInfos = shaderManager.programs[params.shader];
        gl.useProgram(programInfos.program);
        setUniforms(programInfos, params.uniforms);
        setUniforms(programInfos, {
            uProjectionMatrix: projectionMatrix
        });
        setAttributes(programInfos, params.bufferInfos.attribs);
        const offset = 0;
        gl.drawArrays(params.mode, offset, params.bufferInfos.nbElements);
        if(options.debug) console.groupEnd("render " + idx); // eslint-disable-line
    });
    if(options.debug) console.groupEnd("webgl render"); // eslint-disable-line
    renderQueue = [];
}

function mapWorldToScreenCoordinates(worldPos) {
    if(worldPos.length === 2)
        worldPos = vec3.fromValues(worldPos[0], worldPos[1], 0.0);
    vec3.transformMat4(worldPos, worldPos, projectionMatrix);
    const screenX = Math.round(((worldPos[0] + 1) / 2) * canvas.clientWidth);
    const screenY = Math.round(((1 - worldPos[1]) / 2) * canvas.clientHeight);
    return vec2.fromValues(screenX, screenY);
}

function mapScreenToWorldCoordinates(screenPos) {
    const worldX = 2 * screenPos[0] / canvas.clientWidth - 1;
    const worldY = -2 * screenPos[1] / canvas.clientHeight + 1;
    const worldPos = vec3.fromValues(worldX, worldY, 0);
    vec3.transformMat4(worldPos, worldPos, invProjectionMatrix);
    return worldPos;
}

export {
    init,
    resize,
    queue,
    render,
    gl,
    mapWorldToScreenCoordinates,
    mapScreenToWorldCoordinates
};
