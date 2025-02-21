import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import AuctionItem from './components/AuctionItem';
import PostAuction from './components/PostAuction';
import Landing from './components/Landing';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    // navigate('/signin');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <h1>AUCTION</h1>
      <div className={`app ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <aside className="sidebar">
          <button className="toggle-button" onClick={toggleSidebar}>
            &#x22EE;
          </button>
          {isSidebarOpen && (
            <nav className="nav-links">
              <Link to="/signup" className="nav-link">Signup</Link>
              <Link to="/signin" className="nav-link">Signin</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/post-auction" className="nav-link">Post Auction</Link>
              {isAuthenticated && (
                <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
              )}
            </nav>
          )}
        </aside>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auction/:id" element={<AuctionItem />} />
            <Route path="/post-auction" element={<PostAuction />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Auction App. All rights reserved.</p>
          <p>Welcome to the best place to buy and sell items through auctions!</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;