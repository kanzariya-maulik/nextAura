import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {location.pathname.startsWith("/account") ||
        location.pathname.startsWith("/search") ? (
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
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
