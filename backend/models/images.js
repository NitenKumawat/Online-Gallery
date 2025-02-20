const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image_id: String, // Changed to String to handle non-numeric IDs
  name: String,
  description: String,
  location: String,
  history: String,
  category: String,
  url: String,
});

const ImageData = mongoose.model('imageData', imageSchema);

module.exports = ImageData;
