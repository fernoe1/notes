Create a sphere mesh with SphereGeometry of radius 0.5, width segments 16, height segments 16. Move sphere left 1.5 positions in the x axis.



Create a plane mesh with PlaneGeometry of width 1, height 1.



Create a torus mesh with TorusGeometry of radius 0.3, tube 0.2, radial segments 16, tubular segments 36. Move torus right 1.5 positions in the x axis.



Enable orbit controls.



Create textureLoader, load all the textures in the door directory, first textures in matcaps, gradients.



Create hdrLoader, load environmentMap and put it inside the scene.



Set SRGBColorSpace for doorColorTexture and matcapTexture color spaces.



Create MeshPhysicalMaterial, put following materials properties:
side = double sided;
metalness = 0;

roughness = 0;

transmission = 1;

ior = 1.5;

thickness = 0.5;
Initialize all the meshes (sphere, plane, torus) with the material you just made.



Create clock, animate mesh rotations using clock.getElapsedTime() in y and x eulers.

You must have CSS that makes your canvas take whole screen.



You must have resize event listener that listens to resizes.

