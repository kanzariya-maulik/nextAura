import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/owners/getAllUsers")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/owners/getAllUsers/${id}`).then(() => {
      setUsers(users.filter((user) => user._id !== id));
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
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
        👤 Manage Users
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Card
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 4,
                width: 280,
                minHeight: 270,
                position: "relative",
                padding: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {user.fullname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Contact:</strong> {user.contact}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Address:</strong> {user.address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Country:</strong> {user.country}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Pin Code:</strong> {user.pinCode}
                </Typography>
              </CardContent>

              {/* Action Buttons */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  right: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => navigate(`/admin/users/edit/${user._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(user._id)}
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

export default ManageUsers;
