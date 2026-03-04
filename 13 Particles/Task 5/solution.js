import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    closeFolders: true
});
const debugObject = {};

addEventListener('keypress', (event) => {
    if (event.key === 'h') gui.show(gui._hidden);
});

const canvas = document.querySelector('canvas.webgl');

const sizes = {
    width: innerWidth,
    height: innerHeight
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const textureLoader = new THREE.TextureLoader();

const particleTexture = textureLoader.load('/textures/particles/2.png');

const count = 5000000;
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
}

particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 0.02;
particlesMaterial.sizeAttenuation = true;
particlesMaterial.vertexColors = true;
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.depthWrite = false;

const particles = new THREE.Points(particleGeometry, particlesMaterial);
particleGeometry.setDrawRange(0, 500);
scene.add(particles);

debugObject.count = 500;
gui
    .add(debugObject, 'count', [500, 5000, 50000, 500000, 5000000])
    .onChange((value) => particleGeometry.setDrawRange(0, value));

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        particleGeometry.getAttribute('position').array[i3 + 1] = Math.sin(elapsedTime - particleGeometry.attributes.position.array[i3 + 0]);
    }

    particleGeometry.attributes.position.needsUpdate = true;
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();

/** CSS
*
{
    margin: 0;
    padding: 0;
}

html,
body
{
    overflow: hidden;
}

.webgl
{
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
*/