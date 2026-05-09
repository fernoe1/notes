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

const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


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

        updateAllMaterials();
    }
);

const textureLoader = new THREE.TextureLoader();

const wallAORoughessMetalnessTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg');
const wallColorTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg');
wallColorTexture.colorSpace = THREE.SRGBColorSpace;
const wallNormalTexture = textureLoader.load('/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png');

const floorAORoughnessMetalnessTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg');
const floorColorTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg');
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
const floorNormalTexture = textureLoader.load('/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png');



const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshStandardMaterial({
        map: floorColorTexture,
        normalMap: floorNormalTexture,
        aoMap: floorAORoughnessMetalnessTexture,
        roughnessMap: floorAORoughnessMetalnessTexture,
        metalnessMap: floorAORoughnessMetalnessTexture
    })
);
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        normalMap: wallNormalTexture,
        aoMap: wallAORoughessMetalnessTexture,
        roughnessMap: wallAORoughessMetalnessTexture,
        metalnessMap: wallAORoughessMetalnessTexture
    })
);
wall.position.set(0, 4, -4);
scene.add(wall);

const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(512, 512);
directionalLight.shadow.camera.far = 15;
directionalLight.position.set(-4, 6.5, 2.5);
scene.add(directionalLight);

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalLightCameraHelper);

directionalLight.target.position.set(0, 4, 0);
directionalLight.target.updateWorldMatrix();

directionalLightCameraHelper.visible = false;
gui
    .add(directionalLightCameraHelper, 'visible')
    .name('cameraHelper');

const updateAllMaterials = () => {
    scene.traverse(
        (child) => {
            if (child.isMesh && child.material.isMeshStandardMaterial) {
                child.material.envMapIntensity = global.envMapIntensity;

                child.castShadow = true;
                child.receiveShadow = true;
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

gui
    .add(directionalLight, 'intensity')
    .min(0)
    .max(10)
    .step(0.001)
    .name('lightIntensity');

gui
    .add(directionalLight.position, 'x')
    .min(-10)
    .max(10)
    .step(0.001)
    .name('lightX');

gui
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.001)
    .name('lightY');

gui
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.001)
    .name('lightZ');

gui
    .add(directionalLight, 'castShadow');

const tick = () => {
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();