// src/components/SearchInput.jsx
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";

export default function SearchInput({ setQuery, restaurants }) {
  const [localInput, setLocalInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter suggestions LIVE as the user types
  const suggestions = restaurants
    ?.filter(
      (r) =>
        r.name.toLowerCase().includes(localInput.toLowerCase()) ||
        r.city.toLowerCase().includes(localInput.toLowerCase()),
    )
    .slice(0, 5);

  const handleChange = (e) => {
    setLocalInput(e.target.value);
    setShowDropdown(true);
  };

  const triggerSearch = (value) => {
    setQuery(value);
    setLocalInput(value);
    setShowDropdown(false);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    triggerSearch(localInput);
  };

  return (
    <form
      className="search-form"
      onSubmit={handleSearchSubmit}
      style={{ position: "relative" }}
    >
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search restaurants..."
          value={localInput}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          className="search-input"
        />
        <SearchIcon className="search-icon" onClick={handleSearchSubmit} />
      </div>

      {showDropdown && localInput && (
        <div
          className="search-dropdown"
          style={{
            position: "absolute",
            background: "white",
            width: "100%",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 2000,
            borderRadius: "8px",
            marginTop: "8px",
            overflow: "hidden",
          }}
        >
          <div
            onClick={() => triggerSearch(localInput)}
            style={{
              padding: "12px",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
              borderBottom: "1px solid #eee",
            }}
          >
            <strong>Search for:</strong> "{localInput}"
          </div>

          {suggestions.map((res) => (
            <div
              key={res.id}
              onClick={() => triggerSearch(res.name)}
              style={{
                padding: "10px 15px",
                cursor: "pointer",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              <div>
                <div style={{ fontWeight: 500, fontSize: "14px" }}>
                  {res.name}
                </div>
                <div style={{ fontSize: "12px", color: "#888" }}>
                  {res.city}
                </div>
              </div>
              <span
                style={{ fontSize: "10px", color: "#2e7d32", fontWeight: 600 }}
              >
                {res.cuisine}
              </span>
            </div>
          ))}

          {suggestions.length === 0 && (
            <div style={{ padding: "12px", color: "#999", fontSize: "14px" }}>
              No matches found
            </div>
          )}
        </div>
      )}
    </form>
  );
}
