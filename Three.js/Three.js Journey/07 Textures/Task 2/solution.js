import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', (event) => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(sizes.width, sizes.height);
});

const textureLoader = new THREE.TextureLoader();
const cubeTexture = textureLoader.load('/textures/door/color.jpg',
    () => {
        console.log('cube texture loaded');
    },
    () => {
        console.log('cube texture started loading'); // doesn't fire anymore
    },
    () => {
        console.log('error occured when loading cube texture');
    }
);

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(Math.min (2, window.devicePixelRatio));
renderer.setSize(sizes.width, sizes.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ map: cubeTexture })
);
scene.add(cube);

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
    outline: hidden;
}
*/