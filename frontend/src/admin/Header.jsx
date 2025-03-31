import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Admin Title */}
        <Typography variant="h6" fontWeight="bold" color="black">
          Manage AURA
        </Typography>

        {/* Search Bar */}
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
            placeholder="Search Admin Panel..."
            sx={{ flex: 1, fontSize: "16px" }}
          />
        </Box>

        {/* Admin Navigation Links */}
        <Box>
          <Link to="/admin/" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "black", marginX: 1 }}>Dashboard</Button>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "black", marginX: 1 }}>Manage Products</Button>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "black", marginX: 1 }}>Orders</Button>
          </Link>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <Button sx={{ color: "black", marginX: 1 }}>Users</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
