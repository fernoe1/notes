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
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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

const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);

scene.add(ambientLight, pointLight, pointLight.target, pointLightCameraHelper);

gui
    .add(ambientLight, 'intensity')
    .min(0)
    .max(3)
    .step(0.01)
    .name('ambient intensity');

gui
    .add(pointLight, 'intensity')
    .min(0)
    .max(3)
    .step(0.01)
    .name('point intensity');

gui
    .add(pointLight, 'distance')
    .min(0)
    .max(10)
    .step(0.01);

gui
    .add(pointLight, 'decay')
    .min(0)
    .max(10)
    .step(0.01);

gui
    .add(pointLight.position, 'x')
    .min(-5)
    .max(5)
    .step(0.1);

gui
    .add(pointLight.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1);

gui
    .add(pointLight.position, 'z')
    .min(-5)
    .max(5)
    .step(0.1);

gui
    .add(pointLight.shadow.camera, 'near')
    .min(0.1)
    .max(5)
    .step(0.01)
    .onChange(() => {
        pointLight.shadow.camera.updateProjectionMatrix();
        pointLightCameraHelper.update();
    });

gui
    .add(pointLight.shadow.camera, 'far')
    .min(5)
    .max(100)
    .step(0.01)
    .onChange(() => {
        pointLight.shadow.camera.updateProjectionMatrix();
        pointLightCameraHelper.update();
    });

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