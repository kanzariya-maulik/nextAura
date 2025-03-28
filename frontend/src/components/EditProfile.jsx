import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import axios from "axios";
import Header from "./Header";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    country: "",
    pinCode: "",
    mobileNo: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch user data from API
  useEffect(() => {
    axios
      .get("http://localhost:8080/users/getUserData", { withCredentials: true })
      .then((response) => {
        setUserData(response.data.data);
        setFormData(response.data.data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);

    axios
      .post("http://localhost:8080/users/updateUserData", formData, {
        withCredentials: true,
      })
      .then(() => alert("Details updated successfully!"))
      .catch((error) => alert("Failed to update details: " + error.message))
      .finally(() => setUpdating(false));
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box borderBottom={1} pb={1} mt={2}>
          <Typography variant="h6" fontWeight="bold">
            Edit Details
          </Typography>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2} mt={3}>
              <TextField
                label="Full Name"
                variant="outlined"
                name="fullName"
                value={formData.fullname}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Address"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Country"
                variant="outlined"
                name="country"
                value={formData.country}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Pin Code"
                variant="outlined"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Mobile No"
                variant="outlined"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email ID"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={updating}
              >
                {updating ? "Saving..." : "Save Details"}
              </Button>
            </Box>
          </form>
        )}
      </Container>
    </>
  );
};

export default Profile;
