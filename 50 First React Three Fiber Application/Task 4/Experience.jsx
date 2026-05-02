const Experience = () => {
    return <>

        <mesh position-x={ 2 } scale={ 2 } >
            <boxGeometry />
            <meshBasicMaterial color={ 'mediumpurple' } />
        </mesh>

        <mesh position={ [ -2, 0.2, 0 ] } scale={ 1.25 } >
            <sphereGeometry />
            <meshBasicMaterial color={ 'orange' } />
        </mesh>

        <mesh rotation-x={ -Math.PI * 0.5 } position-y={ -1 } scale={ 7 } >
            <planeGeometry />
            <meshBasicMaterial color={ 'green' } />
        </mesh>
        
    </>
};

export default Experience;