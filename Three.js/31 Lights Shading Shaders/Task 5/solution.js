import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import shadingVertexShader from './shaders/shading/vertex.glsl'
import shadingFragmentShader from './shaders/shading/fragment.glsl'

const gui = new GUI({
    title: 'debug',
    closeFolders: true,
    width: 370
});

addEventListener('keypress', (e) => {
    if (e.key == 'h') gui.show(gui._hidden)
});

const gltfLoader = new GLTFLoader();

const canvas = document.querySelector('canvas.webgl');

const sizes = {
    width: innerWidth,
    height: innerHeight
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
camera.position.set(7, 7, 7);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const materialParameters = {};
materialParameters.color = '#ffffff';

const material = new THREE.ShaderMaterial({
    vertexShader: shadingVertexShader,
    fragmentShader: shadingFragmentShader,
    uniforms: {
        uColor: new THREE.Uniform(new THREE.Color(materialParameters.color)),
    }
});

gui
    .addColor(materialParameters, 'color')
    .onChange(() => material.uniforms.uColor.value.set(materialParameters.color));

const torusKnot = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.25, 128, 32),
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
gltfLoader.load('./suzanne.glb',
    (gltf) => {
        suzanne = gltf.scene;
        suzanne.traverse(
            (child) => {
                if (child.isMesh) {
                    child.material = material
                }
            }
        )
        scene.add(suzanne);
    }
);

const directionalLightHelper = new THREE.Mesh(
    new THREE.PlaneGeometry,
    new THREE.MeshBasicMaterial
);
directionalLightHelper.material.color.setRGB(0.1, 0.1, 1.0);
directionalLightHelper.material.side = THREE.DoubleSide;
directionalLightHelper.position.set(0, 0, 3);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1, 2),
    new THREE.MeshBasicMaterial
);
pointLightHelper.material.color.setRGB(1, 0.1, 0.1);
pointLightHelper.position.set(0, 2.5, 0);
scene.add(pointLightHelper);

const pointLightHelper2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1, 2),
    new THREE.MeshBasicMaterial
);
pointLightHelper2.material.color.setRGB(0.1, 1.0, 0.5);
pointLightHelper2.position.set(2, 2, 2);
scene.add(pointLightHelper2);

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    if(suzanne) {
        suzanne.rotation.x = - elapsedTime * 0.1;
        suzanne.rotation.y = elapsedTime * 0.2;
    }

    sphere.rotation.x = - elapsedTime * 0.1;
    sphere.rotation.y = elapsedTime * 0.2;

    torusKnot.rotation.x = - elapsedTime * 0.1;
    torusKnot.rotation.y = elapsedTime * 0.2;

    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();
