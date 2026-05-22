import * as THREE from 'three';
import { OrbitControls, GLTFLoader } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    width: 370,
    closeFolders: true
});

addEventListener('keypress', (event) => {
    if (event.key === 'h') gui.show(gui._hidden);
});

const canvas = document.querySelector('canvas.webgl');

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

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(2, 2, 2);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.shadow.camera.left = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.4
    })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const gltfLoader = new GLTFLoader();
gltfLoader.load('/models/Duck/glTF/Duck.gltf', 
    (gltf) => {
        scene.add(gltf.scene.children[0]);
    });

const clock = new THREE.Clock();
let previousTime = 0;
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

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