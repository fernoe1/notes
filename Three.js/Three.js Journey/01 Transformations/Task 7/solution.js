import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 800 / 600);
scene.add(camera);
camera.position.z = 5;

const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(cube);

let prevX = 0;
let scaleFact = 1;
window.addEventListener(`mousemove`, (event) => {
    const currX = event.clientX;
    const deltaX = currX - prevX;

    // if (deltaX > 0) {
    //     scaleFact += 0.01;
    // } else if (deltaX < 0) {
    //     scaleFact -= 0.01;
    // }

    scaleFact += deltaX * 0.002;

    scaleFact = Math.max(1, Math.min(scaleFact, 3));

    cube.scale.set(scaleFact, scaleFact, scaleFact);

    prevX = currX;
})


renderer.render(scene, camera);

const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();