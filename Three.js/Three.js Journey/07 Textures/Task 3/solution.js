import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

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

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log('loading manager started');
};
loadingManager.onProgress = () => {
    console.log('loading manager progressing');
};
loadingManager.onLoad = () => {
    console.log('loading manager finished');
};
loadingManager.onError = () => {
    console.log('error occurred while loading');
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const colorTexture = textureLoader.load('/textures/door/color.jpg');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const checkerboard8x8Texture = textureLoader.load('/textures/checkerboard-8x8.png');
const checkerboard1024x1024Texture = textureLoader.load('/textures/checkerboard-1024x1024.png');
const minecraftTexture = textureLoader.load('/textures/minecraft.png');

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

const tick = () => {
    controls.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ map: checkerboard1024x1024Texture })
);
scene.add(cube);

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
    outline: hidden;
}
*/