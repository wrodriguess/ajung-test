import {useState, useEffect} from 'react';

import './style.css';
import api from '../../services/api';
import Card from '../../Components/Card';
import Navbar from '../../Components/Navbar';

function Home(){
    const [products, setProducts] = useState([]);
    const [slugActived, setSlugActived] = useState('estojos');

    useEffect(() => {
        loadProducts();
    }, [slugActived])

    async function loadProducts(){
        await api.get(`/products/category/${slugActived}`, {headers: {'appKey': 'yDY5qu106qdgj7iBJm9j1biHH8v7sTO6WPPe29vY'}})
            .then(response => {
                setProducts(response.data.products.data);
            })
    }

    return(
        <div id="home-container">
            <Navbar clickCategory={setSlugActived}/>
            
            <div id="cards-area">
                {products.map(product => (
                    <Card key={product.id} srcImg={product.imagem.image_asset} slug={product.name} productId={product.code}/>
                ))}
            </div>
        </div>
    )
}

export default Home;