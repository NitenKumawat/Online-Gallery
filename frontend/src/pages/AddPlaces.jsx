
import React, { useState } from 'react';
import axios from 'axios';
import './AddPlaces.css';


const API_URL = import.meta.env.VITE_BACKEND_URL;
const AddPlaces = () => {
    
        const [formData, setFormData] = useState({
          image_id: '',
          name: '',
          description: '',
          location: '',
          history: '',
          category: '',
          url: '',
        });
      
        const handleChange = (e) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          console.log('Form Data:', formData); // Log the form data to the console
        
          try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            if (!token) {
              alert('No token found. Please log in.');
              return;
            }
        
            const response = await axios.post(`${API_URL}/api/image`, formData, {
              headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'application/json',
              },
            });
            
            alert(response.data.message);
            setFormData({
              image_id: '',
              name: '',
              description: '',
              location: '',
              history: '',
              category: '',
              url: '',
            });
          } catch (e) {
            console.error(e);
            alert('Failed to save image data');
          }
        };
        
        
  return (
    <div className="form-container">
    <h1>Add New Images</h1>
    <form className="image-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="image_id"
        placeholder="Image ID"
        value={formData.image_id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <textarea
        name="history"
        placeholder="History"
        value={formData.history}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        type="text"
        name="url"
        placeholder="Image URL"
        value={formData.url}
        onChange={handleChange}
      />
      <button type="submit">Save Image</button>
    </form>
  </div>
  )
}

export default AddPlaces
