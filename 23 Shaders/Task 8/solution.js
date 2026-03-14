const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load('/textures/flag-kazakhstan.png');

// ...

const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
        uFrequency: { value: new THREE.Vector2(10, 10) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('orange') },
        uTexture: { value: flagTexture }
    }
});
