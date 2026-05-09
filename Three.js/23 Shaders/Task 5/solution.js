const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
        uFrequency: { value: new THREE.Vector2(10, 10) }
    }
});

gui
    .add(material.uniforms.uFrequency.value, 'x')
    .min(0)
    .max(20)
    .step(0.01)
    .name('frequencyX');

gui
    .add(material.uniforms.uFrequency.value, 'y')
    .min(0)
    .max(20)
    .step(0.01)
    .name('frequencyY');