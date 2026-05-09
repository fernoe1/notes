import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 4 / 3);
scene.add(camera);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);

const sunCone = new THREE.Mesh(
    new THREE.ConeGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(sunCone);

const planetSphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
scene.add(planetSphere);
planetSphere.position.x = 4;

let i = 0;
const orbit = () => {
    planetSphere.position.x = 4 * Math.cos(i);
    planetSphere.position.z = 4 * Math.sin(i);
    planetSphere.rotation.y = i;
    i += 0.02;

    renderer.render(scene, camera);

    requestAnimationFrame(orbit);
}

const moonCube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
planetSphere.add(moonCube);
moonCube.position.x = 2;

renderer.render(scene, camera);

orbit();