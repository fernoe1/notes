Continuation.

To animate a black screen fading away when everything finishes loading, we need that "black screen".

Create plane geometry with 2, 2, 1, 1 fields and shader material for it.

Inside vertex shader put gl_Position to vec4(position, 1.0) so its always on top of the screen.

Inside fragment shader put the color to black and alpha to 0.5. (Don't forget to turn on transparency).

Now you have black overlay that will be used to animate the loading screen.