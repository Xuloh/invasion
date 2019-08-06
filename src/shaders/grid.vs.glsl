attribute vec4 aPosition;

uniform vec4 uGridColor;
uniform vec4 uBgColor;
uniform float uLineWidth;
uniform float uInterval;
uniform mat4 uInvViewProjection;

varying vec4 vGridColor;
varying vec4 vBgColor;
varying float vLineWidth;
varying float vInterval;
varying vec4 vWorldPos;

void main() {
    gl_Position = aPosition;
    gl_Position.z = 1.0;
    vGridColor = uGridColor;
    vBgColor = uBgColor;
    vLineWidth = uLineWidth;
    vInterval = uInterval;
    vWorldPos = uInvViewProjection * aPosition;
}
