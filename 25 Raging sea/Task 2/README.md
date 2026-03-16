Continuation from the previous task.

Change MeshBasicMaterial to ShaderMaterial.

Write default vertex and fragment shader code.

Using modelPosition and sine function, create waves on both x and y axis.

Create uniform variable uBigWaveElevation that controls how high the waves can get. (from 0 to 1, with step 0.001).

Create uniform variable uBigWaveFrequency that is vector2, (x for x axis, y for z axis) that controls the frequency. (from 0 to 4, with step 0.001).

Create uniform variable uTime to animate the frequency by offsetting the sine value. uTime must be updated inside tick function on every render by using elapsedTime.

Create uniform variable uBigWaveSpeed that controls the speed of the frequency. (0 to 4, with step 0.001).

Add lil-gui debugs to all those properties excluding uTime.