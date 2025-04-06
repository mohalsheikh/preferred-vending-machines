// src/pages/admin/FAQs.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiTrash, 
  FiEdit, 
  FiSave,
  FiChevronUp,
  FiChevronDown,
  FiSearch,
  FiX
} from 'react-icons/fi';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from './layout/AdminLayout';
import Modal from '../../components/Modal';
import Toast from '../../components/Toast';

const FAQItem = ({ 
  faq, 
  editingId, 
  handleFAQUpdate, 
  setEditingId, 
  handleFAQDelete,
  categories,
  saveFAQUpdates
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {editingId === faq.id ? (
        <div className="p-4 space-y-4">
          <input
            value={faq.question}
            onChange={(e) => handleFAQUpdate(faq.id, { question: e.target.value })}
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Question"
          />
          <textarea
            value={faq.answer}
            onChange={(e) => handleFAQUpdate(faq.id, { answer: e.target.value })}
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={4}
            placeholder="Answer"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={faq.category}
                onChange={(e) => handleFAQUpdate(faq.id, { category: e.target.value })}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={faq.order}
                onChange={(e) => handleFAQUpdate(faq.id, { order: parseInt(e.target.value) || 0 })}
                className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setEditingId(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => saveFAQUpdates(faq.id)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <FiSave /> Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div 
            className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setExpanded(!expanded)}
          >
            <div className="flex items-center">
              <span className="text-sm font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded mr-3">
                {faq.category}
              </span>
              <h3 className="font-medium text-gray-900 dark:text-white">{faq.question}</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                Order: {faq.order}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingId(faq.id);
                }}
                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                title="Edit FAQ"
              >
                <FiEdit />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFAQDelete(faq.id);
                }}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                title="Delete FAQ"
              >
                <FiTrash />
              </button>
              {expanded ? (
                <FiChevronUp className="text-gray-500 dark:text-gray-400" />
              ) : (
                <FiChevronDown className="text-gray-500 dark:text-gray-400" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4"
              >
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCreatingFAQ, setIsCreatingFAQ] = useState(false);
  const [newFAQ, setNewFAQ] = useState({ 
    question: '', 
    answer: '', 
    order: '', 
    category: '' 
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('order');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        let faqsQuery;
        
        if (selectedCategory === 'all') {
          faqsQuery = query(collection(db, 'faqs'), orderBy(sortBy, sortOrder));
        } else {
          faqsQuery = query(
            collection(db, 'faqs'),
            where('category', '==', selectedCategory),
            orderBy(sortBy, sortOrder)
          );
        }

        const [faqsSnapshot, categoriesSnapshot] = await Promise.all([
          getDocs(faqsQuery),
          getDocs(collection(db, 'faqCategories'))
        ]);

        const loadedFAQs = faqsSnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          order: doc.data().order || 0
        }));
        
        const loadedCategories = categoriesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setFaqs(loadedFAQs);
        setCategories(loadedCategories);
      } catch (error) {
        console.error('Error loading data:', error);
        setToast({ type: 'error', message: 'Failed to load data' });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCategory, sortBy, sortOrder]);

  const handleFAQCreate = async () => {
    if (!newFAQ.question || !newFAQ.answer || !newFAQ.category) {
      setToast({ type: 'warning', message: 'Please fill all required fields' });
      return;
    }
    
    try {
      const docRef = await addDoc(collection(db, 'faqs'), {
        ...newFAQ,
        order: parseInt(newFAQ.order) || 0
      });
      setFaqs([...faqs, { ...newFAQ, id: docRef.id, order: parseInt(newFAQ.order) || 0 }]);
      setNewFAQ({ question: '', answer: '', order: '', category: '' });
      setIsCreatingFAQ(false);
      setToast({ type: 'success', message: 'FAQ created successfully' });
    } catch (error) {
      console.error('Error creating FAQ:', error);
      setToast({ type: 'error', message: 'Failed to create FAQ' });
    }
  };

  const handleFAQUpdate = async (faqId, updatedData) => {
    setFaqs(faqs.map(faq => 
      faq.id === faqId ? { ...faq, ...updatedData } : faq
    ));
  };

  const handleFAQDelete = async (faqId) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    
    try {
      await deleteDoc(doc(db, 'faqs', faqId));
      setFaqs(faqs.filter(faq => faq.id !== faqId));
      setToast({ type: 'success', message: 'FAQ deleted successfully' });
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setToast({ type: 'error', message: 'Failed to delete FAQ' });
    }
  };

  const saveFAQUpdates = async (faqId) => {
    const faqToUpdate = faqs.find(faq => faq.id === faqId);
    if (!faqToUpdate) return;
    
    try {
      await updateDoc(doc(db, 'faqs', faqId), {
        question: faqToUpdate.question,
        answer: faqToUpdate.answer,
        category: faqToUpdate.category,
        order: parseInt(faqToUpdate.order) || 0
      });
      setEditingId(null);
      setToast({ type: 'success', message: 'FAQ updated successfully' });
    } catch (error) {
      console.error('Error updating FAQ:', error);
      setToast({ type: 'error', message: 'Failed to update FAQ' });
    }
  };

  const handleCategoryCreate = async () => {
    if (!newCategoryName.trim()) {
      setToast({ type: 'warning', message: 'Category name cannot be empty' });
      return;
    }

    if (categories.some(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
      setToast({ type: 'warning', message: 'Category already exists' });
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'faqCategories'), {
        name: newCategoryName.trim()
      });
      setCategories([...categories, { id: docRef.id, name: newCategoryName.trim() }]);
      setShowAddCategory(false);
      setNewCategoryName('');
      setToast({ type: 'success', message: 'Category added successfully' });
    } catch (error) {
      console.error('Error adding category:', error);
      setToast({ type: 'error', message: 'Failed to add category' });
    }
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="FAQs">
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

        <AnimatePresence>
          {isCreatingFAQ && (
            <motion.div 
              className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Question"
                    value={newFAQ.question}
                    onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Answer <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Answer"
                    value={newFAQ.answer}
                    onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newFAQ.category}
                      onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      placeholder="Order"
                      value={newFAQ.order}
                      onChange={(e) => setNewFAQ({ ...newFAQ, order: e.target.value })}
                      className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleFAQCreate}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    disabled={!newFAQ.question || !newFAQ.answer || !newFAQ.category}
                  >
                    <FiPlus /> Add FAQ
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowAddCategory(true)}
                  className="p-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  title="Add New Category"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="order">Display Order</option>
                <option value="question">Question</option>
                <option value="category">Category</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort Order
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <div className="p-6 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : filteredFAQs.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No FAQs match your search.' : 'No FAQs available.'}
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {filteredFAQs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  editingId={editingId}
                  handleFAQUpdate={handleFAQUpdate}
                  setEditingId={setEditingId}
                  handleFAQDelete={handleFAQDelete}
                  categories={categories}
                  saveFAQUpdates={saveFAQUpdates}
                />
              ))}
            </div>
          )}
        </div>

        <Modal
          isOpen={showAddCategory}
          onClose={() => setShowAddCategory(false)}
          title="Add New Category"
        >
          <div className="space-y-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddCategory(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCategoryCreate}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                disabled={!newCategoryName.trim()}
              >
                Add Category
              </button>
            </div>
          </div>
        </Modal>

        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default FAQs;