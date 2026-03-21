Continuation from the previous task.

Set the gl_FragmentColor to red and wireframe to true to better observe the vertexes.

Create rotate2D function inside vertex shader, using vite-plugin-glsl modulize it so you can import it using #include.

Create newPosition out of position so you can change the base position.

Import uTime and uPerlinTexture.

Using uTime and uPerlinTexture create a twist.

Create windOffset vec2.

Using uPerlinTexture red channel on two different lines, simulate wind movement.

Use pow function to give wind more curvature.

Add windOffset to the newPosition.