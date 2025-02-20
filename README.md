# Online Gallery

## Overview
The **Online Gallery** is a full-stack web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It allows users to **upload, view, update, and delete images** in an online gallery. The platform includes **user authentication, image categorization, and filtering options**.

---

## Tech Stack

### Frontend (React + Vite)
- **React.js** - Frontend framework
- **Tailwind CSS** - For responsive UI styling
- **Axios** - For API requests
- **React Router** - For navigation

### Backend (Node.js & Express.js)
- **Express.js** - Backend framework
- **MongoDB (Mongoose)** - NoSQL database for storing user & image data
- **JWT (JSON Web Token)** - Authentication mechanism
- **Bcrypt.js** - Password hashing for security
- **CORS** - Cross-Origin Resource Sharing

---

## Project Structure

```
/OnlineGallery
│── /backend
│   │── /config
│   │   ├── db.js              # Database connection setup
│   │── /models
│   │   ├── User.js            # User schema model
│   │   ├── Image.js           # Image schema model
│   │── /routes
│   │   ├── authRoutes.js      # User authentication routes
│   │   ├── imageRoutes.js     # Routes for handling images
│   │── .env                   # Environment variables
│   │── server.js              # Main Express server file
│── /frontend
│   │── /src
│   │   ├── /components        # Reusable React components
│   │   ├── /pages             # Pages (Home, Login, Signup, Upload)
│   │   ├── /context           # Auth & Image context providers
│   │   ├── /services          # API calls using Axios
│   │   ├── App.js             # Main App component
│   │── .env                   # Environment variables
│── package.json               # Dependencies and scripts
│── README.md                  # Project documentation
```

---

## Features

### 1. User Authentication (Signup & Login)
- Secure **JWT-based authentication**.
- Passwords are **hashed with Bcrypt**.
- **AuthContext** manages user authentication globally.

### 2. Image Management (CRUD Operations)
- **Upload, View, Update, and Delete** images.
- Users can add **name, description, and category** to images.
- Images are displayed in a gallery format.

### 3. Image Filtering & Categorization
- Users can filter images by **category**.
- A search bar allows users to find specific images.

### 4. Responsive UI (Tailwind CSS)
- Fully responsive for desktops, tablets, and mobile devices.

---






## Future Enhancements
- **Cloudinary Integration** for cloud-based image storage.
- **User Profiles** to track uploaded images.
- **Pagination** for efficient image loading.
- **Admin Panel** for managing users & images.

---



## Author
Developed by **[Niten Kumwat]**.

If you find this project useful, don't forget to ⭐ the repository!

