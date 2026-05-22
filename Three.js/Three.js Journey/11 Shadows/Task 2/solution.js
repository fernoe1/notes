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

const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);

scene.add(ambientLight, spotLight, spotLight.target, spotLightCameraHelper);

gui
    .add(ambientLight, 'intensity')
    .min(0)
    .max(3)
    .step(0.01)
    .name('ambient intensity');

gui
    .add(spotLight, 'intensity')
    .min(0)
    .max(3)
    .step(0.01)
    .name('spotlight intensity');

gui
    .add(spotLight, 'distance')
    .min(0)
    .max(10)
    .step(0.01);

gui
    .add(spotLight, 'angle')
    .min(0)
    .max(Math.PI / 2)
    .step(0.01)
    .onChange(() => {
        spotLight.shadow.camera.updateProjectionMatrix();
        spotLightCameraHelper.update();
    });

gui
    .add(spotLightCameraHelper, 'visible');

gui
    .add(spotLight.shadow.camera, 'near')
    .min(0.1)
    .max(5)
    .step(0.01)
    .onChange(() => {
        spotLight.shadow.camera.updateProjectionMatrix();
        spotLightCameraHelper.update();
    });

gui
    .add(spotLight.shadow.camera, 'far')
    .min(0.01)
    .max(5)
    .step(0.01)
    .onChange(() => {
        spotLight.shadow.camera.updateProjectionMatrix();
        spotLightCameraHelper.update();
    });

gui
    .add(spotLight, 'decay')
    .min(0)
    .max(10)
    .step(0.01);

gui
    .add(spotLight.position, 'x')
    .min(-5)
    .max(5)
    .step(0.01);

gui
    .add(spotLight.position, 'y')
    .min(-5)
    .max(5)
    .step(0.01);

gui
    .add(spotLight.position, 'z')
    .min(-5)
    .max(5)
    .step(0.01);

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