import * as THREE from 'three';
import gsap from 'gsap';
import GUI from 'lil-gui';
const gui = new GUI({
    title: 'debug',
    closeFolders: true,
    width: 370
});

const parameters = {};

addEventListener('keypress', (event) => {
    if (event.key === 'h') gui.show(gui._hidden);
});

parameters.materialColor = '#ffeded';
gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor);
        particlesMaterial.color.set(parameters.materialColor);
    });

parameters.intensity = 1;
gui
    .add(parameters, 'intensity')
    .min(0)
    .max(1)
    .step(0.001)
    .onChange(() => directionalLight.intensity = parameters.intensity);

const canvas = document.querySelector('canvas.webgl');

const sizes = {
    width: innerWidth,
    height: innerHeight
};

addEventListener('resize', () => {
    sizes.width = innerWidth;
    sizes.height = innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
});

const scene = new THREE.Scene();

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
cameraGroup.add(camera);

const renderer = new THREE.WebGLRenderer({ 
    canvas,
    alpha: true 
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, devicePixelRatio));

let scrollY = window.scrollY;
let currentSection = 0;
addEventListener('scroll', () => {
    scrollY = window.scrollY;
    
    const newSection = Math.round(scrollY / sizes.height);

    if (newSection != currentSection) {
        currentSection = newSection;

        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                y: '+=3'
            }
        );
    }
});

const cursor = {
    x: 0,
    y: 0
};
addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
});

const textureLoader = new THREE.TextureLoader();

const gradientTexture = textureLoader.load('/textures/gradients/3.jpg');
gradientTexture.magFilter = THREE.NearestFilter;

const material = new THREE.MeshToonMaterial({ 
    color: parameters.materialColor, 
    gradientMap: gradientTexture 
});

parameters.objectsDistance = 4;

const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
);
const mesh2 = new THREE.Mesh(
    new THREE.CapsuleGeometry(),
    material
);
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
);

mesh1.position.y = -parameters.objectsDistance * 0;
mesh2.position.y = -parameters.objectsDistance * 1;
mesh3.position.y = -parameters.objectsDistance * 2;

mesh1.position.x = 2;
mesh2.position.x = -2;
mesh3.position.x = 2;

scene.add(mesh1, mesh2, mesh3);

const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = parameters.objectsDistance * 0.5 - Math.random() * parameters.objectsDistance * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
};

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const sectionMeshes = [mesh1, mesh2, mesh3];
const clock = new THREE.Clock();
let prevTime = 0;
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - prevTime;
    prevTime = elapsedTime;

    camera.position.y = -scrollY / sizes.height * parameters.objectsDistance;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * deltaTime;

    for (const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * 0.1;
        mesh.rotation.y += deltaTime * 0.12;
    }

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
};

tick();

/** CSS
*
{
    margin: 0;
    padding: 0;
}

html
{
    background-color: #1e1e20;
}

.webgl
{
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}


.section
{
    display: flex;
    align-items: center;
    height: 100vh;
    position: relative;
    font-family: 'Cabin', sans-serif;
    color: #ffeded;
    text-transform: uppercase;
    font-size: 7vmin;
    padding-left: 10%;
    padding-right: 10%;
}

section:nth-child(odd)
{
    justify-content: flex-end;
}
*/