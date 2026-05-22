import * as THREE from 'three';

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 4 / 3);
scene.add(camera);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

const pivot = new THREE.Group();
scene.add(pivot);
pivot.add(cube);
cube.position.x = 0.5;

// cube.geometry.translate(0.5, 0, 0);


const rotate = () => {
    pivot.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(rotate);
}


renderer.render(scene, camera);

rotate();