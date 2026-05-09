import * as THREE from 'three';

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

scene.add(cube);

cube.rotation.x = Math.PI / 4;
cube.rotation.y = Math.PI / 2;

const size = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
scene.add(camera);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);

const animateZ = () => {
    cube.rotation.z += 0.01;

    renderer.render(scene, camera);

    requestAnimationFrame(animateZ);
}

renderer.render(scene, camera);

animateZ();