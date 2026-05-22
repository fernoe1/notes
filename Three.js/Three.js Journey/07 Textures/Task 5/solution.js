import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
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
    console.log('loading manager error occurred');
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const colorTexture = textureLoader.load('/textures/door/color.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const checkerboard8x8Texture = textureLoader.load('/textures/checkerboard-8x8.png');
const checkberboard1024x1024Texture = textureLoader.load('/textures/checkerboard-1024x1024.png');
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

const cubeTweaks = gui.addFolder('cube');
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ map: colorTexture })
);
scene.add(cube);

debugObject.texture = colorTexture;
debugObject.minFilter = THREE.LinearMipmapLinearFilter;
debugObject.magFilter = THREE.LinearFilter;
cubeTweaks
    .add(debugObject, 'texture', {
        alpha: alphaTexture,
        ambientOcclusion: ambientOcclusionTexture,
        color: colorTexture,
        height: heightTexture,
        metalness: metalnessTexture,
        normal: normalTexture,
        roughness: roughnessTexture,
        checkerboard8x8: checkerboard8x8Texture,
        checkberboard1024x1024: checkberboard1024x1024Texture,
        minecraft: minecraftTexture
    })
    .onChange((value) => {
        cube.material.map = value;
        cube.material.map.minFilter = debugObject.minFilter;
        cube.material.map.magFilter = debugObject.magFilter;
        cube.material.map.needsUpdate = true;
        cube.material.needsUpdate = true;
    });

cubeTweaks
    .add(debugObject, 'minFilter', {
        linear: THREE.LinearMipmapLinearFilter,
        near: THREE.NearestFilter
    })
    .onChange((value) => {
        cube.material.map.minFilter = value;
        cube.material.map.needsUpdate = true;
    });

cubeTweaks
    .add(debugObject, 'magFilter', {
        linear: THREE.LinearFilter,
        near: THREE.NearestFilter
    })
    .onChange((value) => {
        cube.material.map.magFilter = value;
        cube.material.map.needsUpdate = true;
    });

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