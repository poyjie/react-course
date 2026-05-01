import { Header } from '../../components/Header';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({cartItems}) {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios.get('/api/products?expand=product')
        .then((response) => {
            setProducts(response.data);
        });

    }, []);

    return (
        <>
            <title>Ecommerce</title>

            <Header cartItems={cartItems} />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>

        </>
    )
}
