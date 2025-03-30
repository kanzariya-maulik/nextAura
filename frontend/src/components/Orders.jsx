import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from "@mui/material";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users/getOrders", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setOrders(data.orders))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <Box
        display="flex"
        sx={{ bgcolor: "#f8f9fa", marginTop: "10px", height: "50%" }}
      >
        {/* Sidebar */}
        <Box
          width={280}
          padding={3}
          bgcolor="#ffffff"
          sx={{ borderRight: "1px solid #ddd", minHeight: "100vh" }}
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

        {/* Profile Details Section */}
        <Box flex={1} padding={4} mx="auto" maxWidth="800px">
          {/* Orders Section */}
          <Grid item xs={9}>
            <Typography variant="h5" fontWeight="bold">
              My Orders
            </Typography>
            <Divider sx={{ my: 4 }} />

            {orders.length > 0 ? (
              orders.map((order, index) => (
                <Box key={index} mb={3}>
                  <Typography variant="h6" fontWeight="bold">
                    Order Date: {new Date(order.orderDate).toLocaleDateString()}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  {order.items.map((item, itemIndex) => (
                    <Box
                      key={itemIndex}
                      display="flex"
                      alignItems="center"
                      mb={3}
                    >
                      {/* Updated Image Handling */}
                      <Box
                        component="img"
                        src={item.product_id.image.url}
                        alt={item.product_id.name}
                        sx={{
                          width: 100,
                          height: 100,
                          mr: 2,
                          objectFit: "cover", // Ensures image doesn't get distorted
                          borderRadius: "8px", // Optional: Adds rounded corners to image
                        }}
                      />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {item.product_id.name}
                        </Typography>
                        <Typography variant="body1">
                          ${item.product_id.price / 100} {/* Updated price */}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ))
            ) : (
              <Typography>No orders found.</Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Orders;
