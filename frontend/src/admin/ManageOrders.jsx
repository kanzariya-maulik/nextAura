import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  LocalShipping,
  CheckCircle,
  HourglassEmpty,
} from "@mui/icons-material";
import Header from "./Header";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/owners/getOrders"
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle status change
  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading)
    return (
      <>
        <Header />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
      </>
    );

  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
          📦 Manage Orders
        </Typography>
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    Order ID: {order._id}
                  </Typography>
                  <Box mt={1}>
                    {order.items.map((item) => (
                      <Typography
                        key={item._id}
                        variant="body2"
                        color="text.secondary"
                      >
                        <strong>{item.product_id.name}</strong> - $
                        {item.product_id.price} (x{item.quantity})
                      </Typography>
                    ))}
                  </Box>
                  <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                    Total Amount: ${order.amount}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Typography variant="body1" fontWeight="bold" mr={1}>
                      Status:
                    </Typography>
                    <Chip
                      label={order.status}
                      icon={
                        order.status === "Pending" ? (
                          <HourglassEmpty />
                        ) : order.status === "Shipped" ? (
                          <LocalShipping />
                        ) : (
                          <CheckCircle />
                        )
                      }
                      color={
                        order.status === "Pending"
                          ? "warning"
                          : order.status === "Shipped"
                          ? "primary"
                          : "success"
                      }
                    />
                  </Box>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ManageOrders;
