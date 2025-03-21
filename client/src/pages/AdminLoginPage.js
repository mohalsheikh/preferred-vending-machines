// src/pages/AdminLoginPage.js
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

function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', credentials);
      const { token } = res.data;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label className="block mb-1">Username:</label>
          <input 
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input 
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 border"
          />
        </div>
        <button className="px-4 py-2 bg-green-600 text-white" type="submit">
          Login
        </button>
      </form>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}

export default AdminLoginPage;
