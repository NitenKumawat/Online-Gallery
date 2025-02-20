import React from 'react'
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'
const LandingPage = () => {
  const token = localStorage.getItem('token');

    const navigate=useNavigate();

    const handleBtnClick=()=>{
        if (!token){
          navigate('/account/login')
          return; // If no token, redirect to login
        } 
        else{
        navigate('/gallery/images')
        return; 
        }
        
      }
  return (
   <>
<div className="landing-page">

    <h1>Welcome to Turisto</h1>
    <p>Discover stunning images and timeless creativity.</p>
    <button className="cta-button1" onClick={()=>handleBtnClick()}>Explore Gallery</button>
 </div>


   </>
  )
}

export default LandingPage;