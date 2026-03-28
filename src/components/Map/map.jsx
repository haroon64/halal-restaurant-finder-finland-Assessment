import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Fade,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MapCard, { mapCardHTML } from "../Map/mapCard";

export default function RestaurantMap({ restaurants = [] }) {
  console.log("Rendering Map with restaurants:", restaurants);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Mobile bottom-sheet selected card
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ─── Inject pulse keyframe + popup styles once ────────────────────────────
  useEffect(() => {
    if (document.getElementById("map-pulse-style")) return;
    const style = document.createElement("style");
    style.id = "map-pulse-style";
    style.textContent = `
      @keyframes mapPulse {
        0%   { transform: translate(-50%,-50%) scale(0.5); opacity: 0.7; }
        100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0; }
      }
      .clean-popup .leaflet-popup-content-wrapper {
        padding: 0 !important;
        border-radius: 14px !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.14) !important;
        overflow: hidden;
        border: 1px solid #f0f0f0 !important;
      }
      .clean-popup .leaflet-popup-content {
        margin: 0 !important;
        width: auto !important;
        line-height: normal !important;
      }
      .clean-popup .leaflet-popup-tip-container { margin-top: -1px; }
      .clean-popup .leaflet-popup-close-button {
        top: 8px !important; right: 8px !important;
        font-size: 18px !important; color: #999 !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // ─── Init / reinit map whenever restaurants change ────────────────────────
  useEffect(() => {
    // Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = () => {
      const L = window.L;

      // Tear down previous instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current, {
        center: [60.1699, 24.9384],
        zoom: 13,
        zoomControl: false,
        tap: true,
      });
      mapInstanceRef.current = map;

      // Tile layer
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // ── Place markers ──────────────────────────────────────────────────────
      markersRef.current = [];
      const validBounds = [];

      restaurants.forEach((r) => {
        if (r.lat == null || r.longi == null) return;

        const isFullyHalal = r.halal_status === "Fully Halal";
        const color = isFullyHalal ? "#2e7d32" : "#ed6c02";
        const ringColor = isFullyHalal ? "#2e7d3244" : "#ed6c0244";

        // Animated pulse pin
        const icon = L.divIcon({
          html: `
            <div style="position:relative;width:36px;height:36px;">
              <span style="
                position:absolute;top:50%;left:50%;
                width:34px;height:34px;border-radius:50%;
                background:${ringColor};
                animation:mapPulse 2s ease-out infinite;
              "></span>
              <span style="
                position:absolute;top:2px;left:50%;
                transform:translateX(-50%) rotate(-45deg);
                width:24px;height:24px;
                background:${color};
                border-radius:50% 50% 0 50%;
                border:2.5px solid white;
                box-shadow:0 4px 12px rgba(0,0,0,0.25);
              "></span>
            </div>`,
          className: "",
          iconSize: [36, 36],
          iconAnchor: [18, 30],
          popupAnchor: [0, -34],
        });

        const marker = L.marker([r.lat, r.longi], { icon });

        if (isMobile) {
          // Mobile: tap → bottom sheet
          marker.on("click", () => setSelectedRestaurant(r));
        } else {
          // Desktop: click → inline popup using mapCardHTML
          marker.bindPopup(mapCardHTML(r), {
            minWidth: 240,
            maxWidth: 260,
            className: "clean-popup",
            closeButton: true,
            autoPan: true,
            autoPanPaddingTopLeft: L.point(20, 80),
            autoPanPaddingBottomRight: L.point(20, 20),
          });
        }

        marker.addTo(map);
        markersRef.current.push(marker);
        validBounds.push([r.lat, r.longi]);
      });

      // ── Auto-fit map to all markers ────────────────────────────────────────
      if (validBounds.length === 1) {
        map.setView(validBounds[0], 15, { animate: true });
      } else if (validBounds.length > 1) {
        map.fitBounds(validBounds, {
          padding: [isMobile ? 48 : 64, isMobile ? 48 : 64],
          maxZoom: 15,
          animate: true,
        });
      }
    };

    // Listen for "View Details" button inside HTML popup
    const handleCardDetails = (e) => {
      const r = restaurants.find((x) => String(x.id) === String(e.detail));
      if (r) setSelectedRestaurant(r);
    };
    window.addEventListener("mapcard-details", handleCardDetails);

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      window.removeEventListener("mapcard-details", handleCardDetails);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [restaurants, isMobile]);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        py: 2,
      }}
    >
      {/* Map */}
      <Box
        ref={mapRef}
        sx={{
          borderRadius: { xs: "12px", sm: "16px" },
          overflow: "hidden",
          minHeight: { xs: 320, sm: 460 },
          height: "80%",
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        }}
      />

      {/* Legend + count */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 1 }}>
        {[
          { color: "#2e7d32", ring: "#2e7d3244", label: "Fully Halal" },
          { color: "#ed6c02", ring: "#ed6c0244", label: "Halal Options" },
        ].map(({ color, ring, label }) => (
          <Stack key={label} direction="row" alignItems="center" spacing={0.75}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: color,
                border: "2px solid white",
                boxShadow: `0 0 0 2px ${ring}`,
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              {label}
            </Typography>
          </Stack>
        ))}
        <Typography
          variant="caption"
          sx={{ ml: "auto !important", color: "text.disabled" }}
        >
          {restaurants.length} location{restaurants.length !== 1 ? "s" : ""}
        </Typography>
      </Stack>

      {/* ── Mobile backdrop ── */}
      {selectedRestaurant && isMobile && (
        <Box
          onClick={() => setSelectedRestaurant(null)}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1299,
            bgcolor: "rgba(0,0,0,0.35)",
          }}
        />
      )}

      {/* ── Mobile bottom-sheet ── */}
      <Fade in={!!(selectedRestaurant && isMobile)}>
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            px: 2,
            pb: 4,
            pt: 1.5,
            bgcolor: "background.paper",
            borderRadius: "20px 20px 0 0",
            boxShadow: "0 -4px 32px rgba(0,0,0,0.14)",
            display: selectedRestaurant && isMobile ? "block" : "none",
          }}
        >
          {/* Drag handle */}
          <Box
            sx={{
              width: 36,
              height: 4,
              borderRadius: 2,
              bgcolor: "divider",
              mx: "auto",
              mb: 2,
            }}
          />

          <IconButton
            size="small"
            onClick={() => setSelectedRestaurant(null)}
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              bgcolor: "action.hover",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {selectedRestaurant && (
            <MapCard
              restaurant={selectedRestaurant}
              onViewDetails={() => setSelectedRestaurant(null)}
            />
          )}
        </Box>
      </Fade>
    </Box>
  );
}
