Create sphere, and a plane using the same MeshStandardMaterial.



Create ambientLight, directionalLight.



Enable shadowMap for renderer.



Enable castShadow for sphere and directional light, enable receiveShadow for plane.



Create directionalLightCameraHelper from directionalLightshadow.camera.



Using lil-gui, add debug for following things:
ambientLight.intensity

directionalLight.intensity

directionalLightCamera.visible

directionLight.shadow.camera top;right;bottom;left;near;far

directionalLight.position x;y;z

material metalness;roughness.

You must have CSS that makes your canvas take whole screen.



You must have resize event listener that listens to resizes.



You must have 'h' keypress event listener that hides/shows the GUI.


