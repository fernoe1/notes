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
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const standardMaterial = new THREE.MeshStandardMaterial({ displacementScale: 0.05, side: THREE.DoubleSide });

const textureLoader = new THREE.TextureLoader();
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const colorTexture = textureLoader.load('/textures/door/color.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const meshes = [
    new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        standardMaterial
    ),
    new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, 16, 16),
        standardMaterial
    ),
    new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.2, 16, 32),
        standardMaterial
    )
];
meshes[0].position.x = -1.5,
meshes[2].position.x = 1.5;
scene.add(...meshes);

const threeMeshTweaks = gui.addFolder('three mesh');

threeMeshTweaks
    .add(standardMaterial, 'side', {
        front: THREE.FrontSide,
        back: THREE.BackSide,
        double: THREE.DoubleSide
    });

threeMeshTweaks
    .add(standardMaterial, 'map', {
        none: null,
        color: colorTexture
    })
    .onChange(() => standardMaterial.needsUpdate = true);

threeMeshTweaks
    .add(standardMaterial, 'aoMap', {
        none: null,
        ao: ambientOcclusionTexture
    })
    .onChange(() => standardMaterial.needsUpdate = true);

threeMeshTweaks
    .add(standardMaterial, 'aoMapIntensity')
    .min(0)
    .max(1)
    .step(0.01);

threeMeshTweaks
    .add(standardMaterial, 'displacementMap', {
        none: null,
        height: heightTexture
    })
    .onChange(() => standardMaterial.needsUpdate = true);

threeMeshTweaks
    .add(standardMaterial, 'displacementScale')
    .min(0)
    .max(1)
    .step(0.01);

threeMeshTweaks
    .add(standardMaterial, 'metalnessMap', {
        none: null,
        metalness: metalnessTexture
    })
    .onChange(() => standardMaterial.needsUpdate = true);

threeMeshTweaks
    .add(standardMaterial, 'metalness')
    .min(0)
    .max(1)
    .step(0.01);

threeMeshTweaks
    .add(standardMaterial, 'roughnessMap', {
        none: null,
        roughness: roughnessTexture
    })
    .onChange(() => standardMaterial.needsUpdate = true);

threeMeshTweaks
    .add(standardMaterial, 'roughness')
    .min(0)
    .max(1)
    .step(0.01);

threeMeshTweaks
    .add(standardMaterial, 'normalMap', {
        none: null,
        normal: normalTexture
    })
    .onChange(() => standardMaterial.needsUpdate = true);

threeMeshTweaks
    .add(standardMaterial.normalScale, 'x')
    .min(0)
    .max(1)
    .step(0.01)
    .name('normal x');

threeMeshTweaks
    .add(standardMaterial.normalScale, 'y')
    .min(0)
    .max(1)
    .step(0.01)
    .name('normal y');

threeMeshTweaks
    .add(standardMaterial, 'alphaMap', {
        none: null,
        alpha: alphaTexture
    })
    .onChange(() => standardMaterial.needsUpdate = true);

threeMeshTweaks
    .add(standardMaterial, 'transparent');



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