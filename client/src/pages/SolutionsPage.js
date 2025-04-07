import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Footer from './Footer';
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
import { FaCheck } from "react-icons/fa";


const defaultContent = {
  hero: {
    title: "Tailored Vending Solutions",
    subtitle: "Built for Reliability",
    description: `"We deliver customized vending solutions that keep your operations running smoothly"`
  },
  serviceReliability: {
    title: "Service You Can Depend On",
    description: `"We follow consumer trends and employ your feedback..."`,
    listItems: [
      "Routine maintenance & deep cleaning",
      "Quick and efficient restocking",
      "Product assortment optimization",
      "24/7 remote monitoring"
    ]
  },
  serviceCommitment: {
    title: "Our Service Commitment",
    services: [
      {
        icon: "FiTool",
        title: "Proactive Maintenance",
        text: "Regular servicing and immediate response to technical issues"
      },
      {
        icon: "FiMonitor",
        title: "Smart Inventory Management",
        text: "Real-time stock monitoring prevents empty machines"
      },
      {
        icon: "FiSmile",
        title: "Customer-Driven Selection",
        text: "Regular product rotation based on user preferences"
      }
    ]
  },
  coverageAreas: [
    "Solano County",
    "Yolo County",
    "Sacramento County"
  ],
  whyChooseUs: [
    { 
      title: 'Customized Menus',
      text: 'Tailored product selections matching your audience preferences'
    },
    { 
      title: 'Routine Maintenance',
      text: 'Full-service cleaning & maintenance program included'
    },
    { 
      title: 'Smart Technology',
      text: 'Remote monitoring & advanced payment systems'
    },
    { 
      title: 'Local Expertise',
      text: 'Personal service with community understanding'
    }
  ],
  pricing: {
    title: "Transparent Pricing",
    description: "“No hidden fees - our solutions include:”",
    listItems: [
      "ADA-compliant machines at no extra cost",
      "Credit/debit processing fees included",
      "Free maintenance & technical support",
      "No long-term contracts"
    ]
  }
};

function SolutionsPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'solutions');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchContent();
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
  

  const iconComponents = {
    'Customized Menus': FiShoppingCart,
    'Routine Maintenance': FiTool,
    'Smart Technology': FiMonitor,
    'Local Expertise': FiMapPin
  };

  const serviceIcons = {
    FiTool: FiTool,
    FiMonitor: FiMonitor,
    FiSmile: FiSmile,
    FiCalendar: FiCalendar,
    FiShoppingCart: FiShoppingCart,
    FiThumbsUp: FiThumbsUp
  };

  if (!content) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading content...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>Solutions - Preferred Vending</title>
        <meta name="description" content="Reliable vending solutions tailored to your needs" />
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

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-heading font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {content.hero.title}
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-green-500 bg-clip-text text-transparent">
              {content.hero.subtitle}
            </span>
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            {content.hero.description}
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
                  {content.serviceReliability.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {content.serviceReliability.description}
                </p>
                <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                  {content.serviceReliability.listItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <FiCheck className="w-6 h-6 text-green-500" />
                      {item}
                    </li>
                  ))}
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
                  {content.serviceCommitment.title}
                </h3>
                <div className="space-y-6">
                  {content.serviceCommitment.services.map((service, index) => {
                    const IconComponent = serviceIcons[service.icon] || FiTool;
                    return (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          <IconComponent className="inline mr-2" />
                          {service.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {service.text}
                        </p>
                      </div>
                    );
                  })}
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
            {content.coverageAreas.map((county, index) => (
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
            {content.whyChooseUs.map((feature, index) => {
              const IconComponent = iconComponents[feature.title] || FiThumbsUp;
              return (
                <motion.div
                  key={feature.title}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconComponent className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.text}</p>
                </motion.div>
              );
            })}
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
                {content.pricing.title}
              </motion.h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {content.pricing.description}
              </p>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                {content.pricing.listItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <FiCheck className="w-6 h-6 text-green-500" />
                    {item}
                  </li>
                ))}
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
      <Footer />
    </div>
  );
}

export default SolutionsPage;