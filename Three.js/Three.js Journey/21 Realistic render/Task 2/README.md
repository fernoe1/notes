Continuation.



Enable shadowMap on the renderer, and set its type to PCFSoftShadowMap.



Create directionalLight, and directionalLightCameraHelper.



Using directionalLightCameraHelper and debug gui, find the perfect spot for the directionalLight.



Set far of the camera to 15 and mapSize of the shadow to 512, 512.



Set the target of shadow.camera to 0, 4, 0 and updateWorldMatrix to see it change.



Update updateAllMeshes function to enable castShadow and receiveShadow on every mesh.



Load castle and wood textures from textures directory.



Using those textures create wooden floor and castle brick walls behind flight helmet, position them correctly.



Set the correct color space for color textures.

