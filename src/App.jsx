import { Routes, Route } from 'react-router-dom';
import Discover from './pages/Discover/Discover';
import Header from './components/header/header';
import SideNavBar from './components/sidebar/SideNavBar';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header className="header" />
      <SideNavBar className="sidenavbar"/>
      <Routes>
        <Route path="/" element={<Discover />} />
      </Routes>
    </div>
  )
}

export default App;