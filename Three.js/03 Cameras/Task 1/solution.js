import * as THREE from 'three';

const sizes = {
    width: 800,
    height: 600
}

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);


const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

scene.add(cube);

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
});

const tick = () => {
    camera.position.x = cursor.x;
    camera.position.y = cursor.y;

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

renderer.render(scene, camera);

tick();