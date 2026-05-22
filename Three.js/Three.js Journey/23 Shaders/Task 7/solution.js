const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 2 / 3;
scene.add(mesh);

//...

const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
        uFrequency: { value: new THREE.Vector2(10, 10) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('orange') }
    }
});