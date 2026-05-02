import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Experience = () => {
    const group = useRef();

    useFrame((st, del) => {
        group.current.rotation.y += del;
    });

    return <>
        <group ref={ group } >
            <mesh position-x={ 2 } scale={ 1.5 } >
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