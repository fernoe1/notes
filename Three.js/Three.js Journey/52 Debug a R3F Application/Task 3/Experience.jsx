import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

const Experience = () => {
    const { position } = useControls({ 
        position: {
            value: -2,
            min: -4,
            max: 4,
            step: 0.01
        }
    });

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh position-x={ position }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
};

export default Experience;