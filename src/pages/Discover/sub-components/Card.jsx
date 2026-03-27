import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip, Stack, IconButton, Button, Divider } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function RestaurantCard({ restaurant }) {
  // Use the data passed from the parent
  const {
    id,
    name,
    image,
    rating,
    halalStatus,
    address,
    city,
    phone,
    website,
    timings
  } = restaurant;

  return (
    <Card sx={{ 
      width: '100%', 
      borderRadius: '16px', 
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      transition: 'transform 0.2s',
      '&:hover': { transform: 'translateY(-4px)' }
    }}>
      <Box sx={{ position: 'relative',minWidth: 350 }}>
        <CardMedia component="img" height="180" image={"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"} alt={name} />
        <Chip
          icon={<StarRoundedIcon style={{ color: '#FFB400', fontSize: '18px' }} />}
          label={rating}
          sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'rgba(255, 255, 255, 0.9)', fontWeight: 'bold' }}
        />
        <Chip
          icon={<VerifiedIcon style={{ color: 'white', fontSize: '16px' }} />}
          label={halalStatus}
          sx={{
            position: 'absolute', top: 12, right: 12,
            bgcolor: halalStatus === 'Fully Halal' ? '#2e7d32' : '#ed6c02',
            color: 'white', fontWeight: 600
          }}
        />
      </Box>

      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: '#2e7d32' }} />
          {city}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1.2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <LocationOnIcon sx={{ fontSize: 18, color: '#5f6368' }} />
            <Typography variant="body2">{address}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PhoneIcon sx={{ fontSize: 18, color: '#5f6368' }} />
            <Typography variant="body2">{phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: '#5f6368' }} />
            <Typography variant="body2">{timings}</Typography>
          </Box>
        </Stack>
        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          <Button fullWidth variant="contained" href={website} target="_blank" startIcon={<LanguageIcon />}
            sx={{ borderRadius: '8px', bgcolor: '#1a1a1a', textTransform: 'none' }}>
            Website
          </Button>
          <IconButton sx={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <FavoriteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}