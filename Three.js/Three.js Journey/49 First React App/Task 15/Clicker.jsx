import { useEffect, useState } from 'react';

const Clicker = ({ keyName, color }) => 
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(keyName) ?? 0));

    useEffect(() => {
        return () => {
            localStorage.removeItem(keyName);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(keyName, count);
    }, [ count ]);

    const incrCount = () => {
        setCount((value) => value + 1);
    };
    
    return <div>
        <div style={ { color } }>Clicks count: { count }</div>
        <button onClick={ incrCount }>Click me</button>
    </div>
};

export default Clicker;