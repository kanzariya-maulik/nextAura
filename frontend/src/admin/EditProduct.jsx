import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import Header from "./Header";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: 0,
    bgcolor: "",
    panelcolor: "",
    textcolor: "",
    availability: false,
    image: null,
    previewImage: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${id}`).then((response) => {
      console.log(response);
      const {
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
        availability,
        image,
      } = response.data.result;
      setProduct({
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
        availability,
        previewImage: image.url,
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({
      ...prev,
      image: file,
      previewImage: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    formData.append("discount", product.discount.toString());
    formData.append("bgcolor", product.bgcolor);
    formData.append("panelcolor", product.panelcolor);
    formData.append("textcolor", product.textcolor);
    formData.append("availability", product.availability ? "true" : "false");

    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      await axios.put(`http://localhost:8080/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: 500, margin: "auto", mt: 5 }}>
        <Typography variant="h4" mb={2}>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Discount"
            name="discount"
            type="number"
            value={product.discount}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Background Color"
            name="bgcolor"
            value={product.bgcolor}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Panel Color"
            name="panelcolor"
            value={product.panelcolor}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Text Color"
            name="textcolor"
            value={product.textcolor}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={product.availability}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    availability: e.target.checked,
                  }))
                }
              />
            }
            label="Available"
          />
          <Box mt={2}>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
            {product.previewImage && (
              <img src={product.previewImage} alt="Preview" width="100" />
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default EditProduct;
