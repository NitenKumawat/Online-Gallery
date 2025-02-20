import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to our Image Gallery website! We are dedicated to providing
          users with an easy-to-use platform to explore, upload, and share stunning
          images. Whether you're a photography enthusiast or just someone who loves
          to browse beautiful pictures, our gallery has something for everyone.
        </p>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to create a space where individuals can showcase their
            photographic talents, share images with the world, and connect with others
            who appreciate the art of photography. We aim to bring creativity and
            inspiration to the forefront through our interactive gallery.
          </p>
        </section>

        <section className="about-section">
          <h2>Meet Our Team</h2>
          <ul className="team-list">
            <li>
              <strong>John Doe</strong> - Founder & CEO
            </li>
            <li>
              <strong>Jane Smith</strong> - Creative Director
            </li>
            <li>
              <strong>Mark Johnson</strong> - Lead Developer
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
