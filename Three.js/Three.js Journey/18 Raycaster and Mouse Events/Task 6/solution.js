import * as THREE from 'three';
import { OrbitControls, GLTFLoader } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    width: 370,
    closeFolders: true
});
const debugObject = {};

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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(1, 2, 3);
scene.add(directionalLight);

const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

const gltfLoader = new GLTFLoader();

let model;
gltfLoader.load('/models/Duck/glTF-Binary/Duck.glb',
    (gltf) => {
        model = gltf.scene;
        model.position.y = -1.2;
        scene.add(model);
    }
);

const raycaster = new THREE.Raycaster();

// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
// rayDirection.normalize();

// raycaster.set(rayOrigin, rayDirection);

// const intersect = raycaster.intersectObject(object1);
// console.log(intersect);
// const intersects = raycaster.intersectObjects([object1, object2, object3]);
// console.log(intersects);

const mouse = new THREE.Vector2();
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
});

addEventListener('click', () => {
    if (currentIntersect) {
        switch (currentIntersect.object) {
            case object1:
                console.log('click on object1');
                break;
            case object2:
                console.log('click on object2');
                break;
            case object3:
                console.log('click on object3');
                break;
        }
    }
})

let currentIntersect = null;
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5;
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5;

    raycaster.setFromCamera(mouse, camera);

    const objectsToTest = [object1, object2, object3];
    for (const object of objectsToTest) {
        object.material.color.set(0xff0000);
    }
    const intersects = raycaster.intersectObjects(objectsToTest);
    for (const intersect of intersects) {
        intersect.object.material.color.set(0x0000ff);
    }

    if (intersects.length) {
        if (currentIntersect === null) {
            console.log('mouse enter');
        }
        currentIntersect = intersects[0];
    } else {
        if (currentIntersect !== null) {
            console.log('mouse leave');
        }
        currentIntersect = null;
    }

    if (model) {
        const modelIntersects = raycaster.intersectObject(model);

        if (modelIntersects.length) {
            model.scale.set(1.2, 1.2, 1.2);
        } else {
            model.scale.set(1, 1, 1);
        }
    }

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