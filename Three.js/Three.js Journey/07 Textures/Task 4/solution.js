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
    console.log('loading started');
};
loadingManager.onProgress = () => {
    console.log('loading in progress');
};
loadingManager.onLoad = () => {
    console.log('loading finished');
};
loadingManager.onError = () => {
    console.log('loading error occurred');
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const checkerboard1024x1024Texture = textureLoader.load('/textures/checkerboard-1024x1024.png');
checkerboard1024x1024Texture.magFilter = THREE.NearestFilter;
checkerboard1024x1024Texture.minFilter = THREE.NearestFilter;

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

/**
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