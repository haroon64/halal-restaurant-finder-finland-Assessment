import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import RestaurantCard from "../Discover/sub-components/Card";
import RestaurantMap from "../../components/Map/map";
import useRestaurants from "../../hooks/useRestaurants";
import SideNavBar from "../../components/sidebar/SideNavBar";

export default function Discover({ searchQuery, restaurants, loading, error }) {
  const [tabValue, setTabValue] = React.useState("All");

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const filteredRestaurants = restaurants.filter((r) => {
    // A: Search Filter
    const matchesSearch = r.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesTab = tabValue === "All" || r.cuisine === tabValue;

    return matchesSearch && matchesTab;
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // Keeps your internal items side-by-side
        bgcolor: "#f0f2f5",
      }}
    >
      <SideNavBar />
      <Box sx={{ p: 2, maxWidth: "450px" }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "#123f06", letterSpacing: "-0.5px" }}
          >
            Top Halal Restaurant
          </Typography>
        </Box>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            flexDirection: "column",
            textAlign: "flex-start",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              maxWidth: { sm: 400, md: "100%" },
              minwidth: "200px",
              width: "500px",
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTabs-flexContainer": { gap: 1.5 },
            }}
          >
            {["All", "Turkish", "Arab", "Pakistani", "Bangladeshi"].map(
              (label) => (
                <Tab
                  key={label}
                  value={label}
                  label={label}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    minHeight: "40px",
                    width: "auto",
                    borderRadius: "20px",
                    px: 3,
                    color: "#5f6368", // Unselected text color
                    border: "1px solid #e0e0e0",
                    transition: "all 0.2s",
                    "&.Mui-selected": {
                      color: "#ffffff !important",
                      backgroundColor: "#00491b", // Your brand green
                      borderColor: "#00491b",
                    },
                    "&:hover": {
                      backgroundColor:
                        tabValue === label ? "#00491b" : "#f1f3f4",
                    },
                  }}
                />
              ),
            )}
          </Tabs>
        </Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh", // Adjust based on your header height
              width: "100%",
            }}
          >
            <CircularProgress sx={{ color: "#00491b" }} />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box
            sx={{
              height: "80vh", // adjust to fit your layout, e.g. '600px'
              overflowY: "auto",

              // paddingBottom: "100px",

              pr: 1, // keeps scrollbar from overlapping cards
              "&::-webkit-scrollbar": { width: 6 },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                background: "#ccc",
                borderRadius: 3,
              },
            }}
          >
            <Container sx={{ pb: "100px" }}>
              <Grid container spacing={3}>
                {filteredRestaurants.length > 0 ? (
                  filteredRestaurants.map((r, i) => (
                    <RestaurantCard key={i} restaurant={r} />
                  ))
                ) : (
                  <Typography>No results found</Typography>
                )}
              </Grid>
            </Container>
          </Box>
        )}
      </Box>

      <RestaurantMap restaurants={filteredRestaurants} />
    </Box>
  );
}
