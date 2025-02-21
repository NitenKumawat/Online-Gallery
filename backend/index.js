const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();


require('dotenv').config();
const port = process.env.PORT || 5000; // Default to 5000 if no PORT is provided in .env
const JWT_SECRET = process.env.JWT_SECRET;
require('./config/db');
const cors = require('cors');
app.use(cors());
const Image = require('./models/images');
const User = require('./models/User');
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token,user: { name: user.name, email: user.email }, });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
  
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: existingUser._id}, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { name: existingUser.name, email: existingUser.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }

    req.user = user; // Attach the decoded payload to the request
    next();
  });
};
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  console.log(req);
  try {
    const user = await User.findById(req.user.id, 'name email'); // Only fetch needed fields
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/image', authenticateToken, async (req, res) => {
  console.log('Received data:', req.body); // Log the data coming in

  const { image_id, name, description, location, history, category, url } = req.body;

  // Ensure all required fields are provided
  if (!image_id || !name || !description || !location || !history || !category || !url) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newImage = new Image({
      image_id,
      name,
      description,
      location,
      history,
      category,
      url,
    });

    await newImage.save();
    res.status(200).json({ message: 'Image saved successfully' });
  } catch (e) {
    console.error('Error saving image:', e);
    res.status(500).json({ message: 'Error saving image' });
  }
});




// GET endpoint to retrieve all images
app.get('/api/image',authenticateToken,async (req, res) => {
  try {
    const imageData = await Image.find();
    res.status(200).json({ imageData });
  } catch (e) {
    console.error('Error retrieving images:', e);
    res.status(500).json({ message: 'Error retrieving images' });
  }
});



// PUT endpoint to update an image by id
app.put('/api/image/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  console.log(`Updating image with ID: ${id}`, updatedData); // Debugging line

  if (Object.keys(updatedData).length === 0) {
    return res.status(400).json({ message: 'No data provided to update' });
  }

  try {
    const updatedImage = await Image.findOneAndUpdate({ _id: id }, updatedData, { new: true });

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({ message: 'Image updated successfully', updatedImage });
  } catch (e) {
    console.error('Error updating image:', e);
    res.status(500).json({ message: 'Error updating image' });
  }
});


// DELETE endpoint to delete an image by id
app.delete('/api/image/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  console.log(`Deleting image with ID: ${id}`); // Debugging line

  try {
    const deletedImage = await Image.findOneAndDelete({ image_id: id });

    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (e) {
    console.error('Error deleting image:', e);
    res.status(500).json({ message: 'Error deleting image' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
