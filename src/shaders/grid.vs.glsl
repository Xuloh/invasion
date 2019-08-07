#version 300 es
in vec4 aPosition;

uniform vec4 uGridColor;
uniform vec4 uBgColor;
uniform float uLineWidth;
uniform float uInterval;
uniform mat4 uInvViewProjection;

out vec4 vGridColor;
out vec4 vBgColor;
out float vLineWidth;
out float vInterval;
out vec4 vWorldPos;

void main() {
    gl_Position = aPosition;
    gl_Position.z = 1.0;
    vGridColor = uGridColor;
    vBgColor = uBgColor;
    vLineWidth = uLineWidth;
    vInterval = uInterval;
    vWorldPos = uInvViewProjection * aPosition;
}
