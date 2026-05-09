import * as THREE from 'three';

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const size = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
scene.add(camera);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);

const cubeA = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cubeA.position.x = -1;
cubeA.scale.set(1, 3, 1);  
cubeA.rotation.y = Math.PI / 4; 
scene.add(cubeA);

const cubeB = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cubeB.position.x = 1;
cubeB.rotation.y = Math.PI / 4; 
cubeB.scale.set(1, 3, 1); 
scene.add(cubeB);

renderer.render(scene, camera);