Import THREE, OrbitControls, GUI from 'lil-gui'.

Instantiate GUI with width 370, and other parameters that you need, create debugObject, add event listener that hides/shows debug gui when 'h' key is pressed.

Fetch canvas from document.

Create sizes object.

Instantiate scene, camera(75, sizes.width / sizes.height, 0.1, 100) set its position to 1,1,1 add to scene, renderer.

Add resize event listener that sets camera, renderer to new sizes.

Instantiate orbit controls, enable damping.

Create waterGeometry (plane 2, 2, 128, 128), create waterMaterial (MeshBasicMaterial), create water mesh rotate it so its perpendicular with frontside pointed up, add it to scene.

Instantiate clock, create tick function which gets elapsedTime from clock, updates controls, renders, and call raf inside it.