import * as THREE from 'three';
import { OrbitControls, GLTFLoader} from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    width: 370,
    closeFolders: true
});
const debugObject = {};

addEventListener('keypress', (e) => {
    if (e.key === 'h') gui.show(gui._hidden);
});

const canvas = document.querySelector('canvas.webgl');

const gltfLoader = new GLTFLoader();

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

const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([
    '/environmentMaps/0/px.png',
    '/environmentMaps/0/nx.png',
    '/environmentMaps/0/py.png',
    '/environmentMaps/0/ny.png',
    '/environmentMaps/0/pz.png',
    '/environmentMaps/0/nz.png'
]);

scene.background = environmentMap;
scene.environment = environmentMap;

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(4, 5, 4);

const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({ roughness: 0.3, metalness: 1, color: 0xaaaaaa })
);
torusKnot.position.x = -4;
torusKnot.position.y = 4;
scene.add(torusKnot);

gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', 
    (gltf) => {
        gltf.scene.scale.set(10, 10, 10);
        scene.add(gltf.scene);
    }
);

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

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