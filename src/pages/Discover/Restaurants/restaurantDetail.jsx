import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  IconButton,
  Divider,
  Grid,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";

import { useParams } from "react-router-dom";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsIcon from "@mui/icons-material/Directions";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import RestaurantDetailMap from "./restauranDetailMap";

export default function RestaurantDetailPage({ restaurants }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { name } = useParams();

  const decodedName = decodeURIComponent(name);
  const restaurant = restaurants.find((r) => r.name === decodedName);
  const [fav, setFav] = useState(false);

  if (!restaurant) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography color="text.secondary">Restaurant not found</Typography>
      </Box>
    );
  }

  const isFullyHalal = restaurant.halal_status === "Fully Halal";
  const halalColor = isFullyHalal ? "#2e7d32" : "#ed6c02";
  const halalBg = isFullyHalal ? "#edf7ee" : "#fff4ec";

  const DetailContent = (
    <Box
      sx={{
        p: { xs: 2.5, md: 3.5 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Back + actions */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton
          onClick={() => window.history.back()}
          sx={{ bgcolor: "#f5f5f5", borderRadius: "10px" }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => setFav(!fav)}
            sx={{ bgcolor: "#f5f5f5", borderRadius: "10px" }}
          >
            {fav ? (
              <FavoriteIcon sx={{ color: "#e53935" }} fontSize="small" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
          <IconButton sx={{ bgcolor: "#f5f5f5", borderRadius: "10px" }}>
            <ShareIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Box
        sx={{
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          height: { xs: 210, sm: 260 },
        }}
      >
        <Box
          component="img"
          src={restaurant.image}
          alt={restaurant.name}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
          }}
        />
        <Chip
          icon={
            <StarRoundedIcon style={{ color: "#FFB400", fontSize: "18px" }} />
          }
          label={restaurant.rating ?? "4.5"}
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: "rgba(255,255,255,0.95)",
            fontWeight: 700,
          }}
        />
        <Chip
          icon={
            <VerifiedIcon
              style={{ fontSize: "15px !important", color: "white" }}
            />
          }
          label={restaurant.halal_status}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: halalColor,
            color: "white",
            fontWeight: 700,
          }}
        />
      </Box>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
          {restaurant.name}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <LocalDiningIcon sx={{ fontSize: 16, color: halalColor }} />
          <Typography variant="body2" color="text.secondary">
            {restaurant.cuisine}
          </Typography>
        </Stack>
      </Box>

      <Divider />

      {/* Info cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: "12px",
              border: "1px solid #eee",
              bgcolor: "#fafafa",
              height: "100%",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <LocationOnIcon sx={{ color: halalColor, fontSize: 20 }} />
              <Typography variant="body2" fontWeight={700}>
                Location
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              {restaurant.address}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: "12px",
              border: "1px solid #eee",
              bgcolor: "#fafafa",
              height: "100%",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <AccessTimeIcon sx={{ color: halalColor, fontSize: 20 }} />
              <Typography variant="body2" fontWeight={700}>
                Opening Hours
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              {restaurant.timings}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          {restaurant.phone && (
            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                border: "1px solid #eee",
                bgcolor: "#fafafa",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <PhoneIcon sx={{ color: halalColor, fontSize: 20 }} />
                <Typography variant="body2" fontWeight={700}>
                  Phone
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {restaurant.phone}
              </Typography>
            </Box>
          )}

          {restaurant.website && (
            <Box
              sx={{
                p: 2,
                borderRadius: "12px",
                border: "1px solid #eee",
                bgcolor: "#fafafa",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <LanguageIcon sx={{ color: halalColor, fontSize: 20 }} />
                <Typography variant="body2" fontWeight={700}>
                  Website
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                component="a"
                href={restaurant.website}
                target="_blank"
                sx={{
                  color: halalColor,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {restaurant.website}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Stack spacing={1.5}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<DirectionsIcon />}
          href={`https://maps.google.com/?q=${restaurant.lat},${restaurant.longi}`}
          target="_blank"
          sx={{
            borderRadius: "12px",
            bgcolor: "#1a1a1a",
            textTransform: "none",
            fontWeight: 700,
            py: 1.3,
            "&:hover": { bgcolor: "#333" },
          }}
        >
          Get Directions
        </Button>
        {restaurant.website && (
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LanguageIcon />}
            href={restaurant.website}
            target="_blank"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              py: 1.3,
              borderColor: "#ddd",
              color: "text.primary",
              bgcolor: "#cacbcc",
              "&:hover": { borderColor: "#1a1a1a", bgcolor: "" },
            }}
          >
            Visit Website
          </Button>
        )}
      </Stack>
    </Box>
  );

  if (isMobile) {
    return (
      <Box
        sx={{
          height: "90vh",
          width: "100vw",
          overflowY: "scroll", // Force scroll capability
          overflowX: "hidden",
          bgcolor: "#f0f2f5",
          WebkitOverflowScrolling: "touch", // Smooth scrolling for iOS
        }}
      >
        <Box sx={{ position: "relative", top: 0, zIndex: 10 }}>
          <RestaurantDetailMap restaurant={restaurant} />
        </Box>
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: "20px 20px 0 0",
            mt: "-16px",
            position: "relative",
            zIndex: 20,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
            minHeight: "calc(100vh - 264px)",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 4,
              borderRadius: 2,
              bgcolor: "#e0e0e0",
              mx: "auto",
              mt: 1.5,
            }}
          />
          {DetailContent}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflowY: "auto",
        bgcolor: "#f0f2f5",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.06)",
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-thumb": {
          background: "#e0e0e0",
          borderRadius: 2,
        },
      }}
    >
      <Box sx={{ width: "50%", flexShrink: 0, position: "relative" }}>
        <Box sx={{ position: "absolute", inset: 16 }}>
          <Box
            sx={{
              height: "100%",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 4px 32px rgba(0,0,0,0.12)",
            }}
          >
            <RestaurantDetailMap restaurant={restaurant} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "50%",
          height: "160vh",
        }}
      >
        {DetailContent}
      </Box>
    </Box>
  );
}
