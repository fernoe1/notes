Import THREE from three, OrbitControls, GLTFLoader from three addons.

Import GUI from lil-gui.



Instantiate gui using GUI.



addEventListener hat listens to keypress that shows/hides debug gui.



Fetch canvas using document.querySelector.



Create sizes object that takes width and height from innerWidth and innerHeight.



Create scene.



Create PerspectiveCamera, 75, sizes.width / sizes.height, 0.1, 100.



Create renderer, set shadowMap enabled and shadowMap.type to THREE.PCFSoftShadowMap.



Instantiate OrbitControls, set target to 0, 0.75, 0 and enable damping to true.



Create ambientLight with 0xff color and 2.4 intensity.



Create directionalLight, 0xff, 1.8 intensity, set castShadow to true, mapSize to 1024, 1024, far 15, top, right 7, bottom, left -7, position 5, 5, 5.



Create floor, PlaneGeometry(10, 10), MeshStandardMaterial, color #44, metalness 0, roughness 0.4, receiveShadow = true.



Instantiate gltfLoader, load duck gltf and add to the scene its first child.



Instantiate clock, create tick function, with deltaTime calculation, controls update and render.

You must have CSS that makes your canvas take whole screen.



You must have resize event listener that listens to resizes.



You must have 'h' keypress event listener that hides/shows the GUI.



