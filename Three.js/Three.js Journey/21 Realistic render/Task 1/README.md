Import THREE, OrbitControls,RGBELoader, GLTFLoader, GUI.



Instantiate GUI, RGBELoader, GLTFLoader.



Add event listener that shows/hides gui when h key is pressed.



Fetch canvas from the document.



Create dynamic sizes object that scales from vp width/height.



Create a scene.



Create a PerspectiveCamera, 75, sizes.width / sizes.height, 0.1, 100.



Create a renderer.



Add an event listener that listens to resizes and changes sizes object, renderer, camera accordingly. 



Instantiate orbit controls, enableDamping.



Update and render on tick function.



Using rgbeLoader load the environment map, set it as env map.



Using gltfLoader load the flight helmet model, set the scale to 10, add it to the scene.



Set the target.y of OrbitControls to 3.5.



Create updateAllMaterials function that sets envMapIntensity of all materials to global.envMapIntensity.



Add slider to global.envMapIntensity, 0, 10, 0.001, on change fire the function you just made above.



Create tone mapping dropdown with No, Linear, Reinhard, Cineon, ACESFilmic.



Create toneMappingExposure slider, 0, 10, 0.001.



