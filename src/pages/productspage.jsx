


import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Card, CardContent, CardMedia, IconButton, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './productspage.css';
import API_CONFIG from "../api/api"

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);  
  const [selectedProduct, setSelectedProduct] = useState(null);  
  const [openDialog, setOpenDialog] = useState(false);  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) throw new Error("Unauthorized. Please log in.");

        
        const response = await fetch(`${API_CONFIG.BASE_URL}/products`, {
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
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    window.location.href = "/add-product";
  };

  const handleEditProduct = (id) => {
    window.location.href = `/edit-product/${selectedProduct._id}`;
  };

  const handleDeleteProduct = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) throw new Error("Unauthorized. Please log in.");


      const response = await fetch(`${API_CONFIG.BASE_URL}/products/${selectedProduct._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      

      setOpenDialog(false);
      if (!response.ok) {
        const err = await response.json();
        alert(err.message);
        //throw new Error(err.message || "Failed to delete product");
      }else{
        setProducts(products.filter((product) => product._id !== selectedProduct._id));
        alert("Product deleted successfully!");
      }

      
       // Remove the deleted product from the state
        
    } catch (err) {
      setError(err.message);
      
    }
  };

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product); 
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    //setSelectedProduct(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) return <Typography>Loading products...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card sx={{ width: "100%", position: "relative" }}>
              <CardMedia
                component="img"
                image={product.imageurl || "https://via.placeholder.com/150"}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6">${product.price.toFixed(2)}</Typography>
                <Typography variant="body2">Category: {product.category}</Typography>
                <Typography variant="body2">Stock: {product.stock}</Typography>

                {/* More options (Menu) */}
                <IconButton
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={(event) => handleMenuClick(event, product)} 
                >
                  <MoreVertIcon />
                </IconButton>

                {/* Menu with Edit and Delete */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={() => handleEditProduct(product._id)}>Edit</MenuItem>
                  <MenuItem onClick={()=> handleOpenDialog(selectedProduct)}>Delete</MenuItem>
                </Menu>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleDeleteProduct} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;



