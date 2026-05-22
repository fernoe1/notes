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

const textureLoader = new THREE.TextureLoader();

const matcapOne = textureLoader.load('/textures/matcaps/1.png');
const matcapTwo = textureLoader.load('/textures/matcaps/2.png');
const matcapThree = textureLoader.load('/textures/matcaps/3.png');
const matcapFour = textureLoader.load('/textures/matcaps/4.png');
const matcapFive = textureLoader.load('/textures/matcaps/5.png');
const matcapSix = textureLoader.load('/textures/matcaps/6.png');
const matcapSeven = textureLoader.load('/textures/matcaps/7.png');
const matcapEight = textureLoader.load('/textures/matcaps/8.png');

const matcapMaterial = new THREE.MeshMatcapMaterial();

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    matcapMaterial
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    matcapMaterial
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    matcapMaterial
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

const threeMeshTweaks = gui.addFolder('three mesh');

threeMeshTweaks
    .add(matcapMaterial, 'side', {
        front: THREE.FrontSide,
        back: THREE.BackSide,
        double: THREE.DoubleSide
    })
    .onChange((value) => {
        matcapMaterial.side = value;
    });

threeMeshTweaks
    .add(matcapMaterial, 'matcap', {
        none: null,
        one: matcapOne,
        two: matcapTwo,
        three: matcapThree,
        four: matcapFour,
        five: matcapFive,
        six: matcapSix,
        seven: matcapSeven,
        eight: matcapEight
    })
    .onChange((value) => {
        matcapMaterial.matcap = value;
        matcapMaterial.needsUpdate = true;
    });

const timer = new THREE.Timer();

const meshes = [sphere, plane, torus]

const tick = (timestamp) => {
    timer.update(timestamp);
    controls.update();
    renderer.render(scene, camera);

    const elapsedTime = timer.getElapsed();

    meshes.forEach((mesh) => {
        mesh.rotation.y = 0.1 * elapsedTime;
        mesh.rotation.x = -0.15 * elapsedTime;
    })

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