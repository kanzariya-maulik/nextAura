import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import axios from "axios";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:8080/owners/summary").then((res) => {
      setSummary(res.data.data);
    });
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Total Users */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#f1f3f4", padding: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summary.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Total Orders */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#f1f3f4", padding: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summary.totalOrders}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Total Revenue */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#f1f3f4", padding: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4" fontWeight="bold">
                ${summary.totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Total Products */}
        <Grid item xs={12} md={3}>
          <Card sx={{ backgroundColor: "#f1f3f4", padding: 2 }}>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summary.totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
