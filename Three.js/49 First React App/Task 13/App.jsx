import { useState } from 'react';
import Clicker from './Clicker.jsx';

const App = () =>
{
    const [ hasClicker, setHasClicker ] = useState(true);

    return <>
        <button onClick={() => setHasClicker(!hasClicker)}>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
        { hasClicker && <Clicker /> }
    </>
};

export default App;