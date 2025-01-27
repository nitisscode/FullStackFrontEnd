
import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./signuppage.css";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Signup successful!");
        navigate("/login");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <form className="signup-form" onSubmit={handleSignup}>
          <Typography variant="h4" className="signup-title">
            Sign Up
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            className="signup-input"
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            className="signup-input"
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            className="signup-input"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            className="signup-input"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            className="signup-input"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" className="signup-button"  margin="normal">
            Sign Up
          </Button>
        </form>
        <Typography className="signup-login">
          Already registered?{" "}
          <Button variant="text" color="primary" onClick={handleLoginRedirect}>
            Login
          </Button>
        </Typography>
      </div>
    </div>
  );
};

export default SignupPage;

