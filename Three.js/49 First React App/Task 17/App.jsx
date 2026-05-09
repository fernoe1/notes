import { useState } from 'react';
import Clicker from './Clicker.jsx';

const App = ({ children }) =>
{
    const [ hasClicker, setHasClicker ] = useState(true);
    const [ count, setCount ] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return <>
        { children }

        <div>Total count: { count }</div>

        <button onClick={() => setHasClicker(!hasClicker)}>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
        { hasClicker && <>
            <Clicker increment={ increment } keyName="CountB" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` } />
            <Clicker increment={ increment } keyName="CountC" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` } />
            <Clicker increment={ increment } keyName="CountA" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` } />
        </> }
    </>
};

export default App;