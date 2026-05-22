import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const gui = new GUI({
    title: 'debug',
    width: 370,
    closeFolders: true
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
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

const canvas = document.querySelector('canvas.webgl');

const textureLoader = new THREE.TextureLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(4, 2, 4);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const bakedTexture = textureLoader.load('baked.jpg');
bakedTexture.flipY = false;
bakedTexture.colorSpace = THREE.SRGBColorSpace;

const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

gltfLoader.load(
    'portal.glb',
    (gltf) => {
        const bakedMesh = gltf.scene.children.find(child => child.name === 'baked');
        const poleLightAMesh = gltf.scene.children.find(child => child.name === 'poleLightA');
        const poleLightBMesh = gltf.scene.children.find(child => child.name === 'poleLightB');
        const portalLightMesh = gltf.scene.children.find(child => child.name === 'portalLight');
        
        bakedMesh.material = bakedMaterial;
        poleLightAMesh.material = poleLightMaterial;
        poleLightBMesh.material = poleLightMaterial;
        portalLightMesh.material = portalLightMaterial;

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