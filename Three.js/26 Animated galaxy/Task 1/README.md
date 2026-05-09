Change PointsMaterial to ShaderMaterial, remove unnecessary properties.

Create vertex.glsl and fragment.glsl inside ./shaders/galaxy directory.

Create default code for vertex.glsl with gl_PointSize = 2.0; added,
Create default code for fragment.glsl that makes every point white.

Import them inside script.js and use them inside ShaderMaterial.