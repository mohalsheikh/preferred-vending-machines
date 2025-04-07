// // src/pages/AboutPage.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Footer from './Footer';
import { 
  FiCheckCircle, 
  FiUsers, 
  FiHeart,
  FiGlobe,
  FiMapPin,
  FiPackage,
  FiSun,
  FiShoppingCart,
  FiMail,
  FiPhone,
  FiMenu,
  FiMoon
} from 'react-icons/fi';
import { FaCheck } from "react-icons/fa";
import * as FiIcons from 'react-icons/fi';

function AboutPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Technology', href: '/technology' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/FAQ' },
    { name: 'Contact', href: '/contact' }
  ];
  

  // Using onSnapshot for real‑time updates from Firestore.
  useEffect(() => {
    const docRef = doc(db, 'aboutPage', 'content');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setContent(docSnap.data());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const renderIcon = (iconName) => {
    const IconComponent = FiIcons[iconName];
    return IconComponent ? <IconComponent className="text-4xl text-primary-600 mb-4" /> : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>{content.meta?.title || 'About Us - Preferred Vending'}</title>
        <meta name="description" content={content.meta?.description || "Discover Preferred Vending's story, mission, and commitment to local communities through premium vending solutions"} />
      </Helmet>

      {/* Navbar */}
      <motion.nav className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              <span className="text-2xl font-bold gradient-text">
                Preferred <span className="font-light">Vending</span>
              </span>
            </motion.div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiMenu className="text-xl text-gray-600 dark:text-gray-300" />
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <motion.button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ rotate: 15 }}
              >
                {isDark ? (
                  <FiSun className="text-xl text-yellow-400" />
                ) : (
                  <FiMoon className="text-xl text-gray-600" />
                )}
              </motion.button>

              <motion.button
                onClick={() => navigate('/contact')}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <FaCheck /> Get Started
              </motion.button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {isDark ? (
                      <FiSun className="text-xl text-yellow-400" />
                    ) : (
                      <FiMoon className="text-xl text-gray-600" />
                    )}
                  </button>
                  <button
                    className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
                  >
                    <FiShoppingCart /> Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Founder Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-heading font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {content.founderSection.title}
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-green-500 bg-clip-text text-transparent">
              {content.founderSection.subtitle}
            </span>
          </motion.h1>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={content.founderSection.imageUrl} 
                alt="Founder" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="text-left space-y-6">
              <h2 className="text-3xl font-bold dark:text-white">
                "{content.founderSection.heading}"
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {content.founderSection.description}
              </p>
              <ul className="space-y-4">
                {content.founderSection.bulletPoints.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FiCheckCircle className="text-primary-600 text-xl flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16">
            Our Guiding Principles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {content.missionPrinciples.map((principle, index) => (
              <motion.div 
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                whileHover={{ y: -10 }}
              >
                {renderIcon(principle.icon)}
                <h3 className="text-2xl font-bold dark:text-white mb-2">{principle.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Emphasis Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              {content.localEmphasis.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {content.localEmphasis.description}
            </p>
            <ul className="space-y-4">
              {content.localEmphasis.bulletPoints.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FiCheckCircle className="text-primary-600 text-xl flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={content.localEmphasis.imageUrl} 
              alt="Local Service" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Community Commitment Section */}
      <section className="py-24 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Beyond Vending Machines
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.communityCommitment.map((commitment, index) => (
              <motion.div 
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center"
                whileHover={{ y: -10 }}
              >
                {renderIcon(commitment.icon)}
                <h3 className="text-xl font-bold dark:text-white mb-2">{commitment.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {commitment.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-primary-50 dark:bg-gray-800 rounded-2xl">
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <p className="font-bold">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold dark:text-white">{member.name}</h3>
                <p className="text-primary-600 mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400">{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;
