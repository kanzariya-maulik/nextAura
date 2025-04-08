import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import { ProductsContext } from "../context/ProductContext";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get("query") || "";
  const { products, loading } = useContext(ProductsContext);

  const [sortBy, setSortBy] = useState("Popular");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      const lowerQuery = query.toLowerCase().trim();

      let filtered = products.filter((product) => {
        const matchesName = product.name?.toLowerCase().includes(lowerQuery);
        const matchesPrice =
          !isNaN(Number(lowerQuery)) && product.price === Number(lowerQuery);

        return matchesName || matchesPrice;
      });

      if (sortBy === "Price High to Low") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === "Price Low to High") {
        filtered.sort((a, b) => a.price - b.price);
      } else {
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      }

      setSortedProducts(filtered);
    }
  }, [query, sortBy, loading, products]);

  const handleSort = (option) => setSortBy(option);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Header />
          {loading ? (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginY: 2,
                  paddingX: 2,
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  Search results for "{query}"
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

              {sortedProducts.length === 0 ? (
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", marginTop: 4 }}
                >
                  No products found matching "{query}".
                </Typography>
              ) : (
                <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
                  {sortedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SearchResults;
