import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import Header from "./Header";
import RazorpayPayment from "./Razorpay";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:8080/users/cart", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.success) {
          setCart(data.data);
          setUserDetails({
            email: data.userEmail,
            name: data.name,
            contact: data.contact,
          });
        } else {
          toast.error("Failed to fetch cart.");
        }
      } catch (err) {
        toast.error("Error fetching cart.");
      }
    };

    fetchCart();
  }, []);

  const handleDeleteFromCart = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/cart/${productId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete product");
      }

      toast.success(result.message || "Product removed from cart!");
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    } catch (error) {
      toast.error(error.message || "Error removing product from cart");
    }
  };

  // Calculate the total cart price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product_id.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        {cart.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              padding: 4,
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your cart is empty.
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              Looks like you haven't added anything to your cart yet. Start
              shopping now!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/products")}
            >
              Go to Product Page
            </Button>
          </Box>
        ) : (
          cart.map((item) => {
            const product = item.product_id;
            return (
              <Card
                key={item._id}
                sx={{
                  display: "flex",
                  marginBottom: "10px",
                  padding: "10px",
                  justifyContent: "space-between",
                }}
              >
                <CardContent sx={{ display: "flex", flexDirection: "row" }}>
                  <img
                    src={product.image.url}
                    alt={product.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                    }}
                  />
                  <div style={{ marginLeft: "15px" }}>
                    <Typography variant="subtitle1">{product.name}</Typography>
                    <Typography variant="body2">
                      Price: ₹{product.price}
                    </Typography>
                    <Typography variant="body2">
                      Quantity: {item.quantity}
                    </Typography>
                  </div>
                </CardContent>

                <IconButton
                  onClick={() => handleDeleteFromCart(item._id)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            );
          })
        )}

        {cart.length > 0 && (
          <>
            <Typography
              variant="h5"
              sx={{ marginTop: "20px", fontWeight: "bold" }}
            >
              Total: ₹{totalPrice.toFixed(2)}
            </Typography>
            <RazorpayPayment user={userDetails} amount={totalPrice} />
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
