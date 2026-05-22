Create the following pattern below using vUv inside fragment.glsl.

Since the pattern is glayscale float strength variable to hold vUv variable you will use, and spread it using vec3() inside vec4(). 

Use random function.
`
float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
`

![Pattern](pattern.png)