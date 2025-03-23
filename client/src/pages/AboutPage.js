// src/pages/AboutPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
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

function AboutPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Technology', href: '/technology' },
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/FAQ' }
  ];

  const team = [
    { name: 'Rusty Popp', role: 'Founder & CEO', exp: '20+ years in vending industry', img: 'https://via.placeholder.com/200' },
    { name: 'Service Team', role: 'Local Experts', exp: '24/7 maintenance crew', img: 'https://via.placeholder.com/200' },
    { name: 'Nutritionists', role: 'Product Curators', exp: 'Healthy options specialists', img: 'https://via.placeholder.com/200' },
  ];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>About Us - Preferred Vending</title>
        <meta name="description" content="Discover Preferred Vending's story, mission, and commitment to local communities through premium vending solutions" />
      </Helmet>

      {/* Navbar */}
      <motion.nav className="fixed w-full z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 shadow-sm">
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
                <FiShoppingCart /> Get Started
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
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Story
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              From Local Roots to Regional Service
            </span>
          </motion.h1>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://via.placeholder.com/600x400.png?text=Rusty+Popp+Founder" 
                alt="Rusty Popp Founder" 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="text-left space-y-6">
              <h2 className="text-3xl font-bold dark:text-white">
                "Building Better Vending Experiences"
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Founded by Rusty Popp in 2003, Preferred Vending began with a simple mission: provide 
                high-quality vending solutions that benefit both businesses and their patrons. 
                What started as a single machine in a local factory has grown into a regional leader 
                through our commitment to:
              </p>
              <ul className="space-y-4">
                {['Premium equipment maintenance', 'Competitive pricing models', 'Diverse product selection', 'Community-focused service'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
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
            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <FiUsers className="text-4xl text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold dark:text-white mb-2">Customer First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                "Only the Best for Your Customers, Employees, and Company"
              </p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <FiPackage className="text-4xl text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold dark:text-white mb-2">Product Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Curated selection of snacks for every stage of healthy eating
              </p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <FiGlobe className="text-4xl text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold dark:text-white mb-2">Local Commitment</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Same-day service powered by remote inventory monitoring
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Emphasis Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Community Focused Service
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              As a locally-owned business, we understand the importance of reliable service:
            </p>
            <ul className="space-y-4">
              {['24/7 emergency maintenance', 'Bi-weekly freshness rotations', 'Seasonal product updates', 'Community donation program'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <FiCheckCircle className="text-primary-600 text-xl flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://via.placeholder.com/600x400.png?text=Local+Service+Team+in+Action" 
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
            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center"
              whileHover={{ y: -10 }}
            >
              <FiHeart className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold dark:text-white mb-2">We Give Back</h3>
              <p className="text-gray-600 dark:text-gray-400">
                5% of profits support local food banks and youth programs
              </p>
            </motion.div>

            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center"
              whileHover={{ y: -10 }}
            >
              <FiGlobe className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold dark:text-white mb-2">Eco-Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Energy-efficient machines and recycling initiatives
              </p>
            </motion.div>

            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center"
              whileHover={{ y: -10 }}
            >
              <FiUsers className="text-4xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold dark:text-white mb-2">Local Jobs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                90% of our team lives within 50 miles of our clients
              </p>
            </motion.div>
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
            <div className="p-6 bg-primary-50 dark:bg-gray-800 rounded-2xl">
              <p className="text-lg italic mb-4">
                "Preferred Vending transformed our break room with modern machines that employees love. 
                Their local team keeps everything running perfectly."
              </p>
              <p className="font-bold">- Manufacturing Plant Manager</p>
            </div>
            <div className="p-6 bg-primary-50 dark:bg-gray-800 rounded-2xl">
              <p className="text-lg italic mb-4">
                "The healthy options and reliable service have made this partnership invaluable 
                for our school district."
              </p>
              <p className="font-bold">- School District Administrator</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferred Vending</h3>
              <p className="text-sm">Innovating vending solutions through cutting-edge technology</p>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-primary-600" />
                <span>123 Commerce Street, Business City</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-primary-600" />
                <span>+1 (888) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-primary-600" />
                <span>contact@PreferredVending.com</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h3>
              <ul className="space-y-2">
                {['Snack Machines', 'Beverage Machines', 'Micro Markets', 'Smart Fridges'].map((item) => (
                  <li key={item}>
                    <a href="/products" className="hover:text-primary-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Blog', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="/about" className="hover:text-primary-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Accessibility', 'FAQs'].map((item) => (
                  <li key={item}>
                    <a href="/legal" className="hover:text-primary-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-600">
              © 2024 Preferred Vending. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;