import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import gsap from 'gsap';

const gui = new GUI({
    title: 'debug',
    closeFolders: true
});
const debugObject = {};

window.addEventListener('keypress', (event) => {
    if (event.key == 'h') gui.show(gui._hidden);
});

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', (event) => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(sizes.width, sizes.height);
})

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

const cubeTweaks = gui.addFolder('cube');
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(cube);

cubeTweaks
    .add(cube, 'visible');

cubeTweaks
    .add(cube.material, 'wireframe');

debugObject.subdivision = 1;
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange((value) => {
        cube.geometry.dispose();
        cube.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            value, value, value
        );
    });

cubeTweaks
    .add(cube.position, 'x')
    .min(-3)
    .max(3)
    .step(0.1)
    .name('position x');

cubeTweaks
    .add(cube.position, 'y')
    .min(-3)
    .max(3)
    .step(0.1)
    .name('position y');

cubeTweaks
    .add(cube.position, 'z')
    .min(-3)
    .max(3)
    .step(0.1)
    .name('position z');

debugObject.rotation = {
    x: 0,
    y: 0,
    z: 0
};
cubeTweaks
    .add(debugObject.rotation, 'x')
    .min(0)
    .max(360)
    .step(1)
    .onChange(() => {
        cube.rotation.x = THREE.MathUtils.degToRad(debugObject.rotation.x);
    })
    .name('rotation x');
cubeTweaks
    .add(debugObject.rotation, 'y')
    .min(0)
    .max(360)
    .step(1)
    .onChange(() => {
        cube.rotation.y = THREE.MathUtils.degToRad(debugObject.rotation.y);
    })
    .name('rotation y');
cubeTweaks
    .add(debugObject.rotation, 'z')
    .min(0)
    .max(360)
    .step(1)
    .onChange(() => {
        cube.rotation.z = THREE.MathUtils.degToRad(debugObject.rotation.z);
    })
    .name('rotation z');

debugObject.spinX = () => {
    gsap.to(cube.rotation, { duration: 1.5, x: cube.rotation.x + 2 * Math.PI });
};
cubeTweaks
    .add(debugObject, 'spinX')
    .name('spin x');
debugObject.spinY = () => {
    gsap.to(cube.rotation, { duration: 1.5, y: cube.rotation.y + 2 * Math.PI });
};
cubeTweaks
    .add(debugObject, 'spinY')
    .name('spin y');
debugObject.spinZ = () => {
    gsap.to(cube.rotation, { duration: 1.5, z: cube.rotation.z + 2 * Math.PI });
};
cubeTweaks
    .add(debugObject, 'spinZ')
    .name('spin z');

debugObject.color = 0xff0000;
cubeTweaks
    .addColor(debugObject, 'color')
    .onChange(() => {
        cube.material.color.set(debugObject.color);
    });

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const tick = () => {
    controls.update();
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

renderer.render(scene, camera);

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