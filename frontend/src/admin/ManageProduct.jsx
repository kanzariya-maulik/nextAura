import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import axios from "axios";
import Header from "./Header";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => setProducts(response.data.result))
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/products/${id}`).then(() => {
      setProducts(products.filter((product) => product._id !== id));
    });
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Header />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          🛒 Manage Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate("/admin/products/add")}
        >
          Add Product
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card
              sx={{
                backgroundColor: product.bgcolor || "#fff",
                color: product.textcolor || "#000",
                borderRadius: 2,
                boxShadow: 4,
                width: "100%",
                height: 300,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Discount Badge */}
              {product.discount > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    boxShadow: 2,
                  }}
                >
                  {product.discount}% OFF
                </Box>
              )}

              {/* Product Image */}
              <CardMedia
                component="img"
                image={product.image?.url}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 140,
                  objectFit: "contain",
                  backgroundColor: product.panelcolor || "#f5f5f5",
                  padding: 2,
                }}
              />

              {/* Product Details */}
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="body2">₹{product.price}</Typography>
              </CardContent>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  pb: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<Edit />}
                  onClick={() =>
                    navigate(`/admin/products/edit/${product._id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ManageProducts;
