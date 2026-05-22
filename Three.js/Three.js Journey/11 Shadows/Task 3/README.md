Create sphere, and a plane using the same MeshStandardMaterial.



Create ambientLight, spotLight.



Enable shadowMap for renderer.



Enable castShadow for sphere and spot light, enable receiveShadow for plane.



Create pointLightCameraHelper from pointLight.shadow.camera.



Using lil-gui, add debug for following things: ambientLight.intensity



pointLight.intensity



pointLightCamera.visible



pointlight distance;decay



pointLight.position x;y;z



pointlight.shadow.camera near;far



material metalness;roughness.



You must have CSS that makes your canvas take whole screen.



You must have resize event listener that listens to resizes.



You must have 'h' keypress event listener that hides/shows the GUI.

