# Transform Origin

By default DOM elements will scale, spin, and skew around their center point.

If we want to alter that we have access to the css property transform-origin. 

Like all hyphenated css properties transform-origin becomes transformOrigin when used in a GSAP tween.

transformOrigin values are set with a pair of horizontal (x) and vertical (y) values as a single string.

The values are commonly set in pixels, percents, or using the css keywords: left, center, right, top, bottom.