precision mediump float;

varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 lightUv = vec2(
        vUv.x * 0.1 + 0.45,
        vUv.y * 0.5 + 0.25
    );

    float strength = 0.015 / length(lightUv - 0.5);

    gl_FragColor = vec4(vec3(strength), 1.0);
}