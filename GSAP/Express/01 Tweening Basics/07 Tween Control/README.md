# Tween Control

Tween’s have a number of methods for controlling playback.

In order to control a tween you need have way to reference it. Below we set up a variable to reference our tween.

`var tween = gsap.to("#fred", {x:600});`

You can use let or const instead of var based on your preference and level of comfort with JS.

To prevent a tween from playing automatically you can set its paused special property to true.

`var tween = gsap.to("#fred", {x:600, paused:true});`

To play that tween you can later call:

`tween.play();`

# CodePen

https://codepen.io/fernoe1/pen/EaZqEOZ?editors=0010