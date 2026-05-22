import * as THREE from 'three';

const sizes = {
    width: 800,
    height: 600
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 8;

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
scene.add(sphere);
sphere.position.x = 4;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(cube);

const canvas = document.querySelector("canvas.webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

let i = 0;
const orbit = () => {
    sphere.position.x = 4 * Math.cos(i);
    sphere.position.z = 4 * Math.sin(i);
    i += 0.02;

    renderer.render(scene, camera);

    requestAnimationFrame(orbit);
}

orbit();