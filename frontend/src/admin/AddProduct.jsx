import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    bgcolor: "",
    panelcolor: "",
    textcolor: "",
    availability: true,
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("bgcolor", product.bgcolor);
    formData.append("panelcolor", product.panelcolor);
    formData.append("textcolor", product.textcolor);
    formData.append("availability", product.availability);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        toast.success("Product added successfully!");
        setProduct({
          name: "",
          price: "",
          discount: "",
          bgcolor: "",
          panelcolor: "",
          textcolor: "",
          availability: true,
          image: null,
          imagePreview: null,
        });
        setTimeout(() => navigate("/admin/products"), 2000);
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <Header />
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create New Product
        </Typography>
        <hr />
        <Typography variant="subtitle1" gutterBottom>
          Product Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Button
            variant="contained"
            component="label"
            style={{
              backgroundColor: "yellow",
              color: "black",
              marginBottom: "10px",
            }}
          >
            Select File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          {product.imagePreview && (
            <img
              src={product.imagePreview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "150px",
                objectFit: "cover",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            />
          )}

          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Product Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Discount Price"
            name="discount"
            type="number"
            value={product.discount}
            onChange={handleChange}
            margin="dense"
          />

          <Typography variant="subtitle1" gutterBottom>
            Panel Details
          </Typography>
          <TextField
            fullWidth
            label="Background Color"
            name="bgcolor"
            value={product.bgcolor}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Panel Color"
            name="panelcolor"
            value={product.panelcolor}
            onChange={handleChange}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Text Color"
            name="textcolor"
            value={product.textcolor}
            onChange={handleChange}
            margin="dense"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={product.availability}
                name="availability"
                onChange={handleChange}
              />
            }
            label="Available"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              backgroundColor: "#4a4a4a",
              color: "white",
              marginTop: "10px",
            }}
          >
            Create
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default AddProduct;
