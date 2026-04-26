Continuation from the previous task.

Using textureLoader load bakedTexture from baked.jpg.

Set flipY property of bakedTexture to false (because blender starts UV from bottom left).

Set color space of bakedTexture to sRGBColorSpace (for better colors).

Create bakedMaterial and set bakedTexture into it.

Load portal.glb using GLTFLoader.

Using traverse of a gltf scene, put bakedMaterial to all of the children of the scene.

Create poleLightMaterial and portalLightMaterial for emission materials.

Using find on gltf scene children, put the above materials to their appropiate meshes.