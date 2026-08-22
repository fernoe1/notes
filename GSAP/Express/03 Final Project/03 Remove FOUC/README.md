# Remove Flash of Unstyled Content (FOUC)

The Flash of Unstyled Content occurs when elements appear before they are styled properly. Most commonly this happens when a page renders before the proper font has loaded. You’ll see text for a brief second with the wrong font and then it will change. 

In order to give users the quickest loading experience its recommended to load your custom scripts after the closing body tag. For our purposes we are using GSAP to animate things in from an opacity of 0, however there is always going to be a brief duration of time after the page is rendered and your JavaScript runs; this is the flash of unstyled content.


To avoid the flash there are a few steps to take:

1. Hide the `<div>` that contains all your elements by giving it a css style of `visibility:hidden`

2. Create gsap animation code that fades in from `autoAlpha:0`

3. Wrap your animation code in an `init()` function.

4. Call the `init()` function after the page loads using a load event listener.

# CodePen

https://codepen.io/fernoe1/pen/emvOaxP?editors=0010