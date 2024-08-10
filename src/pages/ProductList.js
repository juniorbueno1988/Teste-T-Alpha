import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                // Verifique se a URL está correta
                const response = await axios.get('https://interview.t-alpha.com.br/api/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setProducts(response.data.data); // Ajuste conforme a estrutura dos dados retornados
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Failed to fetch products. Please try again later.');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </ul>
        </div>
    );
}

export default ProductList;
