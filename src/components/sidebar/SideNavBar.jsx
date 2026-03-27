import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider 
} from '@mui/material';
import MosqueRoundedIcon from '@mui/icons-material/MosqueRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlatwareRoundedIcon from '@mui/icons-material/FlatwareRounded';
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';

export default function SideNavBar() {
  // Navigation items array to keep code clean
  const navItems = [
    { text: 'Restaurants', icon: <FlatwareRoundedIcon />, active: true },
    { text: 'Mosque', icon: <MosqueRoundedIcon />, active: false },
    { text: 'Favorites', icon: <FavoriteIcon />, active: false },
    { text: 'Settings', icon: <SettingsOutlinedIcon />, active: false },
  ];

  return (
    <Box
    className="sidenavbar"
    //   sx={{
    //     width: 280,
    //     height: '90%',
    //     bgcolor: '#f8f9fa', // Soft light gray background
    //     borderRight: '1px solid #e0e0e0',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     p: 3,
    //     position: 'fixed',
    //     // left: 0,
    //     // top: 0,
    //   }}
    >
      {/* Brand Logo Section */}
      <Box sx={{ mb: 6, display: 'flex', alignItems: 'flex-start', gap: 1.5 ,flexDirection: 'column', textAlign: 'center'}}>
   
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>
          Nordic<span style={{ color: '#2e7d32' }}>Concierge</span>
        </Typography>
         <Typography variant="h7" sx={{ fontWeight: 400, color: '#1a1a1a', letterSpacing: '-0.5px' }}>
          Nordic Concierge
        </Typography>
      </Box>

      {/* Navigation Links */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              sx={{
                borderRadius: '12px',
                py: 1.5,
                backgroundColor: item.active ? '#e8f5e9' : 'transparent',
                color: item.active ? '#2e7d32' : '#5f6368',
                '&:hover': {
                  backgroundColor: item.active ? '#e8f5e9' : '#f1f3f4',
                },
              }}
            >
              <ListItemIcon sx={{ color: item.active ? '#2e7d32' : '#5f6368', minWidth: 45 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontWeight: item.active ? 600 : 500, fontSize: '0.95rem' }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      {/* Action Button Section */}
      <Box>
        <Button
          fullWidth
          variant="contained"
          startIcon={<AddLocationAltRoundedIcon />}
          sx={{
            py: 1.5,
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            bgcolor: '#2e7d32',
            '&:hover': { bgcolor: '#1b5e20', boxShadow: '0px 4px 12px rgba(46, 125, 50, 0.2)' }
          }}
        >
          Add Restaurant
        </Button>
      </Box>
    </Box>
  );
}