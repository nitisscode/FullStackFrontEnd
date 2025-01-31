
import React, { useState } from "react";
import { TextField, Button, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./addproductpage.css";
import API_CONFIG from "../api/api"

const categories = ["Electronics", "Clothing", "Food", "Beauty", "Home", "Books", "Kids", "Sports"];

const AddProductPage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageurl: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Unauthorized. Please log in.");

      const response = await fetch(`${API_CONFIG.BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to add product");
      }

      alert("Product added successfully!");
      setProduct({ name: "", description: "", price: "", category: "", stock: "", imageurl: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="outer-box">
      <div className="button-div">
        <Button
          // variant="outlined"
          // color="primary"
          onClick={() => navigate("/products")}
          className="products-button"
        >
          Go to Products
        </Button>
        </div>
    <div className="page-container">
      

      <div className="form-div">
        <Typography variant="h4" className="form-title">
          Add Product
        </Typography>
        {error && <Typography color="error" className="error-text">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            required
            value={product.name}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={product.description}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            label="Price"
            name="price"
            fullWidth
            required
            type="number"
            inputProps={{ min: 0 }}
            value={product.price}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            required
            value={product.category}
            onChange={handleChange}
            className="input-field"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Stock"
            name="stock"
            fullWidth
            required
            type="number"
            inputProps={{ min: 0 }}
            value={product.stock}
            onChange={handleChange}
            className="input-field"
          />
          <TextField
            label="Image URL"
            name="imageurl"
            fullWidth
            value={product.imageurl}
            onChange={handleChange}
            className="input-field"
          />
          <Button type="submit" variant="contained" fullWidth className="submit-button">
            Add Product
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddProductPage;
