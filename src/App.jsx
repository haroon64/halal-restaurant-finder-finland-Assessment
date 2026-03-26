import { Routes, Route } from 'react-router-dom';
import Discover from './pages/Discover';
import Favorites from './pages/Favorites';
import Recent from './pages/Recent';
// import Navbar from './components/Navigation/Navbar';

function App() {
  return (
    <div className="app-container">
      <Navbar /> {/* Stays visible on all pages */}
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recent" element={<Recent />} />
      </Routes>
    </div>
  )
}