Create CustomObject.jsx component.



Import CustomObject.jsx component inside Experience.jsx component and put it in the end below floor mesh.



Inside CustomObject.jsx
Create Float32Array with positions of vertices.



Use that positions array to create a CustomObject using <bufferGeometry> and <bufferAttribute> tags.



Use useMeme hook to cache positions array creation.



Use useRef hook to reference bufferGeometry.



Use useEffect hook to compute vertex normals on the first render of the geometry.

