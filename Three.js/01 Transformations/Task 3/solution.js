import * as THREE from 'three';

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(sphere);

sphere.geometry.scale(2, 2, 2);
sphere.scale.set(1, 2, 1);
sphere.scale.set(0.5, 1, 0.5);

const size = {
    width: 800,
    height: 600
};

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
scene.add(camera);
camera.position.z = 5;

let i = 0.5;
let j = 1;
const increaseScale = () => {
    sphere.scale.set(i, j, i);
    i += 0.001;
    j += 0.001;

    renderer.render(scene, camera);

    requestAnimationFrame(increaseScale);
}

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.render(scene, camera);

increaseScale();
