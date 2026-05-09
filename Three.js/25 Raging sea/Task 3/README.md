Continuation from the previous task.

Add depthColor, surfaceColor properties to debugObject,
create uDepthColor, uSurfaceColor uniform values using new THREE.Color,
add them to gui.

Pass elevation using varying as vElevation to fragment shader, and use it as a strength for mix(uDepthColor, uSurfaceColor, vElevation) function,
use it in gl_FragColor.

Create uColorOffset, uColorMultiplier values, use them to offset and multiply vElevation varying,
add them to gui.

Find your perfect values, and set them.