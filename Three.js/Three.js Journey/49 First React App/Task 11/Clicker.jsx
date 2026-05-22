import { useEffect, useState } from 'react';

const Clicker = () => 
{
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        const savedCount = parseInt(localStorage.getItem('count') ?? 0);
        setCount(savedCount);
    }, []);

    useEffect(() => {
        localStorage.setItem('count', count);
    }, [ count ]);

    const incrCount = () => {
        setCount((value) => value + 1);
    };
    
    return <div>
        <div>Clicks count: { count }</div>
        <button onClick={ incrCount }>Click me</button>
    </div>
};

export default Clicker;