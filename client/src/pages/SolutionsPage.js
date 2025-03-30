// src/pages/SolutionsPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  FiCheck,
  FiMapPin,
  FiTool,
  FiSmile,
  FiMonitor,
  FiShoppingCart,
  FiThumbsUp,
  FiCalendar,
  FiDollarSign,
  FiMenu,
  FiSun,
  FiMoon,
  FiPhone,
  FiMail
} from 'react-icons/fi';

function SolutionsPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/FAQ' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>Solutions - Preferred Vending</title>
        <meta name="description" content="Reliable vending solutions tailored to your needs" />
      </Helmet>

      {/* Navbar */}
      <motion.nav className="bg-gray-50 
       dark:bg-gray-900
       border-t border-gray-200 dark:border-gray-800">
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


      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Tailored Vending Solutions
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-green-500 bg-clip-text text-transparent">
              Built for Reliability
            </span>
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            "We deliver customized vending solutions that keep your operations running smoothly"
          </p>
        </div>
      </section>

      {/* Service Reliability Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-primary-50 dark:bg-gray-800 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  <FiThumbsUp className="inline mr-3 text-primary-600 dark:text-primary-400" />
                  Service You Can Depend On
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  “We follow consumer trends and employ your feedback, ensuring your machines are always filled with preferred options. Our service includes:”
                </p>
                <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-3">
                    <FiCheck className="w-6 h-6 text-green-500" />
                    Routine maintenance & deep cleaning
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheck className="w-6 h-6 text-green-500" />
                    Quick and efficient restocking
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheck className="w-6 h-6 text-green-500" />
                    Product assortment optimization
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheck className="w-6 h-6 text-green-500" />
                    24/7 remote monitoring
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  <FiCalendar className="inline mr-3 text-primary-600 dark:text-primary-400" />
                  Our Service Commitment
                </h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      <FiTool className="inline mr-2" />
                      Proactive Maintenance
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Regular servicing and immediate response to technical issues
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      <FiMonitor className="inline mr-2" />
                      Smart Inventory Management
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Real-time stock monitoring prevents empty machines
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      <FiSmile className="inline mr-2" />
                      Customer-Driven Selection
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Regular product rotation based on user preferences
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Area Section */}
      <section className="py-16 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FiMapPin className="inline mr-3 text-primary-600 dark:text-primary-400" />
              Serving Northern California
            </motion.h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Proudly providing services to:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {['Solano County', 'Yolo County', 'Sacramento County'].map((county, index) => (
              <motion.div
                key={county}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FiMapPin className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{county}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">California</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Why Choose Preferred Vending?
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: FiShoppingCart,
                title: 'Customized Menus',
                text: 'Tailored product selections matching your audience preferences'
              },
              { 
                icon: FiTool,
                title: 'Routine Maintenance',
                text: 'Full-service cleaning & maintenance program included'
              },
              { 
                icon: FiMonitor,
                title: 'Smart Technology',
                text: 'Remote monitoring & advanced payment systems'
              },
              { 
                icon: FiMapPin,
                title: 'Local Expertise',
                text: 'Personal service with community understanding'
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* No Extra Fees Section */}
      <section className="py-16 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-white dark:bg-gray-700 rounded-2xl p-12">
            <div className="flex-1">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <FiDollarSign className="inline mr-3 text-green-500" />
                Transparent Pricing
              </motion.h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                “No hidden fees - our solutions include:”
              </p>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-3">
                  <FiCheck className="w-6 h-6 text-green-500" />
                  ADA-compliant machines at no extra cost
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="w-6 h-6 text-green-500" />
                  Credit/debit processing fees included
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="w-6 h-6 text-green-500" />
                  Free maintenance & technical support
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="w-6 h-6 text-green-500" />
                  No long-term contracts
                </li>
              </ul>
            </div>
            <motion.div 
              className="flex-1 text-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-primary-100/20 dark:bg-primary-900/20 rounded-2xl p-8 inline-block">
                <FiThumbsUp className="w-32 h-32 text-primary-600 dark:text-primary-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="
           bg-gray-50 
           dark:bg-gray-900
           border-t border-gray-200 dark:border-gray-800">
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

export default SolutionsPage;