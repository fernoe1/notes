import * as THREE from 'three';
import { OrbitControls, HDRLoader } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    closeFolders: true
});
const debugObject = {};

window.addEventListener('keypress', (event) => {
    if (event.key === 'h') gui.show(gui._hidden);
});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const timer = new THREE.Timer();

const tick = (timestamp) => {
    timer.update(timestamp);

    const elapsedTime = timer.getElapsed();

    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = -0.15 * elapsedTime;
    plane.rotation.x = -0.15 * elapsedTime;
    torus.rotation.x = -0.15 * elapsedTime;

    controls.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

const texloader = new THREE.TextureLoader();

const alphaTexture = texloader.load('/textures/door/alpha.jpg');
const ambientOcclusionTexture = texloader.load('/textures/door/ambientOcclusion.jpg');
const colorTexture = texloader.load('/textures/door/color.jpg');
const heightTexture = texloader.load('/textures/door/height.jpg');
const metalnessTexture = texloader.load('/textures/door/metalness.jpg');
const normalTexture = texloader.load('/textures/door/normal.jpg');
const roughnessTexture = texloader.load('/textures/door/roughness.jpg');

const hdrLoader = new HDRLoader();
hdrLoader.load('/textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
});

const material = new THREE.MeshBasicMaterial();

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 32),
    material
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

const threeMeshesTweaks = gui.addFolder('three meshes');

debugObject.map = null;
threeMeshesTweaks
    .add(debugObject, 'map', {
        none: null,
        color: colorTexture,
        ambient: ambientOcclusionTexture,
        height: heightTexture,
        metalness: metalnessTexture,
        normal: normalTexture,
        roughness: roughnessTexture
    })
    .onChange((value) => {
        material.map = value;
        material.needsUpdate = true;
    });

debugObject.color = '#ff0000';
threeMeshesTweaks
    .addColor(debugObject, 'color')
    .onChange((value) => {
        material.color.set(value);
    });

debugObject.alphaMap = null;
threeMeshesTweaks
    .add(debugObject, 'alphaMap', {
        none: null,
        alpha: alphaTexture
    })
    .onChange((value) => {
        material.alphaMap = value;
        material.needsUpdate = true;
    });

threeMeshesTweaks
    .add(material, 'transparent')
    .onChange(() => material.needsUpdate = true);

threeMeshesTweaks
    .add(material, 'side', {
        front: THREE.FrontSide,
        back: THREE.BackSide,
        double: THREE.DoubleSide
    });

threeMeshesTweaks
    .add(material, 'wireframe');

threeMeshesTweaks
    .add(material, 'opacity')
    .min(0)
    .max(1)
    .step(0.01);

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