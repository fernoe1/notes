import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import gsap from 'gsap';

const gui = new GUI();
const debugObject = {};

const canvas = document.querySelector('canvas.webgl');

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', (event) => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: '#32464e' })
);
scene.add(cube);

debugObject.spin = () => {
    gsap.to(cube.rotation, { duration: 1.5, y: cube.rotation.y + Math.PI * 2 });
};

gui
    .add(debugObject, 'spin');

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const tick = () => {
    controls.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

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