import React, { useEffect, useRef } from 'react';
import { Box, Typography, Stack, Chip, Button } from '@mui/material';

// Static Data for Finland
const staticRestaurants = [
  {
    id: 1,
    name: "Habibi Helsinki",
    lat: 60.1695,
    lng: 24.9350,
    address: "Urho Kekkosen katu 1",
    city: "Helsinki",
    cuisine: "Middle Eastern",
    halalStatus: "Fully Halal"
  },
  {
    id: 2,
    name: "Levant Kallio",
    lat: 60.1841,
    lng: 24.9498,
    address: "Bulevardi 15",
    city: "Helsinki",
    cuisine: "Syrian",
    halalStatus: "Halal Options"
  },
  {
    id: 3,
    name: "Fasila Restaurant",
    lat: 60.2005,
    lng: 24.9355,
    address: "Ratapihantie 11",
    city: "Helsinki",
    cuisine: "Somali/African",
    halalStatus: "Fully Halal"
  }
];

export default function RestaurantMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Load Leaflet CSS dynamically if not already present
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS dynamically
    const initMap = () => {
      const L = window.L;

      // Prevent double-init on React strict mode / re-renders
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapRef.current, {
        center: [60.1699, 24.9384],
        zoom: 13,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      staticRestaurants.forEach((r) => {
        const color = r.halalStatus === 'Fully Halal' ? '#2e7d32' : '#ed6c02';

        const icon = L.divIcon({
          html: `<span style="
            background-color:${color};
            width:26px;height:26px;
            display:block;
            position:relative;
            border-radius:26px 26px 0;
            transform:rotate(-45deg);
            border:2px solid white;
            box-shadow:0 3px 8px rgba(0,0,0,0.25);
          "></span>`,
          className: '',
          iconSize: [26, 26],
          iconAnchor: [13, 26],
        });

        const chipColor = r.halalStatus === 'Fully Halal' ? '#2e7d32' : '#ed6c02';

        const popupContent = `
          <div style="min-width:200px;font-family:sans-serif;">
            <p style="font-weight:600;font-size:14px;margin:0 0 2px;">${r.name}</p>
            <p style="font-size:12px;color:#666;margin:0 0 8px;">${r.address}, ${r.city}</p>
            <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;">
              <span style="font-size:11px;padding:2px 8px;border-radius:20px;background:#f0f0f0;color:#444;border:1px solid #ddd;">
                ${r.cuisine}
              </span>
              <span style="font-size:11px;padding:2px 8px;border-radius:20px;background:${chipColor};color:white;">
                ${r.halalStatus}
              </span>
            </div>
            <button
              style="display:block;width:100%;background:#1a1a1a;color:white;border:none;border-radius:6px;padding:6px;font-size:12px;cursor:pointer;"
              onclick="alert('Details for ${r.name}')"
            >
              View Details
            </button>
          </div>
        `;

        L.marker([r.lat, r.lng], { icon })
          .addTo(map)
          .bindPopup(popupContent, { minWidth: 220 });
      });
    };

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <Box sx={{ height: '100%', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', gap: 1 }}>
      {/* Map container */}
      <Box
        ref={mapRef}
        sx={{ flex: 1, borderRadius: 2, overflow: 'hidden', minHeight: 400 }}
      />

      {/* Legend */}
      <Stack direction="row" spacing={2} sx={{ px: 1 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#2e7d32', border: '2px solid white', boxShadow: 1 }} />
          <Typography variant="caption" color="text.secondary">Fully Halal</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ed6c02', border: '2px solid white', boxShadow: 1 }} />
          <Typography variant="caption" color="text.secondary">Halal Options</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}