import { Routes, Route, useLocation } from "react-router-dom";
import Discover from "./pages/Discover/Discover";
import Header from "./components/header/header";
import useRestaurants from "./hooks/useRestaurants";
import "./App.css";
import { useState } from "react";
import RestaurantLayout from "./pages/Discover/sub-components/DiscoverLayout";
import RestaurantDetailPage from "./pages/Discover/Restaurants/restaurantDetail";
import SideNavBar from "./components/sidebar/SideNavBar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation(); // Used to check which page we are on

  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ5ewZpT_FcAuxKGMpe_MbX5oKwAvZyunvXDC6qvwAy_h5tlzVAVYAZK1Y7KvZ4S08XXZCLfp9Ssri/pub?output=csv";
  const { restaurants, loading, error } = useRestaurants(csvUrl);

  // Check if we are on a detail page to hide the main Header if needed
  

  return (
    <div className="app-container">
      {/* Only show the main search header if we are NOT on the detail page */}

      <Header setSearchQuery={setSearchQuery} restaurants={restaurants} />

      <Routes>
        <Route
          path="/"
          element={
            <Discover
              searchQuery={searchQuery}
              restaurants={restaurants}
              loading={loading}
              error={error}
            />
          }
        />

        {/* Updated Dynamic Route: ID is passed as a param */}
        <Route path="/restaurant/:name" element={<RestaurantLayout />}>
  
          <Route
            index
            element={<RestaurantDetailPage restaurants={restaurants} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
