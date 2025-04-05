import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    contact: "",
    address: "",
    country: "",
    pinCode: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/owners/user/${id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Failed to fetch user:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/owners/user/${id}`, userData)
      .then(() => navigate("/admin/users"))
      .catch((err) => console.error("Error updating user:", err));
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
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          ✏️ Edit User
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Full Name"
            name="fullname"
            value={userData.fullname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Contact"
            name="contact"
            value={userData.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Country"
            name="country"
            value={userData.country}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Pin Code"
            name="pinCode"
            value={userData.pinCode}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update User
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditUser;
