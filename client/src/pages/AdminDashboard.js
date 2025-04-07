// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { 
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { 
  FiTrash, 
  FiPlus, 
  FiLogOut, 
  FiMoon, 
  FiSun, 
  FiMapPin, 
  FiPhone, 
  FiMail,
  FiMenu,
  FiEdit,
  FiSave,
  FiChevronDown,
  FiChevronUp,
  FiX,
  FiCheck,
  FiUser,
  FiMessageSquare,
  FiShoppingBag,
  FiHelpCircle,
  FiHome,
  FiSettings,
  FiGrid
} from 'react-icons/fi';

const CATEGORY_OPTIONS = [
  'waters',
  'specialty-waters',
  'juices',
  'sodas',
  'baked-crackers',
  'baked-chips',
  'mixes',
  'crackers',
  'gluten-free-cookies',
  'snack-bars',
  'cookies',
  'childhood-memories',
  'proteins',
  'breakfast-bites',
  'no-time-lunch',
  'yogurt'
];

const FAQ_CATEGORIES = [
  'General',
  'Products',
  'Orders',
  'Delivery',
  'Payment',
  'Technical'
];

const adminNavLinks = [
  { name: 'Dashboard', href: '/admin', icon: <FiGrid /> },
  { name: 'Products', href: '#products', icon: <FiShoppingBag /> },
  { name: 'FAQs', href: '#faqs', icon: <FiHelpCircle /> },
  { name: 'Messages', href: '#messages', icon: <FiMessageSquare /> },
  { name: 'Edit Homepage', href: '/admin/edit-home', icon: <FiHome /> },
  { name: 'Settings', href: '/admin/settings', icon: <FiSettings /> }
];

const publicNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Technology', href: '/technology' },
  { name: 'Products', href: '/products' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'FAQ', href: '/FAQ' }
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    imageLink: '',
    tags: []
  });
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', order: '', category: '' });
  const [imageFile, setImageFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('order');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeTab, setActiveTab] = useState('products');
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isCreatingFAQ, setIsCreatingFAQ] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const loadedProducts = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            tags: Array.isArray(data.tags) ? data.tags : []
          };
        });
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    const loadFAQs = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'faqs'));
        setFaqs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error loading FAQs:', error);
      }
    };

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

    loadProducts();
    loadFAQs();
    loadMessages();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    let finalImageUrl = 'https://via.placeholder.com/400x300.png?text=New+Product';

    try {
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      } else if (newProduct.imageLink) {
        finalImageUrl = newProduct.imageLink;
      }

      const docRef = await addDoc(collection(db, 'products'), {
        ...newProduct,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        imageUrl: finalImageUrl,
        tags: newProduct.tags.filter(tag => tag.trim() !== '')
      });

      setProducts([...products, {
        id: docRef.id,
        ...newProduct,
        price: parseFloat(newProduct.price),
        imageUrl: finalImageUrl,
        tags: newProduct.tags
      }]);

      setNewProduct({ name: '', category: '', price: '', imageLink: '', tags: [] });
      setImageFile(null);
      setIsCreatingProduct(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(products.filter((p) => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleFAQCreate = async () => {
    try {
      const docRef = await addDoc(collection(db, 'faqs'), {
        ...newFAQ,
        order: parseInt(newFAQ.order) || 0
      });
      setFaqs([...faqs, { ...newFAQ, id: docRef.id }]);
      setNewFAQ({ question: '', answer: '', order: '', category: '' });
      setIsCreatingFAQ(false);
    } catch (error) {
      console.error('Error creating FAQ:', error);
    }
  };

  const handleFAQUpdate = async (faqId, updatedData) => {
    try {
      await updateDoc(doc(db, 'faqs', faqId), updatedData);
      setFaqs(faqs.map(faq => 
        faq.id === faqId ? { ...faq, ...updatedData } : faq
      ));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const handleFAQDelete = async (faqId) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteDoc(doc(db, 'faqs', faqId));
        setFaqs(faqs.filter(faq => faq.id !== faqId));
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const filteredFaqs = faqs
    .filter(faq => 
      selectedCategory === 'all' ? true : faq.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortBy === 'order') {
        return sortOrder === 'asc' ? a.order - b.order : b.order - a.order;
      }
      const aValue = a[sortBy]?.toLowerCase() || '';
      const bValue = b[sortBy]?.toLowerCase() || '';
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex">
      <Helmet>
        <title>Admin Dashboard - Preferred Vending</title>
        <meta name="description" content="Manage your vending solutions with Preferred Vending's admin dashboard." />
      </Helmet>

      {/* Sidebar */}
      <motion.div 
        className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 fixed h-full z-20`}
        initial={{ x: 0 }}
        animate={{ x: 0 }}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          {isSidebarOpen ? (
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              <span className="text-xl font-bold gradient-text">
                PV <span className="font-light">Admin</span>
              </span>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center w-full">
              <span className="text-xl font-bold">PV</span>
            </motion.div>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? (
              <FiChevronDown className="transform rotate-90 text-gray-600 dark:text-gray-300" />
            ) : (
              <FiChevronUp className="transform rotate-90 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {adminNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 ${activeTab === link.name.toLowerCase() ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={(e) => {
                  if (link.href.startsWith('#')) {
                    e.preventDefault();
                    setActiveTab(link.href.substring(1));
                  }
                }}
              >
                <span className="text-lg mr-3">{link.icon}</span>
                {isSidebarOpen && link.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            <FiLogOut className="mr-2" />
            {isSidebarOpen && 'Logout'}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-4"
              >
                <FiMenu className="text-xl text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? (
                  <FiSun className="text-xl text-yellow-400" />
                ) : (
                  <FiMoon className="text-xl text-gray-600" />
                )}
              </button>

              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FiUser className="text-xl text-gray-600 dark:text-gray-300" />
                </button>
                <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-4 space-y-2">
                {publicNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Products</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{products.length}</h3>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  <FiShoppingBag className="text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active FAQs</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{faqs.length}</h3>
                </div>
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                  <FiHelpCircle className="text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">New Messages</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{messages.length}</h3>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                  <FiMessageSquare className="text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <section id="products" className={`${activeTab === 'products' ? 'block' : 'hidden'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Products</h2>
                <button
                  onClick={() => setIsCreatingProduct(!isCreatingProduct)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
                >
                  <FiPlus /> {isCreatingProduct ? 'Cancel' : 'Add Product'}
                </button>
              </div>

              {/* Create Product Form */}
              <AnimatePresence>
                {isCreatingProduct && (
                  <motion.div 
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Product Name</label>
                        <input 
                          type="text"
                          placeholder="Product Name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                          required
                        >
                          <option value="">Select Category</option>
                          {CATEGORY_OPTIONS.map(category => (
                            <option key={category} value={category}>
                              {category.replace(/-/g, ' ').toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                        <input 
                          type="number"
                          placeholder="Price"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                        <input
                          type="text"
                          placeholder="Tags (comma separated)"
                          value={newProduct.tags.join(', ')}
                          onChange={(e) => setNewProduct({ 
                            ...newProduct, 
                            tags: e.target.value.split(',').map(tag => tag.trim())
                          })}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image Link (optional)</label>
                        <input
                          type="text"
                          placeholder="Image Link (optional)"
                          value={newProduct.imageLink}
                          onChange={(e) => setNewProduct({ ...newProduct, imageLink: e.target.value })}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Or Upload Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      <div className="md:col-span-2 pt-2">
                        <motion.button
                          type="submit"
                          className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors"
                          whileHover={{ scale: 1.02 }}
                        >
                          <FiPlus /> Create Product
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Products List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    {searchTerm ? 'No products match your search.' : 'No products available.'}
                  </div>
                ) : (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {p.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {p.category.replace(/-/g, ' ')} - ${p.price?.toFixed(2)}
                          </p>
                          {(p.tags?.length > 0) && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {p.tags.map(tag => (
                                <span 
                                  key={tag}
                                  className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <FiTrash className="text-xl" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faqs" className={`${activeTab === 'faqs' ? 'block' : 'hidden'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                <button
                  onClick={() => setIsCreatingFAQ(!isCreatingFAQ)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <FiPlus /> {isCreatingFAQ ? 'Cancel' : 'Add FAQ'}
                </button>
              </div>

              {/* Create FAQ Form */}
              <AnimatePresence>
                {isCreatingFAQ && (
                  <motion.div 
                    className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Question</label>
                        <input
                          type="text"
                          placeholder="Question"
                          value={newFAQ.question}
                          onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select
                          value={newFAQ.category}
                          onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                          required
                        >
                          <option value="">Select Category</option>
                          {FAQ_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Order</label>
                        <input
                          type="number"
                          placeholder="Order"
                          value={newFAQ.order}
                          onChange={(e) => setNewFAQ({ ...newFAQ, order: e.target.value })}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Answer</label>
                        <textarea
                          placeholder="Answer"
                          value={newFAQ.answer}
                          onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border border-gray-300 dark:border-gray-600"
                          rows={3}
                          required
                        />
                      </div>

                      <div className="md:col-span-2 pt-2">
                        <button
                          onClick={handleFAQCreate}
                          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                        >
                          <FiPlus /> Add FAQ
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FAQ Filters */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-wrap gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                  >
                    <option value="all">All Categories</option>
                    {FAQ_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                  >
                    <option value="order">Order</option>
                    <option value="question">Question</option>
                    <option value="category">Category</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Order</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>

              {/* FAQs List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredFaqs.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No FAQs available for the selected category.
                  </div>
                ) : (
                  filteredFaqs.map((faq) => (
                    <div key={faq.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      {editingId === faq.id ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Question</label>
                            <input
                              value={faq.question}
                              onChange={(e) => handleFAQUpdate(faq.id, { question: e.target.value })}
                              className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Answer</label>
                            <textarea
                              value={faq.answer}
                              onChange={(e) => handleFAQUpdate(faq.id, { answer: e.target.value })}
                              className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Order</label>
                              <input
                                type="number"
                                value={faq.order}
                                onChange={(e) => handleFAQUpdate(faq.id, { order: parseInt(e.target.value) || 0 })}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                              <select
                                value={faq.category}
                                onChange={(e) => handleFAQUpdate(faq.id, { category: e.target.value })}
                                className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                              >
                                {FAQ_CATEGORIES.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end pt-2">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                            >
                              <FiSave /> Save Changes
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">{faq.answer}</p>
                            <div className="mt-3 flex gap-4">
                              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                {faq.category}
                              </span>
                              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                                Order: {faq.order}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => setEditingId(faq.id)}
                              className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                              title="Edit FAQ"
                            >
                              <FiEdit className="text-xl" />
                            </button>
                            <button
                              onClick={() => handleFAQDelete(faq.id)}
                              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                              title="Delete FAQ"
                            >
                              <FiTrash className="text-xl" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          {/* Messages Section */}
          <section id="messages" className={`${activeTab === 'messages' ? 'block' : 'hidden'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Form Messages</h2>
              </div>

              {messages.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No messages yet.
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">{msg.name}</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">({msg.email})</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mt-2">
                            {msg.message}
                          </p>
                          <small className="text-gray-500 dark:text-gray-400 block mt-2">
                            Submitted: {msg.createdAt}
                          </small>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this message?')) {
                              deleteDoc(doc(db, 'contactMessages', msg.id));
                              setMessages(messages.filter(m => m.id !== msg.id));
                            }
                          }}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <FiTrash className="text-xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;