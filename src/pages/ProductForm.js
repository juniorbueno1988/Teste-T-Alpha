import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`https://interview.t-alpha.com.br/products/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setName(response.data.name);
          setPrice(response.data.price);
        } catch (err) {
          console.error('Error fetching product', err);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const productData = { name, price };

    try {
      if (id) {
        await axios.put(`https://interview.t-alpha.com.br/products/${id}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('https://interview.t-alpha.com.br/products', productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/products');
    } catch (err) {
      setError('Error saving product. Please try again.');
      console.error('Error saving product', err);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default ProductForm;
