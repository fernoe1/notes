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

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <group ref={ group } >
            <mesh ref={ cube } position-x={ 2 } scale={ 1.5 } >
                <boxGeometry />
                <meshStandardMaterial color={ 'mediumpurple' } />
            </mesh>

            <mesh position-x={ -2 } >
                <sphereGeometry />
                <meshStandardMaterial color={ 'orange' } />
            </mesh>
        </group>

        <mesh rotation-x={ -Math.PI * 0.5 } position-y={ -1 } scale={ 10 } >
            <planeGeometry />
            <meshStandardMaterial color={ 'greenyellow' } />
        </mesh>

    </>
};

export default Experience;