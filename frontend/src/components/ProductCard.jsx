import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  async function addToCart(e) {
    e.stopPropagation();
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

      toast.success("Added to cart successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("Failed to add to cart.");
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <>
      <ToastContainer />
      <Card
        sx={{
          backgroundColor: `${product.bgcolor}`, // Background color for name and price section
          color: "white",
          borderRadius: 2,
          boxShadow: 4,
          width: 200,
          height: 250,
          cursor: "pointer",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0px",
          overflow: "hidden",
        }}
        onClick={handleCardClick}
      >
        {/* Floating Discount Badge */}
        {product.discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 0, 
              left: "90%",
              transform: "translateX(-50%)",
              backgroundColor: "red",
              color: "white",
              padding: "5px 10px",
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius: "12px",
              boxShadow: 2,
              zIndex: 2,
            }}
          >
            {product.discount}%
          </Box>
        )}

        <div
          style={{
            width: "100%",
            backgroundColor: `${product.panelcolor}`, // Light pink background for image section
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <CardMedia
            component="img"
            image={product.image.url}
            alt={product.name}
            sx={{
              width: "80%",
              height: "140px",
              objectFit: "contain",
            }}
          />
        </div>

        <CardContent
          sx={{
            textAlign: "center",
            padding: "10px 5px",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ fontSize: "14px", color: `${product.textcolor}` }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "14px", color: `${product.textcolor}` }}
          >
            ${product.price}
          </Typography>
        </CardContent>

        {/* Add to Cart Button */}
        <IconButton
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            backgroundColor: "#eeeeee",
            color: `${product.textcolor}`,
            boxShadow: 2,
            borderRadius: "50%",
            padding: "5px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f8f8f8",
            },
          }}
          onClick={addToCart}
        >
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </Card>
    </>
  );
};

export default ProductCard;
