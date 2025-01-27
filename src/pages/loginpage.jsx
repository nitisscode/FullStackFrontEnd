
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    
    const payload = {
      email,
      password,
    };

    try {
      
      console.log(process.env.REACT_APP_BASE_URL);
      const response = await fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        
        const data = await response.json();

        const jwtToken = data.token; 
        localStorage.setItem("jwtToken", jwtToken);

        console.log("Login successful. Token stored:", jwtToken);

        navigate("/products");
      } else {
        
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <Box className="login-page">
      {/* Inner Box */}
      <Box className="login-box">
        <Typography variant="h4" className="login-title">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin}>
          {/* Email Input */}
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          {/* Password Input */}
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="login-button"
          >
            Login
          </Button>
        </Box>
        {/* Signup Section */}
        <Typography variant="body2" className="signup-text">
          New User?{" "}
          <Button
            variant="text"
            color="primary"
            onClick={handleSignupRedirect}
            className="signup-link"
          >
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
