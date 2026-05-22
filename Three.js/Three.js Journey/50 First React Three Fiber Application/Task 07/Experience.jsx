import { useThree, extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

extend({ OrbitControls })

const Experience = () => {
    const { camera, gl } = useThree();
    const cube = useRef();
    const group = useRef();

    useFrame((st, del) => {
        cube.current.rotation.y += del;
        // group.current.rotation.y += del;
    });

    return <>

        <orbitControls args={ [ camera, gl.domElement ] } />

        <group ref={ group } >
            <mesh ref={ cube } position-x={ 2 } scale={ 1.5 } >
                <boxGeometry />
                <meshBasicMaterial color={ 'mediumpurple' } />
            </mesh>

            <mesh position-x={ -2 } >
                <sphereGeometry />
                <meshBasicMaterial color={ 'orange' } />
            </mesh>
        </group>

        <mesh rotation-x={ -Math.PI * 0.5 } position-y={ -1 } scale={ 10 } >
            <planeGeometry />
            <meshBasicMaterial color={ 'greenyellow' } />
        </mesh>
        
    </>
};

export default Experience;