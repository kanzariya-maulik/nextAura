import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/users/getUserData",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (
      user &&
      (!user.contact || !user.fullname || !user.address || !user.email)
    ) {
      toast.warn("Some profile details are missing. Please edit your profile.");
    }
  }, [user]);

  const handleEdit = () => {
    navigate("/account/edit");
  };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8080/logout", {
      method: "GET",
      credentials: "include",
    });
    if (response.status) {
      toast.success("Logged Out!");
      document.cookie = "";
      setTimeout(() => navigate("/"), 1500);
    } else {
      toast.error("Failed to log out");
      console.log(response);
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      <Box
        display="flex"
        sx={{ bgcolor: "#f8f9fa", marginTop: "10px", height: "50%" }}
      >
        {/* Sidebar */}
        <Box
          width={280}
          padding={3}
          bgcolor="#ffffff"
          sx={{ borderRight: "1px solid #ddd", minHeight: "100vh" }}
        >
          <List>
            <ListItem>
              <Link
                to="/account"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary="Details" />
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to="/account/orders"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary="My Orders" />
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to="/account/changepassword"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary="Change Password" />
              </Link>
            </ListItem>
          </List>
          <Typography
            variant="body1"
            color="error"
            sx={{
              cursor: "pointer",
              fontWeight: "bold",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={handleLogout}
          >
            Log Out
          </Typography>
        </Box>

        {/* Profile Details Section */}
        <Box flex={1} padding={4} mx="auto" maxWidth="800px">
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Personal Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Full Name:</strong> {user?.fullname || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Address:</strong> {user?.address || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Country:</strong> {user?.country || "N/A"} &nbsp;&nbsp;{" "}
              <strong>Pin Code:</strong> {user?.pinCode || "N/A"}
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Contact Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Mobile No.:</strong> {user?.contact || "N/A"}
            </Typography>
            <Typography variant="body1">
              <strong>Email ID:</strong> {user?.email || "Missing"}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleEdit}
          >
            Edit Details
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
