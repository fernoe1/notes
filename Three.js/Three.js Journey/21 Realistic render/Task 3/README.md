Continuation.



Comment the FlightHelmet code.



Load the hamburger.glb inside models directory (you can use the hamburger you made in the previous lesson about blender).



Add it to the scene, scale it down to 0.4, bring it 4 points up in y axis.



Set the envMap intensity to 0, notice the stripe artifact? Those are called shadow acne, to remove them add normalBias and bias properties of directionalLight.camera to the debug GUI, they should go from -0.05 to 0.05 with 0.001 step.



Using those tweaks find perfect values, and set them.



(Hint: Don't forget to fire updateAllMaterials functions inside load callback function.)

