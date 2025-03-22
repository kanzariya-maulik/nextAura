import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import { ProductsContext } from "../context/ProductContext";

const ProductsPage = () => {
  const { products, loading } = useContext(ProductsContext);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState("Popular");

  useEffect(() => {
    const availableProducts = products.filter(
      (product) => product.availability === true
    );
    setSortedProducts(availableProducts);
  }, [products]);

  const handleSort = (sortOption) => {
    setSortBy(sortOption);

    let sortedArray = [...products];

    if (sortOption === "Price High to Low") {
      sortedArray.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Price Low to High") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Popular") {
      sortedArray.sort((a, b) => b.popularity - a.popularity);
    }

    setSortedProducts(sortedArray);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {/* Header */}
        <Header />

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Sort Dropdown */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginY: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                All Products
              </Typography>
              <FormControl variant="outlined" size="small">
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  label="Sort by"
                >
                  <MenuItem value="Popular">Popular</MenuItem>
                  <MenuItem value="Price High to Low">
                    Price High to Low
                  </MenuItem>
                  <MenuItem value="Price Low to High">
                    Price Low to High
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Product Grid */}
            <Grid container spacing={2}>
              {sortedProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;
