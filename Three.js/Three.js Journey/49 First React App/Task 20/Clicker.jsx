import { useRef, useEffect, useState } from 'react';

const Clicker = ({ increment, keyName, color }) => 
{
    const [ count, setCount ] = useState(parseInt(localStorage.getItem(keyName) ?? 0));
    const button = useRef();

    useEffect(() => {
        button.current.style.backgroundColor = 'papayawhip';
        button.current.style.color = 'salmon';

        return () => {
            localStorage.removeItem(keyName);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(keyName, count);
    }, [ count ]);

    const incrCount = () => {
        setCount((value) => value + 1);
        increment();
    };
    
    return <div>
        <div style={ { color } }>Clicks count: { count }</div>
        <button ref={ button } onClick={ incrCount }>Click me</button>
    </div>
};

export default Clicker;