import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      const response = await api.get('/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
