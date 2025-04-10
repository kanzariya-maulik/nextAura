import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      setMessage(data.message);
      setSuccess(data.success);
      setTimeout(() => {
        document.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("Something went wrong. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={6}
          sx={{ p: 4, borderRadius: 3, bgcolor: "#1e1e1e", color: "#fff" }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Reset Your Password
          </Typography>

          {message && (
            <Alert
              severity={success ? "success" : "error"}
              sx={{ mt: 2, mb: 2 }}
            >
              {message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleReset}>
            <TextField
              fullWidth
              required
              type="password"
              label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ sx: { color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#ccc" } }}
              margin="normal"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#1976d2" }}
            >
              Reset Password
            </Button>
            <Link to="/">
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#1976d2" }}
              >
                Rememberd Password
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;
