// src/pages/ServicesPage.js
import { FiCheckCircle } from 'react-icons/fi';
import React, { useState } from 'react';
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

function ServicesPage() {
  return (
    <div className="p-8">
      <Helmet>
        <title>Our Services - Preferred Vending Machines</title>
      </Helmet>
      <h1 className="text-3xl mb-4">Our Services</h1>
      <ul className="list-disc list-inside">
        <li>Machine Installation</li>
        <li>Maintenance and Restocking</li>
        <li>Flexible Machine Placement</li>
      </ul>
    </div>
  );
}

export default ServicesPage;
