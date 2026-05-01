import { useEffect, useState } from 'react';

const Clicker = () => 
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem('count') ?? 0));

    useEffect(() => {
        return () => {
            localStorage.removeItem('count');
        }
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