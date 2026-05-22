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
renderer.shadowMap.enabled = false;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const material = new THREE.MeshStandardMaterial();

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
);

const textureLoader = new THREE.TextureLoader();
const bakedShadowTexture = textureLoader.load('/textures/bakedShadow.jpg');

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshBasicMaterial({
        map: bakedShadowTexture
    })
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, plane);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
directionalLight.position.set(2, 3, 2)

scene.add(ambientLight, directionalLight, directionalLightHelper);

const tick = () => {
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