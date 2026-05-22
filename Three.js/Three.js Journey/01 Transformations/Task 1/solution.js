import * as THREE from 'three';

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const cubeGeo = new THREE.BoxGeometry();

const sphereGeo = new THREE.SphereGeometry();

const coneGeo = new THREE.ConeGeometry();

const redMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const blueMat = new THREE.MeshBasicMaterial({ color: 0x0000ff });

const greenMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const cube = new THREE.Mesh(cubeGeo, redMat);
const sphere = new THREE.Mesh(sphereGeo, blueMat);
const cone = new THREE.Mesh(coneGeo, greenMat);

scene.add(cube, sphere, cone);

cube.position.x = 3;
sphere.position.y = 2;
cone.position.z = -4

console.log(cube.position);
console.log(sphere.position);
console.log(cone.position);

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height );
scene.add(camera);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);