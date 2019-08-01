precision mediump float;

varying vec4 vGridColor;
varying vec4 vBgColor;
varying float vLineWidth;
varying float vInterval;
varying vec4 vWorldPos;

void main() {
    if((mod(vWorldPos.x, vInterval) < vLineWidth) || (mod(vWorldPos.y, vInterval) < vLineWidth))
        gl_FragColor = vGridColor;
    else
        gl_FragColor = vBgColor;
}
