Change material to use THREE.ShaderRawMaterial();



Pass following code the ShaderRawMaterial properties

for vertexShader

&#x20;       uniform mat4 projectionMatrix;

&#x20;       uniform mat4 viewMatrix;

&#x20;       uniform mat4 modelMatrix;



&#x20;       attribute vec3 position;



&#x20;       void main() {

&#x20;           gl\_Position = projectionMatrix \* viewMatrix \* modelMatrix \* vec4(position, 1.0);

&#x20;       }



for fragmentShader

&#x20;       precision mediump float;



&#x20;       void main() {

&#x20;           gl\_FragColor = vec4(1.0, 0, 0, 1.0);

&#x20;       }



using backticks.

