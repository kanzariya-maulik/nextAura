import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.result))
      .catch((err) => console.error("Error fetching products:", err));

    fetch("http://localhost:8080/owners/getUsers")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        const extractedOrders = data.flatMap((user) =>
          user.orders.map((order) => ({ ...order, user }))
        );
        setOrders(extractedOrders);
      })
      .catch((err) => console.error("Error fetching users and orders:", err));
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:8080/products/${id}`, { method: "DELETE" });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:8080/users/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const confirmOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Confirmed" }),
        }
      );
      if (response.ok) {
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: "Confirmed" } : order
          )
        );
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Admin Panel
      </Typography>

      {/* Products Section */}
      <Box>
        <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
          Products
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Users Section */}
      <Box>
        <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
          Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Orders Section */}
      <Box>
        <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
          Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Payment ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.user?.fullname || "Unknown"}</TableCell>
                  <TableCell>
                    {order.items.map((item) => (
                      <div key={item.product_id._id}>
                        {item.product_id.name} ({item.quantity})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{order.paymentId}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.status || "Pending"}</TableCell>
                  <TableCell>
                    {order.status !== "Confirmed" && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => confirmOrder(order._id)}
                      >
                        Confirm
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminPanel;
