// src/pages/HomePage.js
import {
  FiCheckCircle,
  FiChevronRight,
  FiSettings,
  FiShoppingCart,
  FiStar,
  FiZap,
  FiMoon,
  FiSun,
  FiMapPin,
  FiPhone,
  FiMail,
  FiMenu
} from 'react-icons/fi';
import { FaCheck } from "react-icons/fa";
import { db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import 'swiper/css';
import 'swiper/css/effect-creative';
// In your main pages (e.g., HomePage, ProductsPage)
import { collection, addDoc } from 'firebase/firestore';
import Footer from './Footer';


function HomePage() {
  const navigate = useNavigate();
  const { content, loading } = useContent('homePage');

  useEffect(() => {
    const logVisit = async () => {
      await addDoc(collection(db, 'visitors'), {
        timestamp: new Date(),
        page: window.location.pathname,
        userAgent: navigator.userAgent,
      });
    };
    logVisit();
  }, []);
  

  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const [imageDimensions, setImageDimensions] = useState({
    width: 800,  // Default placeholder width
    height: 600  // Default placeholder height
  });
  
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setImageDimensions({ width: naturalWidth, height: naturalHeight });
  };

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
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>{content?.seo?.title || 'Preferred Vending'}</title>
        <meta
          name="description"
          content={
            content?.seo?.description ||
            'Premium vending solutions for businesses and schools with free installation and smart technology'
          }
        />
      </Helmet>

      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav className=" 
       bg-gray-50 
       dark:bg-gray-900
       border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
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
                    onClick={() => navigate('/contact')}
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

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 dark:from-primary-700/30 dark:to-primary-900/30" />
  <motion.div
    className="relative z-10 text-center px-4 space-y-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h1 className="text-heading font-bold text-gray-900 dark:text-white">
      {content?.hero?.title || 'Preferred'}
      <span className="block mt-4 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
        {content?.hero?.highlightedTitle || 'Vending Solutions'}
      </span>
    </h1>
    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      {content?.hero?.subtitle ||
        'Premium snacks, competitive pricing, and exceptional service'}
    </p>
    <div className="flex justify-center gap-4">
      <motion.a
        href={content?.hero?.buttonLink || '/contact'}
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-all inline-block"
        whileHover={{ scale: 1.05 }}
      >
        <FiCheckCircle />{' '}
        {content?.hero?.buttonText || 'Get Started'}
      </motion.a>
    </div>
  </motion.div>
</section>

  <section className="relative py-24 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <h2 className="text-heading font-bold">
        {content?.freeVending?.title || 'FREE Vending Machines'}
        <span className="block mt-4">
          {content?.freeVending?.subtitle || 'For Your Business or School'}
        </span>
      </h2>
      <p className="text-xl md:text-2xl max-w-3xl mx-auto">
        {content?.freeVending?.description || 'We provide full-service vending solutions at no cost to you, featuring:'}
      </p>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {content?.freeVending?.features?.map((feature, index) => {
          const [title, description] = feature.split(': ');
          return (
            <div
              key={index}
              className="p-6 bg-white/10 rounded-xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4">{title}</h3>
              <p>{description}</p>
            </div>
          );
        })}
      </div>
      
      <motion.a
        href={content?.freeVending?.buttonLink || '/contact'}
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 bg-white text-primary-600 rounded-xl shadow-2xl hover:shadow-3xl transition-all mx-auto mt-8 inline-block"
        whileHover={{ scale: 1.05 }}
      >
        {content?.freeVending?.buttonText || 'Claim Your Free Machine'}
      </motion.a>
    </motion.div>
  </div>
</section>

      <section className="py-24 bg-white dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
          {content?.technology?.title}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {content?.technology?.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content?.technology?.features?.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-primary-600 dark:text-primary-400 text-3xl mb-4">
                {feature.icon === 'FiZap' && <FiZap />}
                {feature.icon === 'FiShoppingCart' && <FiShoppingCart />}
                {feature.icon === 'FiStar' && <FiStar />}
                {feature.icon === 'FiSettings' && <FiSettings />}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
        <img
          src={content?.technology?.imageURL}
          alt="Smart Vending Technology"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>

<Footer />
    </div>
  );
}

export default HomePage;