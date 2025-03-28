import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      handler: async function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );

        try {
          const res = await fetch("http://localhost:8080/users/order", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
            }),
          });

          const data = await res.json(); // Parse the JSON response
          console.log("Order Response:", data);

          if (res.ok) {
            navigate("/landing"); 
          } else {
            alert("Payment successful, but order update failed.");
          }
        } catch (error) {
          console.error("Error updating payment status:", error);
          alert(
            "Payment successful, but there was an issue updating the database. We will return your amount or confirm your order."
          );
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
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
