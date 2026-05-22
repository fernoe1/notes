Continuation from the previous task.

Import Html from @react-three/drei.

Put it inside sphere mesh, with 'Sphere' text. (You can put it inside any object that inherits Object3D)

Set its position to 1, 1, 0.

Set its wrapperClass attribute to 'label'.

Inside style.css style the label class. (Hint: use label > div)

Use center attribute to center the text.

Set its distanceFactor attribute to 8 to make it work with perspective.

Use useRef hook to get reference of sphere.

Make text dissappear when its behind sphere and cube using its occlude attribute.