Continuation from the previous task.

Create uSize uniform value, set gl_PointSize to uSize inside vertex.glsl.

Create scales Float32Array array that stores scale for the size of every point.

Fill it out using Math.random() inside a for loop.

Create aScale attribute and set scales to it using THREE.BufferAttribute.

Use it in vertex shader to randomize each point's scale.

Multiply uSize uniform value by renderer.getPixelRatio() to make points same size in every pixel ratio screen.

Use viewPosition.z to give gl_PointSize a size attentuation effect.

Inside fragment glsl, create disc, diffused light and light point patterns, use the pattern you like the most.