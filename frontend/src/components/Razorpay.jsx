import React from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const RazorpayPayment = ({ amount, user }) => {
  const navigate = useNavigate();
  const handlePayment = () => {
    if (!amount || amount <= 0) {
      alert("Invalid amount for payment.");
      return;
    }

    if (!user?.contact) {
      navigate("/account", {
        state: {
          message:
            "Mobile number is required for payment. Please update your profile.",
        },
      });
      return;
    }

    const options = {
      key: "rzp_test_zHhNFsppG7bIjH",
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "nextAura",
      description: "Pay and get your order soon",
      image:
        "https://as1.ftcdn.net/v2/jpg/03/08/11/28/1000_F_308112817_S9VzVCtjEqB1BfUtGaYDaUW0zteUfk7x.jpg",
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: user.name ? user.name : "unknown",
        email: user.email ? user.email : "unknown",
        contact: user.contact,
      },
      theme: { color: "#1976D2" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handlePayment}
      sx={{ marginTop: "20px" }}
    >
      Pay ₹{amount}
    </Button>
  );
};

export default RazorpayPayment;
