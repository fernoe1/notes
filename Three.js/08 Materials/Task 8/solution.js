import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
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

const canvas = document.querySelector('canvas');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

const textureLoader = new THREE.TextureLoader();
const thirdGradientTexture = textureLoader.load('/textures/gradients/3.jpg');
const fifthGradientTexture = textureLoader.load('/textures/gradients/5.jpg');

thirdGradientTexture.magFilter = THREE.NearestFilter;
thirdGradientTexture.minFilter = THREE.NearestFilter;
thirdGradientTexture.generateMipmaps = false;

fifthGradientTexture.magFilter = THREE.NearestFilter;
fifthGradientTexture.minFilter = THREE.NearestFilter;
fifthGradientTexture.generateMipmaps = false;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const toonMaterial = new THREE.MeshToonMaterial();

const meshes = [
    new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        toonMaterial
    ),
    new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        toonMaterial
    ),
    new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.2, 16, 32),
        toonMaterial
    )
];

scene.add(...meshes);
meshes[0].position.x = -1.5;
meshes[2].position.x = 1.5;

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const threeMeshTweaks = gui.addFolder('three mesh');

threeMeshTweaks
    .add(toonMaterial, 'side', {
        front: THREE.FrontSide,
        back: THREE.BackSide,
        double: THREE.DoubleSide
    });

threeMeshTweaks
    .add(toonMaterial, 'gradientMap', {
        none: null,
        three: thirdGradientTexture,
        five: fifthGradientTexture
    })
    .onChange(() => toonMaterial.needsUpdate = true);


const timer = new THREE.Timer();
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