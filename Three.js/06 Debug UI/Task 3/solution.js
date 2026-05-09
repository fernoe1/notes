import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import gsap from 'gsap';

const gui = new GUI();
const debugObject = {};

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
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(cube);

gui
    .add(cube.position, 'y')
    .min(-3)
    .max(3)
    .step(0.1)
    .name('elevate');

debugObject.scale = 1;
gui
    .add(debugObject, 'scale')
    .min(1)
    .max(3)
    .onChange((value) => {
        cube.scale.set(value, value, value);
    });

gui
    .add(cube, 'visible');

gui
    .add(cube.material, 'wireframe');

debugObject.color = 0xff0000;
gui
    .addColor(debugObject, 'color')
    .onChange((value) => {
        cube.material.color.set(value);
    });

debugObject.spin = () => {
    gsap.to(cube.rotation, { duration: 1.5, y: cube.rotation.y + 2 * Math.PI });
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