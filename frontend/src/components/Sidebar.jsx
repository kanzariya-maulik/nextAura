import React from "react";
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link for routing

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          padding: 2,
        },
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
        NextAura.
      </Typography>
      <List>
        <Link to="/new-collection" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText primary="New Collection" />
          </ListItem>
        </Link>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <ListItem button selected>
            <ListItemText primary="All Products" />
          </ListItem>
        </Link>
      </List>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="subtitle1" fontWeight="bold">
        Filter by:
      </Typography>
      <List>
        <Link to="/availability" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText primary="Availability" />
          </ListItem>
        </Link>
        <Link to="/discount" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemText primary="Discount" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
