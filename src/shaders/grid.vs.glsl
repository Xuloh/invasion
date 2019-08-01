attribute vec4 aPosition;

uniform vec4 uGridColor;
uniform vec4 uBgColor;
uniform float uLineWidth;
uniform float uInterval;
uniform mat4 uInvViewProjection;
uniform vec4 uPosition;

varying vec4 vGridColor;
varying vec4 vBgColor;
varying float vLineWidth;
varying float vInterval;
varying vec4 vWorldPos;

void main() {
    vec4 worldPos = uInvViewProjection * aPosition;
    vWorldPos = worldPos + uPosition;

    gl_Position = aPosition;
    vGridColor = uGridColor;
    vBgColor = uBgColor;
    vLineWidth = uLineWidth;
    vInterval = uInterval;
}
