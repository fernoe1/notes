import { useMemo, useState } from 'react';
import Clicker from './Clicker.jsx';

const App = ({ clickersCount, children }) =>
{
    const [ hasClicker, setHasClicker ] = useState(true);
    const [ count, setCount ] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const colors = useMemo(() => {
        const colors = [];

        for (let i = 0; i < clickersCount; i++) 
            colors.push(`hsl(${ Math.random() * 360 }deg, 100%, 70%)`);

        return colors;
    }, [ clickersCount ]);


    return <>
        { children }

        <div>Total count: { count }</div>

        <button onClick={() => setHasClicker(!hasClicker)}>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
        { hasClicker && <>
            { [...Array(clickersCount)].map( (val, i) => 
                <Clicker
                    key={ i }
                    increment={ increment }
                    keyName={ `count${i}` }
                    color={ colors[i] }
                />
            ) }
        </> }
    </>
};

export default App;