import { useState } from 'react';
import Clicker from './Clicker.jsx';

const App = ({ children }) =>
{
    const [ hasClicker, setHasClicker ] = useState(true);

    return <>
        { children }
        <button onClick={() => setHasClicker(!hasClicker)}>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
        { hasClicker && <>
            <Clicker keyName="CountA" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` } />
            <Clicker keyName="CountB" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` } />
            <Clicker keyName="CountC" color={ `hsl(${ Math.random() * 360 }deg, 100%, 70%)` } />
        </> }
    </>
};

export default App;