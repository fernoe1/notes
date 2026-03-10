import * as THREE from 'three';
import { OrbitControls, GLTFLoader, RGBELoader, EXRLoader, HDRLoader } from 'three/examples/jsm/Addons.js';
import { GroundedSkybox } from 'three/addons/objects/GroundedSkybox.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    width: 370,
    closeFolders: true
});
const global = {};

addEventListener('keypress', (e) => {
    if (e.key === 'h') gui.show(gui._hidden);
});

const canvas = document.querySelector('canvas.webgl');

const gltfLoader = new GLTFLoader();
const rgbeLoader = new RGBELoader();
const hdrLoader = new HDRLoader();
const exrLoader = new EXRLoader();

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

const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (child.isMesh && child.material.isMeshStandardMaterial) {
            child.material.envMapIntensity = global.envMapIntensity;
        }
    })
};

scene.backgroundBlurriness = 0;
gui
    .add(scene, 'backgroundBlurriness')
    .min(0)
    .max(1)
    .step(0.001);

scene.backgroundIntensity = 1;
gui
    .add(scene, 'backgroundIntensity')
    .min(0)
    .max(10)
    .step(0.001);

global.envMapIntensity = 1;
gui
    .add(global, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials);

// rgbeLoader.load('/environmentMaps/blender-2k.hdr', (envMap) => {
//     envMap.mapping = THREE.EquirectangularReflectionMapping;

//     scene.background = envMap;
//     scene.environment = envMap;
// })

// exrLoader.load('/environmentMaps/nvidiaCanvas-4k.exr', (envMap) => {
//     envMap.mapping = THREE.EquirectangularReflectionMapping;

//     scene.background = envMap;
//     scene.environment = envMap;
// });

// const cubeTextureLoader = new THREE.CubeTextureLoader();
// const environmentMap = cubeTextureLoader.load([
//     '/environmentMaps/0/px.png',
//     '/environmentMaps/0/nx.png',
//     '/environmentMaps/0/py.png',
//     '/environmentMaps/0/ny.png',
//     '/environmentMaps/0/pz.png',
//     '/environmentMaps/0/nz.png'
// ]);

// scene.background = environmentMap;
// scene.environment = environmentMap;

let skybox = null;

let envMap = null;

hdrLoader.load('/environmentMaps/2/2k.hdr', (envMap1) => {
    envMap1.mapping = THREE.EquirectangularReflectionMapping;

    scene.environment = envMap1;

    envMap = envMap1;

    createSkybox();
});

global.radius = 50;

global.height = 1;

const createSkybox = () => {
    if (skybox) scene.remove(skybox);

    skybox = new GroundedSkybox(envMap, global.height, global.radius);
    skybox.position.y = global.height;
    scene.add(skybox);
}

gui
    .add(global, 'radius')
    .min(1)
    .max(1000)
    .step(0.01)
    .onChange(createSkybox);

gui
    .add(global, 'height')
    .min(1)
    .max(50)
    .step(0.01)
    .onChange(createSkybox);


// const textureLoader = new THREE.TextureLoader();

// const envMap = textureLoader.load('/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg');
// envMap.mapping = THREE.EquirectangularReflectionMapping;
// envMap.colorSpace = THREE.SRGBColorSpace;

// scene.background = envMap;



const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.set(4, 5, 4);

const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

const controls = new OrbitControls(camera, canvas);
controls.target.y = 3.5;
controls.enableDamping = true;

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa })
);
torusKnot.position.x = -4;
torusKnot.position.y = 4;
scene.add(torusKnot);

gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf', 
    (gltf) => {
        gltf.scene.scale.set(10, 10, 10);
        scene.add(gltf.scene);

        updateAllMaterials();
    }
);

// const holyDonut = new THREE.Mesh(
//     new THREE.TorusGeometry(8, 0.5),
//     new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
// );
// holyDonut.position.y = 3.5;
// holyDonut.layers.enable(1);
// scene.add(holyDonut);

// const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
//     256, {
//         type: THREE.FloatType
//     }
// );

// scene.environment = cubeRenderTarget.texture

// const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
// cubeCamera.layers.set(1)


const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // if (holyDonut) {
    //     holyDonut.rotation.x = Math.sin(elapsedTime) * 2;

    //     cubeCamera.update(renderer, scene)
    // }

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