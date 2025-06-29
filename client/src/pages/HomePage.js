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
  FiMenu,
  FiCamera,
  FiGrid,
  FiAward,
  FiClock,
  FiShield,
  FiX
} from 'react-icons/fi';
import { FaCheck, FaRegLightbulb, FaChartLine, FaBolt } from "react-icons/fa";
import { db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import { collection, addDoc } from 'firebase/firestore';
import Footer from './Footer';

import { Helmet } from 'react-helmet';

<Helmet>
  <title>Abounding Machines | Free Vending Solutions</title>
  <meta name="description" content="Get free vending machines for your school or business. We handle everything—stocking, service, and maintenance." />
  <meta name="keywords" content="free vending machines, vending services, office snacks, school vending, Abounding Machines" />
  <meta property="og:title" content="Abounding Machines" />
  <meta property="og:description" content="Free vending machines for your business or school." />
  <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
  <meta property="og:url" content="https://yourdomain.com/" />
  <link rel="canonical" href="https://yourdomain.com/" />
</Helmet>



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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading premium vending experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
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

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Improved Navigation */}
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
        {content.hero?.backgroundVideoURL ? (
  <video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  >
    <source src={content.hero.backgroundVideoURL} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
) : content.hero?.backgroundImageURL ? (
  <img 
    src={content.hero.backgroundImageURL} 
    alt="Background" 
    className="w-full h-full object-cover"
    loading="eager"
  />
) : (
<div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
)}

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')]"></div>
        </div>
        
        <motion.div
          className="relative z-10 text-center px-4 space-y-8 max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-md">
  {content?.hero?.title || 'Premium'}
  <span className="block mt-4 text-primary-700">
    {content?.hero?.highlightedTitle || 'Vending Solutions'}
  </span>
</h1>

          
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {content?.hero?.subtitle ||
              'Smart vending technology for modern businesses and schools'}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <motion.a
              href={content?.hero?.buttonLink || '/contact'}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-all inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiCheckCircle className="text-xl" />
              {content?.hero?.buttonText || 'Get Started Today'}
            </motion.a>
            
            {/* <motion.a
              href="/solutions"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-all inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGrid className="text-xl" />
              Explore Solutions
            </motion.a> */}
          </div>
        </motion.div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-10 h-16 rounded-3xl border-4 border-white/30 flex justify-center p-2">
            <motion.div 
              className="w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '2500+', label: 'Machines Installed', icon: <FiShoppingCart /> },
              { value: '98%', label: 'Uptime', icon: <FiClock /> },
              { value: '24/7', label: 'Support', icon: <FiSettings /> },
              { value: '15+', label: 'Years Experience', icon: <FiAward /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-primary-500 text-3xl mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Vending Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* <div className="inline-block bg-primary-500/10 px-4 py-1 rounded-full text-primary-600 dark:text-primary-400">
                <span className="font-medium">No Cost Solution</span>
              </div> */}
              
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                {content?.freeVending?.title || 'FREE Vending Machines'}
                <span className="block mt-4 text-primary-600">
                  {content?.freeVending?.subtitle || 'For Your Business or School'}
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                {content?.freeVending?.description || 'We provide premium vending solutions at no cost to you, featuring:'}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {content?.freeVending?.features?.map((feature, index) => {
                  const [title, description] = feature.split(': ');
                  return (
                    <motion.div
                      key={index}
                      className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-primary-500/10 p-2 rounded-lg">
                          <FiCheckCircle className="text-primary-600 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <motion.a
                href={content?.freeVending?.buttonLink || '/contact'}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {content?.freeVending?.buttonText || 'Claim Your Free Machine'}
                <FiChevronRight />
              </motion.a>
            </div>
            
            <div className="relative pb-32">
  <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
    {content?.freeVending?.images?.[0] ? (
      <img 
        src={content.freeVending.images[0]} 
        alt="Vending machine" 
        className="w-full h-auto object-cover rounded-3xl"
      />
    ) : (
      <div className="bg-gray-200 border-2 border-dashed rounded-3xl w-full h-96 flex items-center justify-center text-gray-500">
        Vending Machine Image
      </div>
    )}
  </div>
            </div>
          </div>
        </div>
      </section>

{/* Technology Section */}
<section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      {/* <div className="inline-block bg-primary-500/10 px-4 py-1 rounded-full text-primary-600 dark:text-primary-400 mb-4">
        <span className="font-medium">Innovation</span>
      </div> */}
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
        {content?.technology?.title || 'Smart Vending Technology'}
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
        {content?.technology?.subtitle || 'Advanced solutions for modern needs'}
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <div className="grid grid-cols-2 gap-8">
        {content?.technology?.features?.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="text-primary-600 text-3xl mb-4">
              {feature.icon === 'FiZap' && <FaBolt />}
              {feature.icon === 'FiShoppingCart' && <FiShoppingCart />}
              {feature.icon === 'FiStar' && <FiStar />}
              {feature.icon === 'FiSettings' && <FiSettings />}
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {feature.title || 'Smart Inventory'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.text || 'Real-time tracking and automated restocking alerts'}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-8">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          Why Choose Our Technology?
        </h3>

        <div className="space-y-6">
          {[
            {
              title: "Energy Efficient",
              desc: "Reduced power consumption with smart sensors",
              icon: <FiZap className="text-primary-600 text-xl" />
            },
            {
              title: "Real-time Analytics",
              desc: "Monitor sales and inventory from anywhere",
              icon: <FaChartLine className="text-primary-600 text-xl" />
            },
            {
              title: "Smart Payments",
              desc: "Contactless, mobile, and card payments",
              icon: <FiShoppingCart className="text-primary-600 text-xl" />
            },
            {
              title: "AI Optimization",
              desc: "Machine learning for product recommendations",
              icon: <FaRegLightbulb className="text-primary-600 text-xl" />
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mt-1">
                <div className="bg-primary-500/10 p-2 rounded-lg">
                  {item.icon}
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold dark:text-white">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="/technology"
          className="mt-8 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
          whileHover={{ x: 5 }}
        >
          Explore our technology
          <FiChevronRight />
        </motion.a>
      </div>
    </div>
  </div>
</section>

      {/* Gallery Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {content?.gallery?.title || 'Our Vending Solutions'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {content?.gallery?.subtitle || 'Innovative machines in various settings'}
            </p>
          </div>
          
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {content?.gallery?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="overflow-hidden rounded-3xl shadow-xl group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={image} 
                      alt={`Gallery ${index+1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <span className="text-white text-lg font-medium">
                          {`Smart Vending ${index+1}`}
                        </span>
                        <p className="text-gray-300 mt-1">
                          Modern solution for {index % 3 === 0 ? 'offices' : index % 3 === 1 ? 'schools' : 'public spaces'}
                        </p>
                      </div>
                    </div> */}
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-24 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Join thousands of businesses and schools benefiting from our premium vending solutions
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Free Machine
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Demo
            </motion.button>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}

<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Abounding Machines",
    "url": "https://yourdomain.com",
    "description": "We offer free vending machines for offices, schools, and organizations. No cost, no hassle.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1234567890",
      "contactType": "Customer Service"
    }
  })}
</script>


export default HomePage;