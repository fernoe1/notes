import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

const toto = 'tata';

root.render(
    <>
        {/* Some comment */}
        <h1 style={ { color: 'coral', backgroundColor: 'floralwhite' } }>
            Hello { toto }
        </h1>
        <p className="cute-paragraph">Some<br />content { Math.random() }</p>
    </>
)