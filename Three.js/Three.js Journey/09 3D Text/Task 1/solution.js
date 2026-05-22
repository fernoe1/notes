import * as THREE from 'three';
import { OrbitControls, FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
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

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry(
        'Hello Three.js',
        {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4
        }
    );
    textGeometry.center();

    const textMaterial = new THREE.MeshMatcapMaterial();

    const text = new THREE.Mesh(textGeometry, textMaterial);

    const textureLoader = new THREE.TextureLoader();
    const matcapOne = textureLoader.load('/textures/matcaps/1.png');
    const matcapTwo = textureLoader.load('/textures/matcaps/2.png');
    const matcapThree = textureLoader.load('/textures/matcaps/3.png');
    const matcapFour = textureLoader.load('/textures/matcaps/4.png');
    const matcapFive = textureLoader.load('/textures/matcaps/5.png');
    const matcapSix = textureLoader.load('/textures/matcaps/6.png');
    const matcapSeven = textureLoader.load('/textures/matcaps/7.png');
    const matcapEight = textureLoader.load('/textures/matcaps/8.png');

    gui
        .add(textMaterial, 'matcap', {
            one: matcapOne,
            two: matcapTwo,
            three: matcapThree,
            four: matcapFour,
            five: matcapFive,
            six: matcapSix,
            seven: matcapSeven,
            eight: matcapEight
        })
        .onChange(() => textMaterial.needsUpdate = true); 

    scene.add(text);
})

const tick = (timestamp) => {
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