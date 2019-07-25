import {mat4, vec2, vec3} from "gl-matrix";
import Color from "color";
import ShaderManager from "game/ShaderManager";

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
    if(gl == null)
        throw new Error("Couldn't initialize WebGL. It may not be supported on this browser");

    handleOptions(opts);

    shaderManager = new ShaderManager(gl);

    createProjection();

    // init some webgl stuff
    gl.clearColor(...options.clearColor);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
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
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function putAttribArray(location, buffer, numComponents) {
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(
        location,
        numComponents,
        type,
        normalize,
        stride,
        offset
    );
    gl.enableVertexAttribArray(location);
}

function queue(params) {
    renderQueue.push(params);
}

function render() {
    //TODO implement a render queue instead of rendering everything on the spot
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    renderQueue.forEach(params => {
        const buffers = [];

        const shader = shaderManager.shaderPrograms[params.shader];

        Object.keys(params.attributes).forEach(attribute => {
            const bufferIdx = buffers.push(gl.createBuffer()) - 1;
            const data = params.attributes[attribute];
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers[bufferIdx]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.DYNAMIC_DRAW);
            putAttribArray(shader.infos.attribLocations[attribute], buffers[bufferIdx], data.length / params.vertexCount);
        });

        gl.useProgram(shader.program);

        Object.keys(params.uniforms).forEach(uniform => {
            const data = params.uniforms[uniform];
            switch(data.type) {
                case "mat4":
                    gl.uniformMatrix4fv(
                        shader.infos.uniformLocations[uniform],
                        false,
                        data.value
                    );
                    break;
                case "vec4":
                    gl.uniform4fv(
                        shader.infos.uniformLocations[uniform],
                        data.value
                    );
                    break;
                default:
                    console.warn("Unsupported uniform type : " + data.type);
                    break;
            }
        });

        // set shader uniforms
        gl.uniformMatrix4fv(
            shader.infos.uniformLocations.projectionMatrix,
            false,
            projectionMatrix
        );

        const offset = 0;
        gl.drawArrays(params.mode, offset, params.vertexCount);

        buffers.forEach(b => gl.deleteBuffer(b));
    });

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
