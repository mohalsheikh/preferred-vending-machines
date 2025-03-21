// src/pages/AboutPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FiChevronRight, FiPlay, FiSettings, FiShoppingCart, FiStar, FiZap } from 'react-icons/fi';
import ReactPlayer from 'react-player';
// Correct imports for Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

function AboutPage() {
  return (
    <div className="p-8">
      <Helmet>
        <title>About Us - Preferred Vending Machines</title>
        <meta
          name="description"
          content="Learn more about Preferred Vending Machines mission and history."
        />
      </Helmet>
      <h1 className="text-3xl mb-4">About Us</h1>
      <p>
        Preferred Vending Machines has been providing top-notch vending services for over
        10 years. Our mission is to deliver reliable, smart, and healthy vending solutions
        to businesses and communities.
      </p>
    </div>
  );
}

export default AboutPage;
