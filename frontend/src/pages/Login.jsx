import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported for HTTP requests

const Login = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

 


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3500/login', formData);
   
      
      localStorage.setItem("token", response.data.token);
      // localStorage.setItem("username", response.data.user.name); 
      alert(response.data.message); // Display success message
      
   
      navigate("/gallery/images");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:3500/login', formData);
  //     alert(response.data.message); // Display success message
  //     navigate('/gallery/images'); // Navigate to another page after successful login
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Something went wrong');
  //   }
  // };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Log In</h2>
        {error && <p className="error">{error}</p>} {/* Display error if there's any */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <p>Do not have an account?{" "} 
           <Link to="/account/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
