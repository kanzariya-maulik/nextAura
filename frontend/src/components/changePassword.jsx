import { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    fetch("http://localhost:8080/users/changePassword", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) toast.success("Password changed successfully!");
        else toast.error(data.message || "Error changing password");
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar (Fixed Position) */}
      <Box
        width={280}
        padding={3}
        bgcolor="#ffffff"
        sx={{
          borderRight: "1px solid #ddd",
          position: "fixed",
          top: 64, // Push below the header
          left: 0,
          height: "calc(100vh - 64px)", // Fill remaining height
          overflowY: "auto",
        }}
      >
        <List>
          <ListItem>
            <Link
              to="/account"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemText primary="Details" />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/account/orders"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemText primary="My Orders" />
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/account/changepassword"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemText primary="Change Password" />
            </Link>
          </ListItem>
        </List>
      </Box>

      {/* Main Content (Fixed Header Overlap) */}
      <Box sx={{ ml: "300px", p: 4, maxWidth: "600px", mx: "auto" }}>
        <Typography variant="h5" fontWeight="bold">
          Change Password
        </Typography>
        <Divider sx={{ my: 3 }} />

        <form onSubmit={handleSubmit}>
          <TextField
            label="Old Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 3 }}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 3 }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 3 }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Change Password
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ChangePassword;
