import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  FiCheck, FiPlus, FiTrash, FiX, FiSave,
  FiMonitor, FiPackage, FiWifi, FiAlertCircle,
  FiCreditCard, FiSmartphone, FiHeart, FiSettings,
  FiSun, FiMoon, FiShoppingCart,
  FiBarChart2, FiBell, FiBattery, FiActivity, FiZap,
  FiMenu, FiMapPin, FiPhone, FiMail  // Add these new imports
} from 'react-icons/fi';





// Create a complete icons object for dynamic rendering
const icons = {
  FiBarChart2,
  FiBell,
  FiBattery,
  FiActivity,
  FiZap,
  FiMenu,
  FiMapPin,
  FiPhone,
  FiMail,
  // Include all other icons you're using
  FiCheck,
  FiMonitor,
  FiPackage,
  FiWifi,
  FiAlertCircle,
  FiCreditCard,
  FiSmartphone,
  FiHeart,
  FiSettings,
  FiSun,
  FiMoon,
  FiShoppingCart
};

const TechnologyPage = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Technology', href: '/technology' },
    { name: 'Contact', href: '/contact' },
  ];

  // Handle dark mode toggle
useEffect(() => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    setIsDark(true);
  } else {
    document.documentElement.classList.remove('dark');
    setIsDark(false);
  }
}, []);

const toggleDarkMode = () => {
  setIsDark((prev) => {
    const newMode = !prev;
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    return newMode;
  });
};

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'technologyPage');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Content not available</h2>
        <p className="text-gray-600 dark:text-gray-300">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>{content.hero.title} - Preferred Vending</title>
        <meta name="description" content={content.hero.description} />
      </Helmet>

      {/* Navigation */}
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
                onClick={toggleDarkMode}
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
      
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl font-bold text-gray-900 dark:text-white"
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

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {content.payments.title}
            </motion.h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {content.payments.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.payments.items.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="w-12 h-12 text-primary-600 dark:text-primary-400 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl">
                <FiMonitor className="w-24 h-24 text-primary-600 dark:text-primary-400 mb-8" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {content.features.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {content.features.description}
                </p>
                <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                  {content.features.items.map((item, index) => {
                    const icons = [FiPackage, FiWifi, FiAlertCircle];
                    const Icon = icons[index] || FiCheck;
                    return (
                      <li key={index} className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-green-500" />
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>

<motion.div 
  className="flex-1"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
>
  <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8">
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
      {content.smartFeatures.title}
    </h3>
    <div className="space-y-6">
      {content.smartFeatures.items.map((item, index) => {
        const Icon = icons[item.icon] || FiCheck; // Make sure you import all icons
        return (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {item.description}
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

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {content.environments.title}
            </motion.h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {content.environments.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.environments.items.map((location, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {location.title}
                </h3>
                <ul className="space-y-3">
                  {location.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <FiCheck className="w-5 h-5 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferred Vending</h3>
              <p className="text-sm">Innovating sustainable vending solutions through cutting-edge technology.</p>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-primary-600" />
                <span>123 Green Street, Eco City</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-primary-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-primary-600" />
                <span>info@preferredvending.com</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h3>
              <ul className="space-y-2">
                {['Healthy Snacks', 'Organic Drinks', 'Gluten-Free', 'Low-Sugar'].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Blog', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'FAQs'].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-600">
              © {new Date().getFullYear()} Preferred Vending. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TechnologyPage;