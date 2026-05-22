import * as THREE from 'three';

const sizes = {
    width: 800,
    height: 600
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 5;

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
group.add(cube2);
cube2.position.x = 2;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
group.add(cube3);
cube3.position.x = -2;

group.rotation.y = Math.PI / 4;

const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
