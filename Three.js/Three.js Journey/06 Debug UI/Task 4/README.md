Create cube, enable orbit controls.



Using lil-gui add the following:

1. visible checkbox
2. wireframe checkbox
3. subdivision field that creates new geometry with that subdivision on finish, min 1, max 20, step 1
4. position x, min -3, max 3, step 0.1
5. position y, min -3, max 3, step 0.1
6. position z, min -3, max 3, step 0.1
7. rotation x, min 0, max 360, step 1
8. rotation y, min 0, max 360, step 1
9. rotation z, min 0, max 360, step 1
10. spin x function
11. spin y function
12. spin z function (all of them need to spin by 360 deg)
13. color field that uses actual color

You must give name to your main GUI and create a folder that stores every debug about the cube.

You must have keypress event listener that shows and hides debug ui on 'h' key press.

You must have CSS that makes your canvas take whole screen.

You must have resize event listener that listens to resizes.



(Hint: changing subdivisions requires you to create a new geometry, so use debugObject.subdivisions, and also don't forget to dispose off the previous geometry. Use gsap for spin animations)



RECOMMENDATION: Instead of continuing from the previous tasks, rewrite the whole code again, to memorize the syntax.

