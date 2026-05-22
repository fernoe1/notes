import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    closeFolders: true,
    width: 370
});
const parameters = {};

addEventListener('keypress', (event) => {
    if (event.key === 'h') gui.show(gui._hidden);
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
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

parameters.count = 100000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.2;
parameters.randomnessPower = 3;
parameters.insideColor = '#ff6030';
parameters.outsideColor = '#1b3984';

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
    if (points !== null) {
        geometry.dispose();
        material.dispose();
        scene.remove(points);
    }

    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const insideColor = new THREE.Color(parameters.insideColor);
    const outsideColor = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3;

        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const angle = (i % parameters.branches) / parameters.branches * 2 * Math.PI;

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness * radius;
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() > 0.5 ? 1 : -1) * parameters.randomness * radius;

        positions[i3    ] = Math.sin(angle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.cos(angle + spinAngle) * radius + randomZ;
        
        const mixedColor = insideColor.clone();
        mixedColor.lerp(outsideColor, radius / parameters.radius);

        colors[i3    ] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);
};

generateGalaxy();

gui
    .add(parameters, 'count')
    .min(100)
    .max(1000000)
    .step(100)
    .onFinishChange(() => generateGalaxy());

gui
    .add(parameters, 'size')
    .min(0.001)
    .max(0.1)
    .step(0.001)
    .onFinishChange(() => generateGalaxy());

gui
    .add(parameters, 'radius')
    .min(0.01)
    .max(20)
    .step(0.01)
    .onFinishChange(() => generateGalaxy());

gui
    .add(parameters, 'branches')
    .min(2)
    .max(20)
    .step(1)
    .onFinishChange(() => generateGalaxy());

gui
    .add(parameters, 'spin')
    .min(-5)
    .max(5)
    .step(0.001)
    .onFinishChange(() => generateGalaxy());

gui
    .add(parameters, 'randomness')
    .min(0)
    .max(2)
    .step(0.001)
    .onFinishChange(() => generateGalaxy());

gui
    .add(parameters, 'randomnessPower')
    .min(1)
    .max(10)
    .step(0.001)
    .onFinishChange(() => generateGalaxy());

gui
    .addColor(parameters, 'insideColor')
    .onFinishChange(() => generateGalaxy());

gui
    .addColor(parameters, 'outsideColor')
    .onFinishChange(() => generateGalaxy());

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