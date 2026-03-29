import React from "react";
import { Box, Typography, Chip, Button, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

/**
 * MapCard — rendered as an HTML string injected into a Leaflet popup.
 * Call MapCard.toHTML(restaurant) to get the popup string.
 *
 * Also exported as a React component for use outside the map (e.g. sidebars).
 */

// ─── Pure HTML string for Leaflet popup ─────────────────────────────────────
export function mapCardHTML(r) {
  const isFullyHalal = r.halal_status === "Fully Halal";
  const halalColor = isFullyHalal ? "#2e7d32" : "#ed6c02";
  const halalBg = isFullyHalal ? "#edf7ee" : "#fff4ec";

  return `
    <div style="
      font-family: 'DM Sans', 'Segoe UI', sans-serif;
      width: 240px;
      border-radius: 14px;
      overflow: hidden;
      background: #fff;
    ">
      <!-- Header accent bar -->
      <div style="height: 4px; background: linear-gradient(90deg, ${halalColor}, ${halalColor}88);"></div>

      <div style="padding: 14px 14px 10px;">

        <!-- Name + halal badge -->
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:6px;">
          <p style="
            margin:0; font-size:15px; font-weight:700;
            color:#111; line-height:1.3; flex:1;
          ">${r.name}</p>
          <span style="
            display:inline-flex; align-items:center; gap:3px;
            font-size:10px; font-weight:600; padding:3px 8px;
            border-radius:20px; white-space:nowrap; flex-shrink:0;
            background:${halalBg}; color:${halalColor};
            border:1px solid ${halalColor}44;
          ">
            ✓ ${r.halal_status}
          </span>
        </div>

        <!-- City -->
        <p style="
          margin:0 0 10px; font-size:12px; color:#888;
          display:flex; align-items:center; gap:4px;
        ">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="${halalColor}">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          ${r.city}
        </p>

        <!-- Divider -->
        <div style="height:1px; background:#f0f0f0; margin-bottom:10px;"></div>

        <!-- Address row -->
        <div style="display:flex; gap:8px; align-items:flex-start; margin-bottom:8px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#999" style="margin-top:1px;flex-shrink:0">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span style="font-size:12px; color:#555; line-height:1.4;">${r.address}</span>
        </div>

        <!-- Cuisine row -->
        <div style="display:flex; gap:8px; align-items:center; margin-bottom:14px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#999" style="flex-shrink:0">
            <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
          </svg>
          <span style="
            font-size:11px; padding:2px 10px; border-radius:20px;
            background:#f5f5f5; color:#555; border:1px solid #e8e8e8;
          ">${r.cuisine}</span>
        </div>

        <!-- CTA button -->
        <button
          onclick="window.dispatchEvent(new CustomEvent('mapcard-details', { detail: '${r.id}' }))"
          style="
            width:100%; padding:9px; border:none; border-radius:10px;
            background:#1a1a1a; color:#fff; font-size:13px; font-weight:600;
            cursor:pointer; font-family:inherit; letter-spacing:0.2px;
            transition:background 0.2s;
          "
          onmouseover="this.style.background='#333'"
          onmouseout="this.style.background='#1a1a1a'"
        >
          View Details →
        </button>
      </div>
    </div>
  `;
}

export default function MapCard({ restaurant: r, onViewDetails }) {
  if (!r) return null;
  const isFullyHalal = r.halalStatus === "Fully Halal";
  const halalColor = isFullyHalal ? "#2e7d32" : "#ed6c02";
  const halalBg = isFullyHalal ? "#edf7ee" : "#fff4ec";

  return (
    <Box
      sx={{
        borderRadius: "14px",
        overflow: "hidden",
        bgcolor: "background.paper",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          height: 4,
          background: `linear-gradient(90deg, ${halalColor}, ${halalColor}88)`,
        }}
      />

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1,
            mb: 0.75,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, lineHeight: 1.3, color: "text.primary" }}
          >
            {r.name}
          </Typography>
          <Chip
            size="small"
            label={r.halalStatus}
            icon={<VerifiedIcon style={{ fontSize: 12, color: halalColor }} />}
            sx={{
              bgcolor: halalBg,
              color: halalColor,
              fontWeight: 600,
              fontSize: 10,
              border: `1px solid ${halalColor}44`,
              height: 22,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1.5 }}>
          <LocationOnIcon sx={{ fontSize: 14, color: halalColor }} />
          <Typography variant="caption" color="text.secondary">
            {r.city}
          </Typography>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 1 }}>
          <LocationOnIcon
            sx={{ fontSize: 15, color: "text.disabled", mt: "1px" }}
          />
          <Typography variant="caption" color="text.secondary">
            {r.address}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
          <LocalDiningIcon sx={{ fontSize: 15, color: "text.disabled" }} />
          <Chip
            label={r.cuisine}
            size="small"
            variant="outlined"
            sx={{ fontSize: 11, height: 20 }}
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
          onClick={() => onViewDetails?.(r)}
          sx={{
            borderRadius: "10px",
            bgcolor: "#1a1a1a",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { bgcolor: "#333" },
          }}
        >
          View Details
        </Button>
      </Box>
    </Box>
  );
}
