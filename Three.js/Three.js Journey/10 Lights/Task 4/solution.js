import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    closeFolders: true
});

addEventListener('keypress', (event) => {
    if (event.key === 'h') gui.show(gui._hidden);
});

const sizes = {
    width: innerWidth,
    height: innerHeight
};

addEventListener('resize', () => {
    sizes.width = innerWidth;
    sizes.height = innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
});

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const material = new THREE.MeshStandardMaterial();

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
);
sphere.position.x = -1.5;

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(cube, sphere, torus, plane);

const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
scene.add(pointLight);

gui
    .add(pointLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.01);

gui
    .add(pointLight, 'distance')
    .min(0)
    .max(10)
    .step(0.01);

gui
    .add(pointLight, 'decay')
    .min(0)
    .max(10)
    .step(0.01);

const meshes = [sphere, cube, torus]
const clock = new THREE.Clock();
const tick = (timestamp) => {
    const elapsedTime = clock.getElapsedTime();

    meshes.forEach((mesh) => {
        mesh.rotation.y = 0.1 * elapsedTime;
        mesh.rotation.x = -0.15 * elapsedTime;
    });

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