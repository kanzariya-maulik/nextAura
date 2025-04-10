import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to your backend
      await axios.post("http://localhost:8080/forgetPassword", { email });

      setMessage("Password reset link has been sent to your email.");
      setDisabled(true);

      // Re-enable button after 2 minutes
      setTimeout(() => {
        setDisabled(false);
        setMessage(""); // Optional: Clear message after 2 mins
      }, 2 * 60 * 1000);
    } catch (error) {
      setMessage("Failed to send reset link. Try again later.");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", py: 8 }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: "#1e1e1e",
            color: "#fff",
          }}
        >
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Forgot Your Password?
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#bbb", mb: 2 }}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Typography>

          {message && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#ccc" } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={disabled}
              sx={{ mt: 2, backgroundColor: "#1976d2" }}
            >
              {disabled ? "Please wait..." : "Send Reset Link"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgetPassword;
