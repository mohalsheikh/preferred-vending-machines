// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
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
  FiSave
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

function AdminDashboard() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Technology', href: '/technology' },
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'EditHome', href: '/admin/edit-home' },
    { name: 'FAQ', href: '/FAQ' }
  ];

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
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
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
    try {
      await deleteDoc(doc(db, 'faqs', faqId));
      setFaqs(faqs.filter(faq => faq.id !== faqId));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>Admin Dashboard - Preferred Vending</title>
        <meta name="description" content="Manage your vending solutions with Preferred Vending's admin dashboard." />
      </Helmet>

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
                onClick={handleLogout}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-red-700 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <FiLogOut /> Logout
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

      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Admin Dashboard
          </h1>

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
                {CATEGORY_OPTIONS.map(category => (
                  <option key={category} value={category}>
                    {category.replace(/-/g, ' ').toUpperCase()}
                  </option>
                ))}
              </select>

              <input 
                type="number"
                placeholder="Price"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none"
                required
              />

              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newProduct.tags.join(', ')}
                onChange={(e) => setNewProduct({ 
                  ...newProduct, 
                  tags: e.target.value.split(',').map(tag => tag.trim())
                })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none"
              />

              <input
                type="text"
                placeholder="Image Link (optional)"
                value={newProduct.imageLink}
                onChange={(e) => setNewProduct({ ...newProduct, imageLink: e.target.value })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none md:col-span-2"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none md:col-span-2"
              />

              <motion.button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors md:col-span-4"
                whileHover={{ scale: 1.05 }}
              >
                <FiPlus /> Create
              </motion.button>
            </form>
          </motion.div>

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
                <div
                  key={p.id}
                  className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
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
                        {p.category} - ${p.price?.toFixed(2)}
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
                  <motion.button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors self-start md:self-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiTrash className="text-xl" />
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Manage FAQs
            </h2>

            <div className="mb-8 grid md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Question"
                value={newFAQ.question}
                onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              />
              <textarea
                placeholder="Answer"
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg md:col-span-2"
              />
              <input
                type="number"
                placeholder="Order"
                value={newFAQ.order}
                onChange={(e) => setNewFAQ({ ...newFAQ, order: e.target.value })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              />
              <select
                value={newFAQ.category}
                onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                required
              >
                <option value="">Select Category</option>
                {FAQ_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                onClick={handleFAQCreate}
                className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors md:col-span-4"
              >
                <FiPlus /> Add FAQ
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <option value="all">All Categories</option>
                {FAQ_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <option value="order">Sort by Order</option>
                <option value="question">Sort by Question</option>
                <option value="category">Sort by Category</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {editingId === faq.id ? (
                    <div className="space-y-4">
                      <input
                        value={faq.question}
                        onChange={(e) => handleFAQUpdate(faq.id, { question: e.target.value })}
                        className="w-full p-2 bg-white dark:bg-gray-800 rounded"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(e) => handleFAQUpdate(faq.id, { answer: e.target.value })}
                        className="w-full p-2 bg-white dark:bg-gray-800 rounded"
                      />
                      <input
                        type="number"
                        value={faq.order}
                        onChange={(e) => handleFAQUpdate(faq.id, { order: parseInt(e.target.value) || 0 })}
                        className="w-20 p-2 bg-white dark:bg-gray-800 rounded"
                      />
                      <select
                        value={faq.category}
                        onChange={(e) => handleFAQUpdate(faq.id, { category: e.target.value })}
                        className="p-2 bg-white dark:bg-gray-800 rounded"
                      >
                        {FAQ_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                        >
                          <FiSave className="inline mr-2" /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{faq.question}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">{faq.answer}</p>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span>Order: {faq.order}</span>
                          <span className="mx-2">|</span>
                          <span>Category: {faq.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingId(faq.id)}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg"
                        >
                          <FiEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleFAQDelete(faq.id)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg"
                        >
                          <FiTrash className="text-xl" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

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
                  <div
                    key={msg.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {msg.name} (
                      <span className="text-sm text-gray-300">{msg.email}</span>)
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      {msg.message}
                    </p>
                    <small className="text-gray-500 dark:text-gray-400 block mt-2">
                      Submitted: {msg.createdAt}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

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
      </section>
    </div>
  );
}

export default AdminDashboard;