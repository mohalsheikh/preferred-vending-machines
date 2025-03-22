// src/pages/AdminDashboard.js

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

// 1) Import Firestore functions
import { 
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase'; // <-- your firebase.js

import { 
  FiTrash, 
  FiPlus, 
  FiLogOut, 
  FiMoon, 
  FiSun, 
  FiMapPin, 
  FiPhone, 
  FiMail,
  FiMenu
} from 'react-icons/fi';

function AdminDashboard() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Products state + form
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: ''
  });

  // Contact Messages
  const [messages, setMessages] = useState([]);

  // Nav links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Technology', href: '/technology' },
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const loadedProducts = [];
        snapshot.forEach((docSnap) => {
          loadedProducts.push({ id: docSnap.id, ...docSnap.data() });
        });
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, []);

  // CREATE a new product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productsCollection = collection(db, 'products');
      const docRef = await addDoc(productsCollection, {
        name: newProduct.name,
        category: newProduct.category.toLowerCase(),
        price: parseFloat(newProduct.price),
        imageUrl: 'https://via.placeholder.com/400x300.png?text=New+Product'
      });

      const createdProduct = {
        id: docRef.id,
        name: newProduct.name,
        category: newProduct.category.toLowerCase(),
        price: parseFloat(newProduct.price),
        imageUrl: 'https://via.placeholder.com/400x300.png?text=New+Product'
      };

      setProducts([...products, createdProduct]);
      setNewProduct({ name: '', category: '', price: '' });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }; // <-- Make sure this bracket closes the handleCreate function

  // Load Contact Messages (useEffect must be at top level)
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'contactMessages'));
        const loadedMsgs = [];
        snapshot.forEach((docSnap) => {
          loadedMsgs.push({ id: docSnap.id, ...docSnap.data() });
        });
        setMessages(loadedMsgs);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    loadMessages();
  }, []);

  // DELETE product
  const handleDelete = async (productId) => {
    try {
      const productDoc = doc(db, 'products', productId);
      await deleteDoc(productDoc);
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  // Dark mode
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
        <title>Admin Dashboard - Preferred Vending</title>
        <meta name="description" content="Manage your vending solutions with Preferred Vending's admin dashboard." />
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiMenu className="text-xl text-gray-600 dark:text-gray-300" />
            </button>

            {/* Desktop Nav Links */}
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

            {/* Actions (Dark Mode + Logout) */}
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
                onClick={handleLogout}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-red-700 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <FiLogOut /> Logout
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
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
                    onClick={handleLogout}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-red-700 transition-all"
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Dashboard Content */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Admin Dashboard
          </h1>

          {/* Create Product Form */}
          <motion.div 
            className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Create New Product
            </h2>
            <form onSubmit={handleCreate} className="grid md:grid-cols-4 gap-4">
              <input 
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none"
                required
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none"
                required
              >
                <option value="">Select Category</option>
                <option value="snacks">Snacks</option>
                <option value="drinks">Drinks</option>
                <option value="healthy">Healthy</option>
              </select>
              <input 
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none"
                required
              />
              <motion.button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <FiPlus /> Create
              </motion.button>
            </form>
          </motion.div>

          {/* Products List */}
          <motion.div 
            className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              All Products
            </h2>
            <div className="space-y-4">
              {products.map((p) => (
                <div key={p.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{p.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {p.category} - ${p.price}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiTrash className="text-xl" />
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Messages List (Optional) */}
          <motion.div 
            className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Form Messages
            </h2>
            {messages.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {msg.name} (<span className="text-sm text-gray-300">{msg.email}</span>)
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{msg.message}</p>
                    <small className="text-gray-500 dark:text-gray-400 block mt-2">
                      Submitted: {msg.createdAt}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferred Vending</h3>
              <p className="text-sm">
                Innovating sustainable vending solutions through cutting-edge technology.
              </p>
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
                <span>info@PreferredVendingprovides.com</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h3>
              <ul className="space-y-2">
                {['Smart Vending', 'Inventory System', 'Mobile App', 'Analytics'].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-primary-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Blog', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-primary-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'FAQs'].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-primary-600 transition-colors">
                      {item}
                    </a>
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

export default AdminDashboard;
