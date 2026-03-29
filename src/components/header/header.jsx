import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchInput from "./search";
import NearMeIcon from "@mui/icons-material/NearMe";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import "./Header.css";

export default function Header({ setSearchQuery, restaurants }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <header className="header">
      {/* LEFT — logo + desktop nav */}
      <div className="left">
        <h1 className="logo">Verdant Halal</h1>
        <nav className="nav-links">
          <Link to="/">Discover</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/recent">Recent</Link>
        </nav>
      </div>

      <div className="right">
        <div className="search-wrapper">
          <SearchInput restaurants={restaurants} setQuery={setSearchQuery} />
        </div>

        <button className="near-btn desktop-only">
          <NearMeIcon sx={{ fontSize: 15 }} />
          <span>Near Me</span>
        </button>
        <AccountCircleSharpIcon
          className="profile-icon desktop-only"
          sx={{ fontSize: "40px" }}
        />

        <IconButton
          onClick={toggleDrawer}
          sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}
        >
          <MenuIcon sx={{ color: "#00491b" }} />
        </IconButton>
      </div>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 240, pt: 3 }} role="presentation">
          <Typography
            variant="h6"
            sx={{ px: 2.5, mb: 1, fontWeight: "bold", color: "#2e7d32" }}
          >
            Verdant Halal
          </Typography>

          <Divider sx={{ mb: 1 }} />

          <List onClick={toggleDrawer}>
            {[
              { text: "Discover", path: "/" },
              { text: "Favorites", path: "/favorites" },
              { text: "Recent", path: "/recent" },
            ].map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path}>
                <ListItemText primary={item.text} sx={{ color: "#333" }} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          {/* Near Me button */}
          <Box sx={{ px: 2, py: 1 }}>
            <button
              className="near-btn"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={toggleDrawer}
            >
              <NearMeIcon sx={{ fontSize: 15 }} />
              <span>Near Me</span>
            </button>
          </Box>

          {/* Account */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2.5,
              py: 1.5,
            }}
          >
            <AccountCircleSharpIcon
              sx={{ fontSize: "36px", color: "#00491b" }}
            />
            <Typography variant="body2" sx={{ color: "#333", fontWeight: 600 }}>
              My Account
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </header>
  );
}
