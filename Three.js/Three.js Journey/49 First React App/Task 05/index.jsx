import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

const toto = 'tata';

root.render(
    <>
        <h1 className="main-title">
            Hello { toto }
        </h1>
        <p>Some<br />content { Math.random() }</p>
    </>
)