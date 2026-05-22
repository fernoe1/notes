import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import firefliesVertexShader from './shader/fireflies/vertex.glsl';
import firefliesFragmentShader from './shader/fireflies/fragment.glsl';

const debugObject = {};
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

    firefliesMaterial.uniforms.uPixelRatio.value = Math.min(devicePixelRatio, 2);
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

debugObject.clearColor = '#201919';
renderer.setClearColor(debugObject.clearColor);
gui
    .addColor(debugObject, 'clearColor')
    .onChange(() => renderer.setClearColor(debugObject.clearColor));

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

const firefliesGeometry = new THREE.BufferGeometry();
const firefliesCount = 30;
const positionArray = new Float32Array(firefliesCount * 3);
const scaleArray = new Float32Array(firefliesCount);

for (let i = 0; i < firefliesCount; i++) {
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
    positionArray[i * 3 + 1] = Math.random() * 1.5;
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;

    scaleArray[i] = Math.random();
}

firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));

const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(devicePixelRatio, 2) },
        uSize: { value: 100 }
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

gui
    .add(firefliesMaterial.uniforms.uSize, 'value')
    .min(0)
    .max(500)
    .step(1)
    .name('firefliesSize')

const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);
scene.add(fireflies);

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    firefliesMaterial.uniforms.uTime.value = elapsedTime;

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();