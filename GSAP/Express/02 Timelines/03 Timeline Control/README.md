# Timeline Control and Labels

Timelines have the exact same control methods as tween. Since you already know how to `play()` a tween you already know how to `play()` a timeline.

You must first create a reference to your timeline like

`var animation = gsap.timeline()`

 ```
// later on you can do
animation.play();
animation.pause();
animation.restart();
animation.reverse();
//etc
```
Labels allow you mark a specific point in time in your timeline. 

You can add a label to a timeline using the `add()` method
```
.from("#freds img", {y:160, stagger:0.5, duration:0.8, ease:"back"}, "+=0.5")
.add("test")
.from("#time", {xPercent:100, duration:1, ease:"bounce"});
```

# CodePen

https://codepen.io/fernoe1/pen/bNqbmNp