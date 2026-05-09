import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const gui = new GUI({
    title: 'debug',
    width: 370,
    closeFolders: true
});
const global = {};

addEventListener('keypress', (e) => {
    if (e.key === 'h') gui.show(gui._hidden);
});

const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

const canvas = document.querySelector('canvas');

const sizes = {
    width: innerWidth,
    height: innerHeight
};

addEventListener('resize', () => {
    sizes.width = innerWidth;
    sizes.height = innerHeight;

    camera.aspect =sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(4, 5, 4);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;

const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

rgbeLoader.load('/environmentMaps/0/2k.hdr',
    (envMap) => {
        envMap.mapping = THREE.EquirectangularReflectionMapping;

        scene.background = envMap;
        scene.environment = envMap;
    }
);

gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {
        gltf.scene.scale.set(10, 10, 10);
        scene.add(gltf.scene);
    }
);

const updateAllMaterials = () => {
    scene.traverse(
        (child) => {
            if (child.isMesh && child.material.isMeshStandardMaterial) {
                child.material.envMapIntensity = global.envMapIntensity;
            }
        }
    )
};

global.envMapIntensity = 1;
gui
    .add(global, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials);

gui
    .add(renderer, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping
    });

gui
    .add(renderer, 'toneMappingExposure')
    .min(0)
    .max(10)
    .step(0.001);

const tick = () => {
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();