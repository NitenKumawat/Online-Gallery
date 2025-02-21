import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Navbar.css"; // Include your CSS file here

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token"); // Define the token
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }
        // Make the API call to fetch user profile
        const response = await axios.get(`${API_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          setUser(response.data); // Example response: { name: "niten", email: "niten@gmail.com" }
        } else {
          console.error("Unexpected response:", response);
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setUser(null);
      }
    };
  
    fetchUserProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/account/login");
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">OG</Link>
        </div>
        <div className="navbar-links">
          <ul className="navbar-menu">
            <li className="navbar-item">
              <Link to="/">Home</Link>
            </li>
            {token &&(
              <li className="navbar-item">
              <Link to="/gallery/images">Gallery</Link>
            </li>
            )}
            
            <li className="navbar-item">
              <Link to="/gallery/about">About</Link>
            </li>
            <li className="navbar-item">
              <Link to="/gallery/contact">Contact</Link>
            </li>

            {token ? (
              <>
                <li className="navbar-item">
                  <span className="wel-user">Welcome, {user?.name || "User"}</span>
                </li>
                <li className="navbar-item">
                <span className="logoutbtn" onClick={handleLogout}>Logout</span>
                  
                </li>
              </>
            ) : (
              <>
                <li className="navbar-item">
                  <Link to="/account/login">Login</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/account/signup">Signup</Link>
                </li>
              </>
            )}

            {token && (
              <li className="navbar-item">
                <Link to="/post/imagedata">Add New</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-search">
          <form>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
