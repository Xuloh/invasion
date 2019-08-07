#version 300 es
precision mediump float;

in vec4 vGridColor;
in vec4 vBgColor;
in float vLineWidth;
in float vInterval;
in vec4 vWorldPos;

out vec4 fragColor;

void main() {
    if((mod(vWorldPos.x, vInterval) < vLineWidth) || (mod(vWorldPos.y, vInterval) < vLineWidth))
        fragColor = vGridColor;
    else
        fragColor = vBgColor;
}
