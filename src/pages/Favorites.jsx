import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Favourites() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
      }}
    >
      <AccessTimeIcon sx={{ fontSize: 60, color: "#ed6c02", mb: 2 }} />

      <Typography variant="h4" fontWeight={700} gutterBottom>
        Recent Activity
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        Your recent searches and visits will appear here soon ⏳
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#1a1a1a",
          textTransform: "none",
          borderRadius: "10px",
          px: 3,
          "&:hover": { bgcolor: "#333" },
        }}
        href="/"
      >
        Explore Restaurants
      </Button>
    </Box>
  );
}
