Import OrbitControls, FontLoader, TextGeometry.



Create new fonts folder, and copy Helvetica font and licences from three.js fonts into it.



Load the font through FontLoader, and create the geometry using TextGeometry, for the parameters write:



size: 0.5,



height: 0.2,



curveSegments: 5,



bevelEnabled: true,



bevelThickness: 0.03,



bevelSize: 0.02,



bevelOffset: 0,



bevelSegments: 4



Create matcap material.



Load all matcaps from matcaps directory using TextureLoader.



Create 200 donuts (torus geometry mesh) using for loop.



Make position, rotation, and scale of each 200 donuts random using Math.random().



Create dropdown for all matcaps for text mesh.



Enable orbit controls.



You must have CSS that makes your canvas take whole screen.



You must have resize event listener that listens to resizes.



You must have 'h' keypress event listener that hides/shows the GUI.

