import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  async function addToCart() {
    try {
      const response = await fetch("http://localhost:8080/users/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: product._id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <Card
      sx={{
        backgroundColor: product.panelcolor,
        color: product.textcolor,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        height: 450, // Fixed height for uniformity
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.image.url}
        alt={product.name}
        sx={{
          backgroundColor: product.bgcolor,
          padding: 2,
          objectFit: "contain",
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          ${product.price}
        </Typography>
        {product.discount > 0 && (
          <Typography
            variant="body2"
            sx={{ color: "red", fontWeight: "bold", mt: 1 }}
          >
            {product.discount}% OFF
          </Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: "black", color: "white" }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart();
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
