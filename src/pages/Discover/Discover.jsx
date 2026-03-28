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
const restaurantData = [
  {
    id: 1,
    name: "Habibi Helsinki",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    rating: 4.8,
    halalStatus: "Fully Halal",
    address: "Urho Kekkosen katu 1",
    city: "Helsinki",
    phone: "+358 40 123 4567",
    website: "https://habibi.fi",
    timings: "11:00 - 21:00",
  },
  {
    id: 2,
    name: "Levant Bulevardi",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    rating: 4.5,
    halalStatus: "Halal Options",
    address: "Bulevardi 15",
    city: "Helsinki",
    phone: "+358 40 987 6543",
    website: "https://levant.fi",
    timings: "10:30 - 20:00",
  },
  {
    id: 3,
    name: "Levant Bulevardi",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    rating: 4.5,
    halalStatus: "Halal Options",
    address: "Bulevardi 15",
    city: "Helsinki",
    phone: "+358 40 987 6543",
    website: "https://levant.fi",
    timings: "10:30 - 20:00",
  },
];

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
    <Box sx={{ display: "flex", flexDirection: "row", bgcolor: "#f0f2f5" }}>
      <Box sx={{ p: 2 }}>
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
              width: "500px",
              "& .MuiTabs-indicator": { display: "none" }, // Remove the default underline
              "& .MuiTabs-flexContainer": { gap: 1.5 }, // Add spacing between tab buttons
            }}
          >
            {["Turkish", "Arab", "Pakistani", "Bangladeshi", "All"].map(
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
          <CircularProgress sx={{ m: 4 }} />
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
