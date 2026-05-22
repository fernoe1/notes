import * as THREE from 'three';
import Experience from "../Experience.js";

export default class Environment {
    
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        if (this.debug.active) this.debugFolder = this.debug.gui.addFolder('environment');

        this.setDirectionalLight();
        this.setEnvironmentMap();
    }

    setDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight('#ffffff', 4);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.far = 15;
        directionalLight.shadow.mapSize.set(1024, 1024);
        directionalLight.shadow.normalBias = 0.05;
        directionalLight.position.set(3.5, 2, -1.25);
        this.scene.add(directionalLight);

        if (this.debug.active) {
            this.debugFolder
                .add(directionalLight, 'intensity')
                .min(0)
                .max(10)
                .step(0.001)
                .name('dirLightIntensity');

            this.debugFolder
                .add(directionalLight.position, 'x')
                .min(-10)
                .max(10)
                .step(0.001)
                .name('dirLightX');

            this.debugFolder
                .add(directionalLight.position, 'y')
                .min(-10)
                .max(10)
                .step(0.001)
                .name('dirLightY');

            this.debugFolder
                .add(directionalLight.position, 'z')
                .min(-10)
                .max(10)
                .step(0.001)
                .name('dirLightZ');
        }
    }

    setEnvironmentMap() {
        this.environmentMap = {};
        this.environmentMap.intensity = 0.4;
        this.environmentMap.texture = this.resources.items.environmentMapTexture;
        this.environmentMap.colorSpace = THREE.SRGBColorSpace;

        this.scene.environment = this.environmentMap.texture;

        this.environmentMap.updateAllMaterials = () => {
            this.scene.traverse(
                (child) => {
                    if (child.isMesh && child.material.isMeshStandardMaterial) {
                        child.material.envMap = this.environmentMap.texture;
                        child.material.envMapIntensity = this.environmentMap.intensity;
                        child.material.needsUpdate = true;
                    }
                }
            )
        }

        this.environmentMap.updateAllMaterials();

        if (this.debug.active) {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateAllMaterials);
        }
    }

}