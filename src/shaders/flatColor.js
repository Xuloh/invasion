import fs from "../shaders/flatColor.fs.glsl";
import vs from "../shaders/flatColor.vs.glsl";

const infos = {
    attributes: ["vertexPosition", "vertexColor"],
    uniforms: ["projectionMatrix", "modelViewMatrix"]
};

export {
    fs,
    vs,
    infos
};
