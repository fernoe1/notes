import { useState } from 'react';

const Clicker = () => 
{
    const [ count, setCount ] = useState(0);

    const incrCount = () => {
        setCount((value) => value + 1);
    }
    
    return <div>
        <div>Clicks count: { count }</div>
        <button onClick={ incrCount }>Click me</button>
    </div>
};

export default Clicker;