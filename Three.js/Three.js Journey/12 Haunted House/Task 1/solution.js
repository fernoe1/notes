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

const fog = new THREE.Fog(0x262837, 1, 15);
scene.fog = fog;

const textureLoader = new THREE.TextureLoader();

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const wallsAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const wallsColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const wallsNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const wallsRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

grassAmbientOcclusionTexture.repeat.set(8, 8);
grassColorTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(3, 3, 3);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));
renderer.setClearColor(0x262837);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const ambientLight = new THREE.AmbientLight(0xb9d5ff, 0.12);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight(0xb9d5ff, 0.12)
moonLight.position.set(4, 5, -2);
scene.add(moonLight);

const doorLight = new THREE.PointLight(0xff7d46, 1, 7);
doorLight.position.set(0, 2.2, 2.7);

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
);
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

const house = new THREE.Group();
scene.add(house);
house.add(doorLight);

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallsColorTexture,
        aoMap: wallsAmbientOcclusionTexture,
        normalMap: wallsNormalTexture,
        roughness: wallsRoughnessTexture
    })
);
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 2.5 * 0.5;
house.add(walls);

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.position.y = 3;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
);
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2.01;
house.add(door);

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

scene.add(bush1, bush2, bush3, bush4);

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {
    const graveAngle = 2 * Math.PI * Math.random();

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    const radius = 3 + Math.random() * 6;
    grave.position.x = Math.sin(graveAngle) * radius;
    grave.position.y = 0.3;
    grave.position.z = Math.cos(graveAngle) * radius;

    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    grave.rotation.z = (Math.random() - 0.5) * 0.4;

    grave.castShadow = true;

    graves.add(grave);
}

const ghost1 = new THREE.PointLight('#ff00ff', 6, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 6, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 6, 3);
scene.add(ghost3);



gui
    .add(ambientLight, 'intensity')
    .min(0)
    .max(1)
    .step(0.001);

gui
    .add(moonLight, 'intensity')
    .min(0)
    .max(2)
    .step(0.001);

gui
    .add(moonLight.position, 'x')
    .min(-5)
    .max(5)
    .step(0.1);

gui
    .add(moonLight.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1);

gui
    .add(moonLight.position, 'z')
    .min(-5)
    .max(5)
    .step(0.1);

renderer.shadowMap.enabled = true;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;



const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = - elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = - elapsedTime * 0.18;
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

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