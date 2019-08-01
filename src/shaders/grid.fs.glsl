precision mediump float;

varying vec4 vGridColor;
varying vec4 vBgColor;
varying float vLineWidth;
varying float vInterval;

void main() {
    if((mod(gl_FragCoord.x, vInterval) < vLineWidth) || (mod(gl_FragCoord.y, vInterval) < vLineWidth))
        gl_FragColor = vGridColor;
    else
        gl_FragColor = vBgColor;
}
