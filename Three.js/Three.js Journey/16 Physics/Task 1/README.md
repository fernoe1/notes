Create plane, sphere.



Create AmbientLight, and DirectionalLight.



Install cannon.js (npm install cannon).



Create physical world.



Set gravity of the physical world to -9.82.



Create sphere in the physical world using Sphere shape, mass 1, positions 0, 3, 0.



Make physical world step every frame. (world.step() inside raf function).



Make three js sphere copy physical world sphere.



Create plane in the physical world.



Rotate the plane so it matches the three js plane.



Create defaultMaterial.



Create defaultContactMaterial, set friction 0.1 and restitution 0.7 against two defaultContactMaterials.



Set defaultContactMaterial of the world to defaultContactMaterial you just made.



You must have CSS that makes your canvas take whole screen.



You must have resize event listener that listens to resizes.



You must have 'h' keypress event listener that hides/shows the GUI.

