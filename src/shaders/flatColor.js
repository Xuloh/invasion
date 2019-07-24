import fs from "../shaders/flatColor.fs.glsl";
import vs from "../shaders/flatColor.vs.glsl";

const infos = {
    attributes: ["vertexPosition"],
    uniforms: ["projectionMatrix", "modelViewMatrix", "color"]
};

export {
    fs,
    vs,
    infos
};
