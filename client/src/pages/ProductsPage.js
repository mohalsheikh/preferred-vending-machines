// src/pages/ProductsPage.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  FiShoppingCart, 
  FiMoon, 
  FiSun,
  FiMapPin,
  FiPhone,
  FiMail,
  FiMenu,
  FiSearch,
  FiCheckCircle,
  FiHeart
} from 'react-icons/fi';

function ProductsPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Products' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'organic', label: 'Organic' },
    { value: 'low-sugar', label: 'Low Sugar' },
    { value: 'vegan', label: 'Vegan' },
  ];

  const productCategories = [
    {
      title: "Thirsty?",
      subtitle: "Quench your thirst with our refreshing beverages",
      groups: [
        { name: "Waters", key: "waters" },
        { name: "Specialty Waters", key: "specialty-waters" },
        { name: "Juices", key: "juices" },
        { name: "Sodas", key: "sodas" }
      ]
    },
    {
      title: "Need the Crunch?",
      subtitle: "Satisfy your cravings with our crunchy selections",
      groups: [
        { name: "Baked Crackers", key: "baked-crackers" },
        { name: "Baked Chips", key: "baked-chips" },
        { name: "Mixes", key: "mixes" },
        { name: "Crackers", key: "crackers" }
      ]
    },
    {
      title: "Guilty Pleasures",
      subtitle: "Indulge in your favorite treats",
      groups: [
        { name: "Gluten-Free Cookies", key: "gluten-free-cookies" },
        { name: "Snack Bars", key: "snack-bars" },
        { name: "Cookies", key: "cookies" },
        { name: "Childhood Memories", key: "childhood-memories" }
      ]
    },
    {
      title: "Want Something More?",
      subtitle: "Nutritious options for every need",
      groups: [
        { name: "Proteins", key: "proteins" },
        { name: "Breakfast Bites", key: "breakfast-bites" },
        { name: "No Time for Lunch", key: "no-time-lunch" },
        { name: "Yogurt", key: "yogurt" }
      ]
    }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const loadedProducts = [];
        snapshot.forEach((docSnap) => {
          loadedProducts.push({ 
            id: docSnap.id, 
            ...docSnap.data(),
            tags: docSnap.data().tags || [] 
          });
        });
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
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

  const filterProducts = (products) => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = selectedFilter === 'all' || 
        product.tags.includes(selectedFilter);

      return matchesSearch && matchesFilter;
    });
  };

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
        <title>Products - Preferred Vending</title>
        <meta name="description" content="Explore Preferred Vending's healthy vending options" />
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
            Our Healthy Selection
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-green-500 bg-clip-text text-transparent">
                Snacks & Beverages
            </span>
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            "When it comes to healthy options, our machines can't be beat! We have a large selection of products to choose from."
          </p>
        </div>
      </section>

      {/* Wellness & ADA Compliance Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-primary-100/30 dark:shadow-gray-900/50"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hidden lg:block relative w-full max-w-[400px] flex-shrink-0">
              <motion.div 
                className="absolute -top-8 -left-8 bg-primary-100/20 dark:bg-primary-900/20 p-6 rounded-2xl"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <FiSun className="w-16 h-16 text-primary-600 dark:text-primary-400" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-8 -right-8 bg-green-100/20 dark:bg-green-900/20 p-6 rounded-2xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <FiShoppingCart className="w-16 h-16 text-green-600 dark:text-green-400" />
              </motion.div>
              
              <div className="relative z-10 aspect-square bg-primary-500/10 dark:bg-primary-900/20 rounded-2xl overflow-hidden">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1995/1995450.png" 
                  alt="Wellness illustration"
                  className="w-full h-full object-contain p-8"
                />
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="p-3 bg-primary-100/50 dark:bg-primary-900/20 rounded-xl">
                    <FiSun className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </span>
                  <span className="p-3 bg-green-100/50 dark:bg-green-900/20 rounded-xl">
                    <FiShoppingCart className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  <span className="bg-gradient-to-r from-primary-600 to-green-500 bg-clip-text text-transparent">
                    Health First, Always
                  </span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-100/30 dark:bg-primary-900/20 rounded-lg">
                      <FiCheckCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      ADA Compliant Machines
                    </p>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 pl-14">
                    "All machines meet ADA compliance standards, ensuring accessibility for everyone."
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100/30 dark:bg-green-900/20 rounded-lg">
                      <FiHeart className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Wellness-Focused Solutions
                    </p>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 pl-14">
                    "Enhance your wellness programs with our curated selection of better-for-you options that keep employees, students, and visitors happy and healthy."
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <FiSearch className="h-6 w-6 text-gray-400 dark:text-gray-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-700 border-0 ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            
            <div className="relative flex-1">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full py-4 px-6 bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-700 border-0 ring-1 ring-gray-200 dark:ring-gray-700 appearance-none transition-all duration-200"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {productCategories.map((category) => (
            <div key={category.title} className="mb-20">
              <div className="text-center mb-12 space-y-2">
                <motion.h2 
                  className="text-4xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {category.title}
                </motion.h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {category.subtitle}
                </p>
              </div>

              {category.groups.map((group) => {
                const groupProducts = filterProducts(
                  products.filter(p => p.category === group.key)
                );
                
                if (groupProducts.length === 0) return null;

                return (
                  <div key={group.key} className="mb-16">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 border-b pb-4 border-gray-100 dark:border-gray-800">
                      {group.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {groupProducts.map((product) => (
                        <motion.div
                          key={product.id}
                          className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                          whileHover={{ y: -8 }}
                        >
                          <div className="relative aspect-square overflow-hidden">
                            <img 
                              src={product.imageUrl || 'https://via.placeholder.com/400x300.png?text=No+Image'}
                              alt={product.name} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-6 space-y-4">
                            <div className="space-y-2">
                              <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                                {product.name}
                              </h2>
                              <div className="flex flex-wrap gap-2">
                                {product.tags?.map((tag) => (
                                  <span 
                                    key={tag}
                                    className="px-3 py-1 text-sm font-medium rounded-full bg-primary-100/50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 backdrop-blur-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                                ${product.price?.toFixed(2)}
                              </span>
                              <motion.button
                                className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-sm hover:shadow-md"
                                whileTap={{ scale: 0.95 }}
                              >
                                <FiShoppingCart className="flex-shrink-0" /> 
                                <span className="hidden sm:inline">Add to Cart</span>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              )}
            </div>
          ))}
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
              © 2024 Preferred Vending. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProductsPage;