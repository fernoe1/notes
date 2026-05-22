import { useEffect, useState } from 'react';

const People = () => {
    const [people, setPeople] = useState([]);

    const getPeople = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const result = await response.json();
        
        setPeople(result);
    }

    useEffect(() => {
        getPeople()
    }, []);

    return <div>
        <h2>People</h2>
        <ul>
            { people.map(val => 
                <li key={ val.id }>{ val.name }</li>
            ) }
        </ul>
    </div>
};

export default People;