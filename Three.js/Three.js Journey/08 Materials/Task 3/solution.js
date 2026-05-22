import * as THREE from 'three';
import { OrbitControls, HDRLoader } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    closeFolders: true
});
const debugObject = {};

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

const hdrLoader = new HDRLoader();
hdrLoader.load('/textures/environmentMap/2k.hdr', (envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = envMap;
    scene.environment = envMap;
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const normalMaterial = new THREE.MeshNormalMaterial();

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    normalMaterial
);
scene.add(sphere);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    normalMaterial
);
scene.add(plane);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    normalMaterial
);
scene.add(torus);
torus.position.x = 1.5;

const threeMeshTweaks = gui.addFolder('three mesh');

threeMeshTweaks
    .add(normalMaterial, 'side', {
        front: THREE.FrontSide,
        back: THREE.BackSide,
        double: THREE.DoubleSide
    })
    .onChange(() => normalMaterial.needsUpdate = true);

threeMeshTweaks
    .add(normalMaterial, 'flatShading')
    .onChange(() => normalMaterial.needsUpdate = true);

const timer = new THREE.Timer();

const meshes = [sphere, plane, torus];

const tick = (timestamp) => {
    timer.update(timestamp);
    const elapsedTime = timer.getElapsed();

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