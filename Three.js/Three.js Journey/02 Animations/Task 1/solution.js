import * as THREE from 'three';

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 4 / 3);
scene.add(camera);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(cube);

// let time = Date.now();
// const tick = () => {
//     const currentTime = Date.now();
//     const deltaTime = currentTime - time;
//     time = currentTime;

//     cube.rotation.y += 0.001 * deltaTime;

//     renderer.render(scene, camera);

//     window.requestAnimationFrame(tick);
// }

const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    cube.rotation.y = elapsedTime;

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

renderer.render(scene, camera);

tick();