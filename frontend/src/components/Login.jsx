import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // For navigation

const Login = () => {
  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (data.success) {
        document.cookie = `token=${data.token}`;
        navigate("/landing");
      } else {
        setErrorMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("Error registering. Please try again.");
      console.error("Error registering:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      console.log(data);
      document.cookie = `token=${data.token}; expires=${
        new Date() * 60 * 60 * 7
      }; path=/`;

      if (data.success) {
        console.log(data.role);

        if (data.role == "owner") {
          navigate("/admin");
        } else {
          navigate("/landing");
        }
      } else {
        setErrorMessage(data.message || "Invalid credentials.");
      }
    } catch (error) {
      setErrorMessage("Error logging in. Please try again.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Section (Signup) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#000",
          color: "#FFD700",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ alignSelf: "flex-start", ml: 5, mb: 2 }}
        >
          NextAura
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Welcome to <span style={{ color: "#FFD700" }}>NextAura</span>
        </Typography>
        <Typography variant="body1" sx={{ color: "#fff", mb: 3 }}>
          Create your account
        </Typography>
        <Box sx={{ width: "80%" }}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Full Name"
            sx={{ backgroundColor: "#fff", mb: 2 }}
            onChange={(e) =>
              setRegisterData({ ...registerData, fullname: e.target.value })
            }
          />
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Email"
            sx={{ backgroundColor: "#fff", mb: 2 }}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            variant="outlined"
            type="password"
            placeholder="Password"
            sx={{ backgroundColor: "#fff", mb: 2 }}
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#FFD700", color: "#000", mt: 2 }}
            onClick={handleRegister}
          >
            Create My Account
          </Button>
        </Box>
      </Grid>

      {/* Right Section (Login) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Login to your account
        </Typography>
        <Box sx={{ width: "80%" }}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Email"
            sx={{ backgroundColor: "#f8d7da", mb: 2 }}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            variant="outlined"
            type="password"
            placeholder="Password"
            sx={{ backgroundColor: "#f1f1f1", mb: 2 }}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#FFD700", color: "#000", mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>

        {/* Divider with "or" */}
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography sx={{ mx: 2, fontWeight: "bold", color: "#666" }}>
            or
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Box>

        {/* Forgot Password */}
        <Typography
          variant="body2"
          sx={{ textDecoration: "underline", cursor: "pointer", color: "#666" }}
        >
          Forgot Password?
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
