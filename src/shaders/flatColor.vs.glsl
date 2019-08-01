attribute vec4 aVertexPosition;

uniform mat4 uTransformMatrix;
uniform vec4 uColor;

varying lowp vec4 vColor;

void main() {
    gl_Position = uTransformMatrix * aVertexPosition;
    vColor = uColor;
}
