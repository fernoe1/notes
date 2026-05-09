import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import fireworkVertexShader from './shaders/firework/vertex.glsl';
import fireworkFragmentShader from './shaders/firework/fragment.glsl';

const gui = new GUI({
    title: 'debug',
    width: 370,
    closeFolders: true
});

const textureLoader = new THREE.TextureLoader();

addEventListener('keypress', (e) => {
    if (e.key === 'h') gui.show(gui._hidden);
});

const canvas = document.querySelector('canvas.webgl');

const sizes = {
    width: innerWidth,
    height: innerHeight,
    pixelRatio: Math.min(devicePixelRatio, 2)
};
sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

addEventListener('resize', () => {
    sizes.width = innerWidth;
    sizes.height = innerHeight;
    sizes.pixelRatio = Math.min(devicePixelRatio, 2);
    sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(sizes.pixelRatio);
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1.5, 0, 6);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(sizes.pixelRatio);

const textures = [
    textureLoader.load('./particles/1.png'),
    textureLoader.load('./particles/2.png'),
    textureLoader.load('./particles/3.png'),
    textureLoader.load('./particles/4.png'),
    textureLoader.load('./particles/5.png'),
    textureLoader.load('./particles/6.png'),
    textureLoader.load('./particles/7.png'),
    textureLoader.load('./particles/8.png')
];

// Fireworks
const createFirework = (count, position, size, texture, radius, color) => {
    const positionsArray = new Float32Array(count * 3);
    const sizesArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        const spherical = new THREE.Spherical(
            radius * (0.75 + Math.random() * 0.25),
            Math.random() * Math.PI,
            Math.random() * Math.PI * 2
        );
        const position = new THREE.Vector3();
        position.setFromSpherical(spherical);

        positionsArray[i3    ] = position.x;
        positionsArray[i3 + 1] = position.y;
        positionsArray[i3 + 2] = position.z;

        sizesArray[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3));
    geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1));

    texture.flipY = false;
    const material = new THREE.ShaderMaterial({
        vertexShader: fireworkVertexShader,
        fragmentShader: fireworkFragmentShader,
        uniforms: {
            uSize: new THREE.Uniform(size),
            uResolution: new THREE.Uniform(sizes.resolution),
            uTexture: new THREE.Uniform(texture),
            uColor: new THREE.Uniform(color)
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const fireworks = new THREE.Points(
        geometry,
        material
    );
    fireworks.position.copy(position);
    scene.add(fireworks);
};

createFirework(
    100, // count
    new THREE.Vector3(), // position
    0.5, // size
    textures[7], // texture
    1, // radius
    new THREE.Color('#8affff') // color
);

const tick = () => {
    controls.update();

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();