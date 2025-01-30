import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Grid, Card, CardMedia } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import './editproductpage.css';
import API_CONFIG from "../api/api"

const EditProductPage = () => {
  const { productId } = useParams(); // Get product ID from the URL
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageurl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the product data when the page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("Unauthorized. Please log in.");

        const response = await fetch(`${API_CONFIG.BASE_URL}/products/${productId}`, {
          method: "GET",            //${API_CONFIG.BASE_URL}/${productId}
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response)

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Failed to fetch product data");
        }

        const data = await response.json();
        console.log(data);
        setProduct(data.product);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Unauthorized. Please log in.");

      const response = await fetch(`${API_CONFIG.BASE_URL}/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const err = await response.json();
        console.log(err)
        alert(err.message);
        //throw new Error(err.message || "Failed to update product");
        
      }else{
        alert("Product updated successfully!");
        navigate("/products"); // Use navigate instead of history.push
      }

      
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Typography>Loading product...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Edit Product</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={product.imageurl || "https://via.placeholder.com/150"}
              alt={product.name}
            />
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleChange}
              
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
              
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Image URL"
              name="imageurl"
              value={product.imageurl}
              onChange={handleChange}
              //margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Save Changes
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditProductPage;
