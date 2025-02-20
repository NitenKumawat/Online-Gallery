
import React, { useState } from 'react';
import axios from 'axios';
import './AddPlaces.css';

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
          try {
            const response = await axios.post('http://localhost:3500/api/image', formData);
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
