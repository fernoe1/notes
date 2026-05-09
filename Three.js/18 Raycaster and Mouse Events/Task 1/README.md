Import THREE, OrbitControls, lil-gui.



Instantiate debug gui.



Add event listener that listens to h key press, which shows and hides debug gui.



Fetch canvas using document.querySelector().



Create sizes object that scales dynamically from window size.



Create scene.



Create camera, 75, sizes.w / sizes.h, 0.1, 100.



Create renderer.



Create event listener that listens to resize and changes the scene accordingly. 



Instantiate OrbitControls, enable damping.



Create tick which calculates elapsed time, updates renderer and controls.



Create 3 spheres, each with 0.5, 16, 16 SphereGeometry and 0xff0000 color MeshBasicMaterial.



Position them so each has 2 distance between in x axis.



Instantiate raycaster.



Create rayOrigin at -3, 0, 0; rayDirection at 10, 0, 0; normalize rayDirection.



Set origin and direction of raycaster.



Test if raycaster intersects object1, check if raycaster intersects all objects, log intersections.

You must have CSS that makes your canvas take whole screen.



You must have resize event listener that listens to resizes.



You must have 'h' keypress event listener that hides/shows the GUI.

