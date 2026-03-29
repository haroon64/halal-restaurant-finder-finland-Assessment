import React, { useEffect, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";

export default function RestaurantDetailMap({ restaurant }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (document.getElementById("map-pulse-style")) return;

    const style = document.createElement("style");
    style.id = "map-pulse-style";
    style.textContent = `
      @keyframes mapPulse {
        0%   { transform: translate(-50%,-50%) scale(0.5); opacity: 0.7; }
        100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (window.L) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!restaurant?.lat || !restaurant?.longi) return;
    if (!window.L) return;

    if (mapInstanceRef.current) return;

    const L = window.L;

    const lat = Number(restaurant.lat);
    const lng = Number(restaurant.longi);

    const map = L.map(mapRef.current).setView([lat, lng], 15);
    mapInstanceRef.current = map;

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      { attribution: "© OpenStreetMap" },
    ).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [restaurant]);

  useEffect(() => {
    if (!restaurant || !mapInstanceRef.current || !window.L) return;

    const L = window.L;

    const lat = Number(restaurant.lat);
    const lng = Number(restaurant.longi);

    if (markerRef.current) {
      markerRef.current.remove();
    }

    const isFullyHalal = restaurant.halal_status === "Fully Halal";
    const color = isFullyHalal ? "#2e7d32" : "#ed6c02";
    const ringColor = isFullyHalal ? "#2e7d3244" : "#ed6c0244";

    const icon = L.divIcon({
      html: `
        <div style="position:relative; width:40px; height:40px;">
          <span style="
            position:absolute; top:50%; left:50%;
            width:40px; height:40px; border-radius:50%;
            background:${ringColor};
            animation:mapPulse 2s ease-out infinite;
            transform: translate(-50%, -50%);
            z-index: 1;
          "></span>
          
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" 
               style="position:absolute; z-index: 2; filter: drop-shadow(0 3px 5px rgba(0,0,0,0.3));">
            <path d="M12 21.35s-7-4.55-7-11.35a7 7 0 0 1 14 0c0 6.8-7 11.35-7 11.35z" 
                  fill="${color}" stroke="white" stroke-width="1.5"/>
            <circle cx="12" cy="10" r="3" fill="white" />
          </svg>
        </div>
      `,
      className: "",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    markerRef.current = L.marker([lat, lng], { icon }).addTo(
      mapInstanceRef.current,
    );

    mapInstanceRef.current.setView([lat, lng], 15, {
      animate: true,
    });
  }, [restaurant]);

  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box
        ref={mapRef}
        sx={{
          borderRadius: { xs: "12px", sm: "16px" },
          overflow: "hidden",
          minHeight: { xs: 300, sm: 420 },
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        }}
      />

      <Stack direction="row" mt={1} px={1} justifyContent="space-between">
        <Typography variant="caption" color="text.secondary">
          📍 {restaurant?.name}
        </Typography>

        <Typography variant="caption" color="text.disabled">
          {restaurant?.lat}, {restaurant?.longi}
        </Typography>
      </Stack>
    </Box>
  );
}
