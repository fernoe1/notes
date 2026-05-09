Import THREE, OrbitControls, GLTFLoader, GUI.



Instantiate GUI.



Fetch canvas using document.querySelector().



Create sizes object, and add an event listener so it dynamically changes camera aspect and renderer size, pixelRatio.



Create scene.



Create cubeTextureLoader and load cube texture from 0th environmentMap.



Set background and environment to that environment map.



Create perspectiveCamera, 75, sizes.width / sizes.height, 0.1, 100.



Create renderer.



Instantiate OrbitControls, enable damping, set target up 3.5 units.



Create torusKnot mesh, set position -4, 4, 0.



Instantiate gltfLoader, and using it, load flight helmet model and set its scale to 10, 10, 10.



Implement tick function that updates controls, renders on each frame, gets elapsedTime.



Call tick.



You must have CSS that makes your canvas take whole screen.



You must have resize event listener that listens to resizes.



You must have 'h' keypress event listener that hides/shows the GUI.

