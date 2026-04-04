uniform vec3 uColor;

#include ../shares/ambientLight.glsl

void main() {
    vec3 color = uColor;

    vec3 light = vec3(0.0);
    light += ambientLight(
        vec3(1.0), // light color
        0.03 // light intensity
    );
    color *= light;

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}