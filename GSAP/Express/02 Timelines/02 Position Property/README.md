# Position Parameter

The position parameter allows you to offset the start time of tweens in a timeline.

```
var tl = gsap.timeline();
tl.to(object, {y:300}, "+=1")  // start 1 second after previous tween ends
tl.to(object, {x:300}, "-=1")  // start 1 second before previous tween ends
tl.to(object, {rotation:90}, "<")  // start when previous tween begins
tl.to(object, {opacity:0.5}, "<1") // start 1 second after previous tween begins
tl.to(object2, {x:200}, 1) // start exactly at a time of 1
```


Relative tweens using the "+=" and "-=" position parameters are placed relative to the end of the timeline, which isn't necessarily always the previous tween in the timeline.