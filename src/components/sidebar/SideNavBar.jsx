import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MosqueRoundedIcon from "@mui/icons-material/MosqueRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlatwareRoundedIcon from "@mui/icons-material/FlatwareRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";

export default function SideNavBar() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Restaurants");

  const navItems = [
    { text: "Restaurants", icon: <FlatwareRoundedIcon /> },
    { text: "Mosque", icon: <MosqueRoundedIcon /> },
    { text: "Favorites", icon: <FavoriteIcon /> },
    { text: "Settings", icon: <SettingsOutlinedIcon /> },
  ];

  const sidebarContent = (
    <Box
      sx={{
        width: 260,

        bgcolor: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Nordic<span style={{ color: "#2e7d32" }}>Concierge</span>
        </Typography>
        <Typography sx={{ fontWeight: 200, fontSize: 11, color: "#2e7d32" }}>
          Halal FInder Finland
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = activeItem === item.text;

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  setActiveItem(item.text);
                  if (isMobile) setOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  bgcolor: isActive ? "#e8f5e9" : "transparent",
                  color: isActive ? "#2e7d32" : "#5f6368",
                  "&:hover": {
                    bgcolor: isActive ? "#e8f5e9" : "#f1f3f4",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "#2e7d32" : "#5f6368",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      <Button
        fullWidth
        variant="contained"
        startIcon={<AddLocationAltRoundedIcon />}
        sx={{
          py: 1.2,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 600,
          bgcolor: "#2e7d32",
          "&:hover": { bgcolor: "#1b5e20" },
        }}
      >
        Add Restaurant
      </Button>
    </Box>
  );

  return (
    <>
      {isMobile && !open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            borderRadius: "0 10px 10px 0",
            bgcolor: "#2e7d32",
            color: "white",
            "&:hover": { bgcolor: "#1b5e20" },
          }}
        >
          <KeyboardArrowRightIcon sx={{ fontSize: 12 }} />
        </IconButton>
      )}

      {/* MOBILE DRAWER */}
      {isMobile ? (
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          {sidebarContent}
        </Drawer>
      ) : (
        <Box
          sx={{
            width: 260,
            height: "100vh",
            left: 0,
            top: 0,
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </>
  );
}
