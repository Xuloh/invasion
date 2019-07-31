precision mediump float;

varying vec4 vGridColor;
varying vec4 vBgColor;
varying vec2 vPixelPos;
varying float vLineWidth;
varying float vInterval;

void main() {
    if(((int(vPixelPos.x) % vInterval) < int(vLineWidth)) || ((int(vPixelPos.y) % vInterval) < int(vLineWidth)))
        gl_FragColor = vGridColor;
    else
        gl_FragColor = vBgColor;
}
