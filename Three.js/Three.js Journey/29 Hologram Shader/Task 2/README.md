Continuation from the previous task.

Change MeshBasicalMaterial to ShaderMaterial, create vertex.glsl and fragment.glsl in shaders/holographic directory with base shader code.

Add them to ShaderMaterial.

Pass world position as vPosition to fragment.glsl using varying.

Using vPosition create stripe pattern just like the one you did in the shader patterns.

Make stripes sharper using pow function.

Pass time as uniform variable to the fragment shader to animate the stripes.

Dehomogenize normal vectors using modelMatrix * vec4(normal, 0.0)

Pass the new normal to the fragment shader using varying.

Using the normal vector, create fresnel effect twice, one for main, one for fall off.