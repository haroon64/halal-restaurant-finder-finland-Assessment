import { Routes, Route } from 'react-router-dom';
import Discover from './pages/Discover/Discover';
import Header from './components/header/header';
import SideNavBar from './components/sidebar/SideNavBar';
import useRestaurants from './hooks/useRestaurants';
import './App.css';
import { useState } from 'react';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ5ewZpT_FcAuxKGMpe_MbX5oKwAvZyunvXDC6qvwAy_h5tlzVAVYAZK1Y7KvZ4S08XXZCLfp9Ssri/pub?output=csv";
  const { restaurants, loading, error} = useRestaurants(csvUrl);
  return (
    <div className="app-container">
      <Header  setSearchQuery={setSearchQuery}  restaurants={restaurants}  />
      <SideNavBar className="sidenavbar"/>
      <Routes>
        <Route path="/"  element={<Discover searchQuery={searchQuery} restaurants={restaurants} 
            loading={loading} error={error} />}/> 
      </Routes>
    </div>
  )
}

export default App;