attribute vec4 aPosition;

uniform vec4 uGridColor;
uniform vec4 uBgColor;
uniform float uLineWidth;
uniform float uInterval;

varying vec4 vGridColor;
varying vec4 vBgColor;
varying float vLineWidth;
varying float vInterval;

void main() {
    gl_Position = aPosition;
    vGridColor = uGridColor;
    vBgColor = uBgColor;
    vLineWidth = uLineWidth;
    vInterval = uInterval;
}
