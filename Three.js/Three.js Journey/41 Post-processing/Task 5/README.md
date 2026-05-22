Continuation.

Instantiate WebGLRenderer target outside EffectComposer with random size and width (it will be set in event listener) and with object with sample field as renderer.getPixelRatio() === 1 ? 2 : 0. (if you have more than 1 pxlr you don't need it).

Import SMAAPass and create an if block that adds smaaPass. The if field should only work if the user has 1 pixel ratio and is not capable of running webgl2.