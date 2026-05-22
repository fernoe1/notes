import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))

root.render(
    <>
        <h1 className="main-title">
            Hello React
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Facere deserunt, incidunt fuga voluptatum, impedit vitae minima quos pariatur numquam illo commodi eius veniam labore, magni optio nam laboriosam provident eum!</p>
        <input type="checkbox" id="the-checkbox" />
        <label htmlFor="the-checkbox">That checkbox</label>
    </>
)