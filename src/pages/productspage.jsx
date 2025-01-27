

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("Unauthorized. Please log in.");

        const response = await fetch(`http://localhost:3000/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.products); // Assuming API returns `data.products`
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    console.log("Redirect to Add Product page");
    // Add your redirection logic here
  };

  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box className="page-container">
      <div className="page-title-container">
        <Typography variant="h4" className="page-title">
          Products
        </Typography>

        {/* Add Product button */}
        <button onClick={handleAddProduct} className="add-product-button">
          Add Product
        </button>
      </div>

      <div className="grid-container">
        {products.map((product) => (
          <div className="grid-item" key={product._id}>
            <div className="product-card">
              <img
                className="product-card-media"
                src={product.imageurl || "https://via.placeholder.com/150"}
                alt={product.name}
              />
              <div className="product-card-content">
                <Typography variant="h6" className="product-card-title">
                  {product.name}
                </Typography>
                <Typography variant="body2" className="product-card-description">
                  {product.description}
                </Typography>
                <Typography variant="body1" className="product-card-price">
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" className="product-card-category">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" className="product-card-stock">
                  Stock: {product.stock}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ProductsPage;
