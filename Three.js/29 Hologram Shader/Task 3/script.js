import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import holographicVertexShader from './shaders/holographic/vertex.glsl';
import holographicFragmentShader from './shaders/holographic/fragment.glsl';

const gui = new GUI({
    title: 'debug',
    width: 370,
    closeFolders: true
});

addEventListener('keypress', (e) => {
    if (e.key === 'h') gui.show(gui._hidden);
});

const gltfLoader = new GLTFLoader();

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
camera.position.set(7, 7, 7);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const rendererParameters = {};
rendererParameters.clearColor = '#1d1f2a';

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setClearColor(rendererParameters.clearColor);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

gui
    .addColor(rendererParameters, 'clearColor')
    .onChange(() => renderer.setClearColor(rendererParameters.clearColor));

const materialParameters = {};
materialParameters.color = '#70c1ff';
const material = new THREE.ShaderMaterial({
    vertexShader: holographicVertexShader,
    fragmentShader: holographicFragmentShader,
    uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(materialParameters.color))
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});

gui
    .addColor(materialParameters, 'color')
    .onChange(() => material.uniforms.uColor.value.set(materialParameters.color));

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.6, 0.25, 128, 32),
    material
);
torusKnot.position.x = 3;
scene.add(torusKnot);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    material
);
sphere.position.x = -3;
scene.add(sphere);

let suzanne = null;
gltfLoader.load(
    './suzanne.glb',
    (gltf) => {
        suzanne = gltf.scene;
        suzanne.traverse((child) => {
            if (child.isMesh) child.material = material;
        });
        scene.add(suzanne);
    }
)

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    material.uniforms.uTime.value = elapsedTime;

    if (suzanne) {
        suzanne.rotation.x = -elapsedTime * 0.1;
        suzanne.rotation.y = elapsedTime * 0.2;
    }

    sphere.rotation.x = -elapsedTime * 0.1;
    sphere.rotation.y = elapsedTime * 0.2;

    torusKnot.rotation.x = -elapsedTime * 0.1;
    torusKnot.rotation.y = elapsedTime * 0.2;

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();
