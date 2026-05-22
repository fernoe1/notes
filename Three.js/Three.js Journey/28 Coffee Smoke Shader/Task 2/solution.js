import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import coffeSmokeVertexShader from './shaders/coffeSmoke/vertex.glsl';
import coffeSmokeFragmentShader from './shaders/coffeSmoke/fragment.glsl';

const gui = new GUI({
    title: 'debug',
    width: 370,
    closeFolders: true
});
const debugObject = {};

const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

addEventListener('keypress', (e) => {
    if (e.key === 'h') gui.show(gui._hidden);
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
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
camera.position.set(8, 10, 12);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.target.y = 3;
controls.enableDamping = true;

gltfLoader.load(
    './bakedModel.glb',
    (gltf) => {
        gltf.scene.getObjectByName('baked').material.map.anisotropy = 8;
        scene.add(gltf.scene);
    }
);

const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
smokeGeometry.translate(0, 0.5, 0);
smokeGeometry.scale(1.5, 6, 1.5);

const perlinTexture = textureLoader.load('./perlin.png');
perlinTexture.wrapS = THREE.RepeatWrapping;
perlinTexture.wrapT = THREE.RepeatWrapping;

const smokeMaterial = new THREE.ShaderMaterial({
    vertexShader: coffeSmokeVertexShader,
    fragmentShader: coffeSmokeFragmentShader,
    uniforms: {
        uTime: new THREE.Uniform(0),
        uPerlinTexture: new THREE.Uniform(perlinTexture)
    },
    side: THREE.DoubleSide,
    transparent: true,
    // wireframe: true
});

const smoke = new THREE.Mesh(
    smokeGeometry,
    smokeMaterial
);
smoke.position.y = 1.83;
scene.add(smoke);

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    smokeMaterial.uniforms.uTime.value = elapsedTime;

    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();