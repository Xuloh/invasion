attribute float index;

uniform vec4 uGridColor;
uniform vec4 uBgColor;
uniform ivec2 uResolution;
uniform float uLineWidth;
uniform float uInterval;

varying vec4 vGridColor;
varying vec4 vBgColor;
varying vec2 vPixelPos;
varying float vLineWidth;
varying float vInterval;

vec4 corners[4] = {
    vec4(-1, 1),
    vec4(1, 1),
    vec4(1, -1),
    vec4(-1, -1)
}

void main() {
    gl_Position = corners[index];
    vGridColor = uGridColor;
    vBgColor = uBgColor;
    vPixelPos = vec2(
        (corners[index].x + 2) * float(uResolution.x) / 2.0f,
        -(corners[index].y + 2) * float(uResolution.y) / 2.0f
    );
    vLineWidth = uLineWidth);
    vInterval = uInterval;
}
