Continuation from the previous task.

Create smokeGeometry which is a plane with 1 width, 1 height and 16 width, 64 height subdivisions. Translate it in the y axis by 0.5. Scale it by 1.5, 6, 1.5.

Create smokeMaterial which is ShaderMaterial, turn wireframe and doubleside on.

Create smoke mesh and add it to the scene. Change the smoke's position on the y axis to 1.83.

Create vertex.glsl and fragment.glsl inside shaders/coffeSmoke directory, write base shader code inside them, import them and place inside smokeMaterial constructor.

Write down
```
#include <tonemapping_fragment>
#include <colorspace_fragment>
```
below gl_FragColor.

Load perlinTexture and pass it to the fragment shader using uniform (new THREE.Uniform()).

Pass uv coordinates using varying from vertex shader to fragment shader as vUv.

Using vUv's, map the red channel of the texture on fragment shader. (Hint: use texture())

Map the red channel on the alpha of frag color and turn transparency on.

Create new vec2 smokeUv variable that will be used to scale down vUv.

Multiply the x and y of smokeUv by 0.5 and 0.3 respectively.

Create uTime uniform variable, update it every tick and using it animate the smoke going up. 

To avoid infinite black lines, set the wrapS and wrapT properties of the texture to THREE.RepeatWrapping.

Remapping perlin texture:
	using smoothstep turn every value below 0.4 to 0.0.
	using smoothstep clip the ends of the plane. (Hint: use vUv.x and vUv.y).

Change the base color of the gl_FragColor to 0.6, 0.3, 0.2.