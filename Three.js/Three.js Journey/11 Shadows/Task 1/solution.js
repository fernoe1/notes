import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    closeFolders: true
});

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

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const material = new THREE.MeshStandardMaterial();

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
);
sphere.castShadow = true;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, plane);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);

scene.add(ambientLight, directionalLight, directionalLightCameraHelper);

gui
    .add(ambientLight, 'intensity')
    .min(0)
    .max(3)
    .step(0.01)
    .name('ambient intensity');

gui
    .add(directionalLight, 'intensity')
    .min(0)
    .max(3)
    .step(0.01)
    .name('directional intensity');

gui
    .add(directionalLightCameraHelper, 'visible');

gui
    .add(directionalLight.shadow.camera, 'top')
    .min(-5)
    .max(5)
    .step(0.01)
    .onChange(() => {
        directionalLight.shadow.camera.updateProjectionMatrix();
        directionalLightCameraHelper.update();
    });

gui
    .add(directionalLight.shadow.camera, 'right')
    .min(-5)
    .max(5)
    .step(0.01)
    .onChange(() => {
        directionalLight.shadow.camera.updateProjectionMatrix();
        directionalLightCameraHelper.update();
    });

gui
    .add(directionalLight.shadow.camera, 'bottom')
    .min(-5)
    .max(5)
    .step(0.01)
    .onChange(() => {
        directionalLight.shadow.camera.updateProjectionMatrix();
        directionalLightCameraHelper.update();
    });

gui
    .add(directionalLight.shadow.camera, 'left')
    .min(-5)
    .max(5)
    .step(0.01)
    .onChange(() => {
        directionalLight.shadow.camera.updateProjectionMatrix();
        directionalLightCameraHelper.update();
    });

gui
    .add(directionalLight.shadow.camera, 'near')
    .min(0.1)
    .max(5)
    .step(0.01)
    .onChange(() => {
        directionalLight.shadow.camera.updateProjectionMatrix();
        directionalLightCameraHelper.update();
    });

gui
    .add(directionalLight.shadow.camera, 'far')
    .min(5)
    .max(50)
    .step(0.01)
    .onChange(() => {
        directionalLight.shadow.camera.updateProjectionMatrix();
        directionalLightCameraHelper.update();
    });

gui
    .add(directionalLight.position, 'x')
    .min(-5)
    .max(5)
    .step(0.01)
    .onChange(() => directionalLight.lookAt(sphere.position));

gui
    .add(directionalLight.position, 'y')
    .min(-5)
    .max(5)
    .step(0.01)
    .onChange(() => directionalLight.lookAt(sphere.position));

gui
    .add(directionalLight.position, 'z')
    .min(-5)
    .max(5)
    .step(0.01)
    .onChange(() => directionalLight.lookAt(sphere.position));

gui
    .add(material, 'metalness')
    .min(0)
    .max(1)
    .step(0.01);

gui
    .add(material, 'roughness')
    .min(0)
    .max(1)
    .step(0.01);

const tick = () => {
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