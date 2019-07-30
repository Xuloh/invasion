import {upperCaseFirst} from "util/Util";

/*
 * Inspired by https://github.com/gfxfundamentals/webgl-fundamentals/blob/master/webgl/resources/webgl-utils.js
 * Check out https://webglfundamentals.org
 */

// create and compile a shader with the given source and type
function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    // if shader compilation fails
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`An error occured compiling shader : ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

// create a program with the given vertex and fragment shaders
// attribute and uniform setters are also created
function createProgram(gl, vsSource, fsSource) {
    const vs = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    // if shader program link fails
    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error(`Unable to initialize shader program : ${gl.getProgramInfoLog(shaderProgram)}`);
        gl.deleteProgram(shaderProgram);
        return null;
    }

    const programInfos = {
        program: shaderProgram
    };
    programInfos.attribSetters = createAttribSetters(gl, programInfos);
    programInfos.uniformSetters = createUniformSetters(gl, programInfos);
    return programInfos;
}

// create attribute setters for the given program
function createAttribSetters(gl, programInfos) {
    const attribSetters = {};
    const nbAttribs = gl.getProgramParameter(programInfos.program, gl.ACTIVE_ATTRIBUTES);

    for(let i = 0; i < nbAttribs; i++) { // eslint-disable-line no-loops/no-loops
        const infos = gl.getActiveAttrib(programInfos.program, i);
        if(!infos)
            break;

        attribSetters[infos.name] = createAttribSetter(gl, programInfos.program, infos);
    }

    return attribSetters;
}

// create uniform setters for the given program
function createUniformSetters(gl, programInfos) {
    const uniformSetters = {};
    const nbUniforms = gl.getProgramParameter(programInfos.program, gl.ACTIVE_UNIFORMS);

    for(let i = 0; i < nbUniforms; i++) { // eslint-disable-line no-loops/no-loops
        const infos = gl.getActiveUniform(programInfos.program, i);
        if(!infos)
            break;

        let name = infos.name;
        if(name.substr(-3) === "[0]")
            name = name.substr(0, name.length - 3);

        uniformSetters[name] = createUniformSetter(gl, programInfos.program, infos);
    }

    return uniformSetters;
}

// create a setter for the given attribute and program
function createAttribSetter(gl, program, attribInfos) {
    const location = gl.getAttribLocation(program, attribInfos.name);

    return bufferInfos => {
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfos.buffer);
        gl.vertexAttribPointer(
            location,
            bufferInfos.nbComponents,
            bufferInfos.type,
            bufferInfos.normalize || false,
            bufferInfos.stride || 0,
            bufferInfos.offset || 0
        );
        gl.enableVertexAttribArray(location);
    };
}

// create a setter for the given uniform and program
function createUniformSetter(gl, program, uniformInfos) {
    const location = gl.getUniformLocation(program, uniformInfos.name);
    const isArray = uniformInfos.length > 1 && uniformInfos.name.substr(-3) === "[0]";
    const type = uniformInfos.type;

    if(type === gl.FLOAT && isArray)
        return value => gl.uniform1fv(location, value);

    if(type === gl.FLOAT)
        return value => gl.uniform1f(location, value);

    if(type === gl.FLOAT_VEC2)
        return value => gl.uniform2fv(location, value);

    if(type === gl.FLOAT_VEC3)
        return value => gl.uniform3fv(location, value);

    if(type === gl.FLOAT_VEC4)
        return value => gl.uniform4fv(location, value);

    if(type === gl.INT && isArray)
        return value => gl.uniform1iv(location, value);

    if(type === gl.INT)
        return value => gl.uniform1i(location, value);

    if(type === gl.INT_VEC2)
        return value => gl.uniform2iv(location, value);

    if(type === gl.INT_VEC3)
        return value => gl.uniform3iv(location, value);

    if(type === gl.INT_VEC4)
        return value => gl.uniform4iv(location, value);

    if(type === gl.BOOL)
        return value => gl.uniform1iv(location, value);

    if(type === gl.BOOL_VEC2)
        return value => gl.uniform2iv(location, value);

    if(type === gl.BOOL_VEC3)
        return value => gl.uniform3iv(location, value);

    if(type === gl.BOOL_VEC4)
        return value => gl.uniform4iv(location, value);

    if(type === gl.FLOAT_MAT2)
        return value => gl.uniformMatrix2fv(location, false, value);

    if(type === gl.FLOAT_MAT3)
        return value => gl.uniformMatrix3fv(location, false, value);

    if(type === gl.FLOAT_MAT4)
        return value => gl.uniformMatrix4fv(location, false, value);

    if(type === gl.SAMPLER_2D)
        throw new Error("Uniform type SAMPLER_2D not yet supported");

    if(type === gl.SAMPLER_CUBE)
        throw new Error("Uniform type SAMPLER_CUBE not yet supported");

    // unreachable but who knows ¯\_(ツ)_/¯
    throw new Error(`Unknown uniform type 0x${type.toString(16)} for uniform ${uniformInfos.name}`);
}

// set all attributes using the given setters and buffers
function setAttributes(programInfos, attribs) {
    const setters = programInfos.attribSetters;
    Object.keys(attribs).forEach(name => {
        const setter = setters[name];
        if(setter != null)
            setter(attribs[name]);
    });
}

// set all attributes using the given setters and values
function setUniforms(programInfos, values) {
    const setters = programInfos.uniformSetters;
    Object.keys(values).forEach(name => {
        const setter = setters[name];
        if(setter != null)
            setter(values[name]);
    });
}

function createAttribsFromArrays(gl, arrays) {
    const attribs = {};
    Object.keys(arrays).forEach(name => {
        const attribName = toAttribName(name);
        const array = arrays[name];
        attribs[attribName] = {
            buffer: createBufferWithData(gl, array),
            nbComponents: array.nbComponents,
            type: array.type || gl.FLOAT
        };
    });
    return attribs;
}

// given attributes values in arrays, creates buffer info for every attribute
function createBufferInfoFromArrays(gl, arrays) {
    return {
        nbElements: getElementsCount(arrays),
        attribs: createAttribsFromArrays(gl, arrays)
    };
}

function getElementsCount(arrays) {
    const key = Object.keys(arrays)[0];
    return arrays[key].data.length / arrays[key].nbComponents;
}

// creates a new buffer and puts the given data into it
function createBufferWithData(gl, array) {
    const buffer = gl.createBuffer();
    const data = array.data;
    const type = isTypedArray(array.type) ? array.type : Float32Array;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new type(data), gl.STATIC_DRAW);
    return buffer;
}

function isTypedArray(type) {
    return type === Int8Array ||
        type === Uint8Array ||
        type === Uint8ClampedArray ||
        type === Int16Array ||
        type === Uint16Array ||
        type === Int32Array ||
        type === Uint32Array ||
        type === Float32Array ||
        type === Float64Array ||
        type === BigInt64Array ||
        type === BigUint64Array;
}

function toAttribName(name) {
    return "a" + upperCaseFirst(name);
}

export {
    loadShader,
    createProgram,
    createAttribSetters,
    createUniformSetters,
    createAttribSetter,
    createUniformSetter,
    setUniforms,
    setAttributes,
    createBufferInfoFromArrays,
    createAttribsFromArrays,
    createBufferWithData
};
