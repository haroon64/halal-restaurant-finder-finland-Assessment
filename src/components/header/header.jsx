// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchInput from './search';
import NearMeIcon from '@mui/icons-material/NearMe';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      {/* Left Side */}
      <div className="left">
        <h1 className="logo">Verdant Halal</h1>

        <nav className="nav-links">
          <Link to="/">Discover</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/recent">Recent</Link>
        </nav>
      </div>

        {/* Right Side */}
        <div className="right">
            <SearchInput />
            <div className="near-btn">
            <p sx={{ fontSize: 10 }}>Near Me</p>
                <NearMeIcon  sx={{ fontSize: 15 }} />
            </div>
            <AccountCircleSharpIcon  sx={{ fontSize: '40px' }} />
        </div>
    </header>
);
}