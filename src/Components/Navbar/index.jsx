import {useState, useEffect} from 'react';
import { FaAlignLeft, FaAngleRight, FaBars } from "react-icons/fa";

import './style.css';
import api from '../../services/api';

function Navbar({clickCategory}){
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories(){
        await api.get('/categories', {headers: {'appKey': 'yDY5qu106qdgj7iBJm9j1biHH8v7sTO6WPPe29vY'}})
            .then(response => {
                setCategories(response.data);
            })
    }

    function ucfirst(text){
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    function toggleSubmenu(id){
        const menuItem = document.getElementById(`sub${id}`);
        window.getComputedStyle(menuItem).display == "none" ? menuItem.style.display = 'block' : menuItem.style.display = 'none';
    }
    
    function toggleMenuMobile(){
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
    }

    return(
        <div>
            
            <button id="btn-mobile" onClick={toggleMenuMobile}><FaBars/></button>
            
            <nav id="nav">
                <ul id="menu">
                    <div id="menu-title">
                        <FaAlignLeft/>
                        <p>Categorias</p>
                    </div>

                    {categories.map(category => (
                        <li key={category.id}>
                            {category.categories.length > 0 &&
                                <>
                                    <button onClick={() => toggleSubmenu(category.id)}>
                                        <div className="subitem-container">
                                            {ucfirst(category.name)}
                                            <FaAngleRight/>
                                        </div>
                                    </button>

                                    <ul id={`sub${category.id}`}>
                                        {category.categories.map(subcategory => (
                                            <li key={subcategory.id}>
                                                <button onClick={() => {
                                                                        clickCategory(subcategory.slug);
                                                                        toggleMenuMobile();
                                                                    }}>
                                                    {ucfirst(subcategory.name)}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            }

                            {category.categories.length == 0 &&
                                <button onClick={() => {
                                                        clickCategory(category.slug);
                                                        toggleMenuMobile();
                                                    }}>
                                    {ucfirst(category.name)}
                                </button>
                            }
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;