# from() and fromTo()

`gsap.from()` animates from the values you specify to the object’s natural values.

To animate from x and y values of 400, use:

`gsap.from(".fred", {x:400, y:400});`

gsap.fromTo() animates from the values you specify to the values you specify.

The 2 objects in the code below are the from vars and to vars.

`gsap.fromTo(".fred", {x:400, y:400}, {x:200, y:200});`

For best results make sure the from vars and to vars have the same properties.

# Docs

gsap.from() docs: https://greensock.com/docs/v3/GSAP/gsap.from()

gsap.fromTo() docs: https://greensock.com/docs/v3/GSAP/gsap.fromTo()

# CodePen

https://codepen.io/fernoe1/pen/NPdQXBr