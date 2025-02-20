import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';
import CategoryFilter from '../components/CategoryFilter';
import ImageList from '../components/ImageList';
import Modal from '../components/Modal';

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchImages = async () => {
     
      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate('/account/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch('http://localhost:3500/api/image', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error("Unauthorized! Please log in again.");
            navigate('/account/login'); // Redirect to login on 401 error
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setImages(data.imageData || []); // Set images if `imageData` exists
        setFilteredImages(data.imageData || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchImages();
  }, [navigate]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((image) => image.category === selectedCategory));
    }
  }, [selectedCategory, images]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleImageEdit = (updatedImage) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.image_id === updatedImage.image_id ? updatedImage : image
      )
    );
    setFilteredImages((prevImages) =>
      prevImages.map((image) =>
        image.image_id === updatedImage.image_id ? updatedImage : image
      )
    );
  };

  const handleImageDelete = (imageId) => {
    setImages((prevImages) => prevImages.filter((image) => image.image_id !== imageId));
    setFilteredImages((prevImages) => prevImages.filter((image) => image.image_id !== imageId));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="loading">Loading images...</div>;
  }

  return (
    <div className="gallery">
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      {filteredImages.length > 0 ? (
        <ImageList
          images={filteredImages}
          onImageClick={handleImageClick}
          onImageDelete={handleImageDelete}
          onImageEdit={handleImageEdit}
        />
      ) : (
        <div className="empty-message">No images available for this category.</div>
      )}
      {selectedImage && <Modal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default Gallery;
