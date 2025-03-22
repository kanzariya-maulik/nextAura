import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, loading } = useContext(ProductsContext);
  const product = products.find((p) => p._id === id);
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Product not found
      </Typography>
    );
  }

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const totalPrice = (product.price - (product.discount || 1) + 20) * quantity;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Header />
      <Sidebar />
      <Box sx={{ display: "flex", gap: 4, maxWidth: "900px", width: "100%" }}>
        <Card
          sx={{
            width: "300px",
            backgroundColor: product.panelcolor,
            padding: "20px",
            borderRadius: "10px",
            color: product.textcolor,
          }}
        >
          <CardMedia
            component="img"
            image={product.image.url}
            alt={product.name}
            sx={{
              height: "220px",
              objectFit: "contain",
              backgroundColor: product.bgcolor,
            }}
          />
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: 2, fontWeight: "bold" }}
          >
            {product.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <IconButton
              size="small"
              sx={{ backgroundColor: `${product.bgcolor}`, color: "white" }}
              onClick={handleDecrease}
            >
              <Remove />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 2, fontWeight: "bold" }}>
              {quantity}
            </Typography>
            <IconButton
              size="small"
              sx={{ backgroundColor: `${product.bgcolor}`, color: "white" }}
              onClick={handleIncrease}
            >
              <Add />
            </IconButton>
          </Box>
          <Typography
            variant="body1"
            sx={{
              backgroundColor: `${product.bgcolor}`,
              color: "white",
              padding: "8px",
              borderRadius: "5px",
              textAlign: "center",
              mt: 2,
            }}
          >
            Net Total: ${totalPrice}
          </Typography>
        </Card>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Price Breakdown
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Total MRP</Typography>
            <Typography>${(product.price + 20) * quantity}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Discount on MRP</Typography>
            <Typography>${(product.discount || 1) * quantity}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Platform Fee</Typography>
            <Typography>${20 * quantity}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography>Shipping Fee</Typography>
            <Typography sx={{ color: "green" }}>FREE</Typography>
          </Box>
          <hr />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              mb: 2,
            }}
          >
            <Typography variant="h6">Total Amount</Typography>
            <Typography variant="h6">${totalPrice}</Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: `${product.bgcolor}`,
              color: "white",
              padding: "10px",
              fontSize: "16px",
            }}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
