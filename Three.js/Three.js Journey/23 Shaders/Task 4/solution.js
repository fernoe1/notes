const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const count = geometry.getAttribute('position').count;

const randoms = new Float32Array(count);

for (let i = 0; i < randoms.length; i++) {
    randoms[i] = Math.random();
}

geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));