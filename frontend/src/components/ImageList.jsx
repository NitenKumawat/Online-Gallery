import React, { useState } from 'react';
import axios from 'axios';
import './ImageList.css';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const ImageList = ({ images, onImageClick, onImageDelete, onImageEdit }) => {
  const [editingImage, setEditingImage] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Handles the edit button click
  const handleEditButton = (image) => {
    setEditingImage(image);
    setEditFormData({ ...image });
  };

  // Handles the save action for editing
  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated');
        return;
      }
  
      const response = await axios.put(
        `${API_URL}/api/image/${editingImage._id}`, // Use _id instead of image_id if you're using MongoDB's default identifier
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
  
      console.log('Update response:', response.data);  // Log the full response for debugging
  
      alert(response.data.message);
      setEditingImage(null);
      onImageEdit(editFormData);
    } catch (error) {
      console.error('Error updating image:', error);
      alert('Failed to update image');
    }
  };
  
  

  // Handles the delete button click
  const handleDeleteButton = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.delete(`${API_URL}/api/image/${imageId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert(response.data.message);
        onImageDelete(imageId); // Call parent function to update the UI
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Failed to delete image');
      }
    }
  };
  

  // Handles changes in the edit form
  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="image-container">
      {images.length === 0 ? (
        <p>No images found</p>
      ) : (
        images.map((image) => (
          <div key={image.image_id} className="image-card">
            {editingImage?.image_id === image.image_id ? (
              // Edit form
              <div className="edit-form">
                <input
                  type="text"
                  name="name"
                  value={editFormData.name || ''}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
                <textarea
                  name="description"
                  value={editFormData.description || ''}
                  onChange={handleInputChange}
                  placeholder="Description"
                ></textarea>
                <button onClick={handleEditSubmit} className="btn btn-success">
                  Save
                </button>
                <button onClick={() => setEditingImage(null)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            ) : (
              // Display image and actions
              <>
                <img
                  src={image.url}
                  alt={image.name}
                  className="image-thumbnail"
                  onClick={() => onImageClick(image)}
                />
                <p className="image-name">{image.name}</p>
                <div>
                  <button className="btn btn-success" onClick={() => handleEditButton(image)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteButton(image.image_id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ImageList;
