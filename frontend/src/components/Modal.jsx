import React from 'react';

const Modal = ({ image, onClose }) => {
  const handleClose = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content">
        <div className="modal-image-container">
          <img src={image.url} alt={image.name} className="modal-image" />
        </div>
        <h2>
          <strong>Name: </strong>
          {image.name}
        </h2>
        <p>
          <strong>History: </strong>
          {image.history}
        </p>
        <p>
          <strong>Category: </strong>
          {image.category}
        </p>
        <p>
          <strong>Description: </strong>
          {image.description}
        </p>
        <p>
          <strong>Location: </strong>
          {image.location}
        </p>
      </div>
    </div>
  );
};

export default Modal;
