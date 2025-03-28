import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {location.pathname.startsWith("/account/") ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "30px",
              padding: "5px 15px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Profile.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f1f3f4",
              borderRadius: "30px",
              padding: "5px 15px",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <SearchIcon sx={{ color: "gray", mr: 1 }} />
            <InputBase
              placeholder="In Search Of Something ?"
              sx={{ flex: 1, fontSize: "16px" }}
            />
          </Box>
        )}

        <Box>
          <Link to="/landing" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "black", marginX: 1 }}>Home</Button>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "black", marginX: 1 }}>Product</Button>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "black", marginX: 1 }}>Cart</Button>
          </Link>
          <Link to="/account" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "black", marginX: 1 }}>My Account</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
