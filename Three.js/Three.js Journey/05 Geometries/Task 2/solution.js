import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', (event) => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
scene.add(camera);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const count = 77;
const positionsArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 3;
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', positionsAttribute);

const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
);
scene.add(mesh);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const tick = () => {
    controls.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

renderer.render(scene, camera);

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