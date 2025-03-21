// src/pages/ContactPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiChevronRight, FiPlay, FiSettings, FiShoppingCart, FiStar, FiZap } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
// Correct imports for Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/contact', formData);
      if (res.data.success) {
        setSubmitStatus('Message sent successfully!');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('Failed to send message.');
    }
  };

  return (
    <div className="p-8">
      <Helmet>
        <title>Contact Us - Preferred Vending Machines</title>
      </Helmet>
      <h1 className="text-3xl mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input 
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input 
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Message:</label>
          <textarea 
            name="message"
            onChange={handleChange}
            value={formData.message}
            required
            className="w-full p-2 border"
            rows="5"
          />
        </div>
        <button className="px-4 py-2 bg-green-600 text-white" type="submit">Send</button>
      </form>
      {submitStatus && <p className="mt-4">{submitStatus}</p>}
    </div>
  );
}

export default ContactPage;
