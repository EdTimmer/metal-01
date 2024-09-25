precision mediump float;

uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec2 vUv0;

void main() {
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    vUv0 = uv;
}