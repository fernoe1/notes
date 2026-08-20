# Basic Tween
The basic syntax for a to() tween is as follows:

`gsap.to(".fred", {x:400});` animates the element with a class of “fred” to an x position of 400.
If you do not specify a duration, gsap will use the default which is 0.5 seconds (500ms).

You can change the default duration using:

`gsap.defaults({duration:1});`

Behind the scenes gsap changes the target’s inline style during the animation.

***

For best performance animate CSS Transform values and opacity:

1. x

2. y

3. rotation

4. rotationX

5. rotationY

6. skewX and skewY

7. scaleX, scaleY, or just scale

***

GSAP can animate any numeric property you throw at it.

1. width and height

2. backgroundColor *hyphenated values need to be camelCase
 
3. color

4. padding

5. left and top (must set position to relative, absolute, or fixed)

6. vh and vw

Changing values that are not CSS Transforms or opacity can cause the browser to re-do its layout of the page which in extreme situations can hinder performance. For a few tweens, it’s not the end of the world as some purists make it out to be. 

# Docs

gsap.to() docs: https://greensock.com/docs/v3/GSAP/gsap.to()

gsap defaults docs: https://greensock.com/docs/v3/GSAP/gsap.defaults()

# CodePen

https://codepen.io/fernoe1/pen/PwWMOdy