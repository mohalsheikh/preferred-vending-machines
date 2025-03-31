import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiTrash, 
  FiEdit,
  FiSearch,
  FiImage,
  FiX,
  FiCheck,
  FiSave,
  FiUploadCloud,
  FiSun,
  FiShoppingCart
} from 'react-icons/fi';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../../firebase';
import AdminLayout from './layout/AdminLayout';
import { toast } from 'react-toastify';

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

const SectionEditor = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [heroContent, setHeroContent] = useState({
    title: 'Our Healthy Selection',
    subtitle: 'Snacks & Beverages',
    description: '"When it comes to healthy options, our machines can\'t be beat! We have a large selection of products to choose from."'
  });
  const [wellnessContent, setWellnessContent] = useState({
    title: "Health First, Always",
    adaTitle: "ADA Compliant Machines",
    adaDescription: "All machines meet ADA compliance standards, ensuring accessibility for everyone.",
    wellnessTitle: "Wellness-Focused Solutions",
    wellnessDescription: "Enhance your wellness programs with our curated selection of better-for-you options that keep employees, students, and visitors happy and healthy.",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995450.png"
  });
  const [wellnessImageFile, setWellnessImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'productsPage');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.hero) setHeroContent(data.hero);
          if (data.wellness) setWellnessContent(data.wellness);
        }
      } catch (error) {
        toast.error('Error loading content');
      }
    };
    fetchContent();
  }, []);

  const handleSave = async (section) => {
    setIsSaving(true);
    try {
      const contentToUpdate = {
        [section]: section === 'hero' ? heroContent : wellnessContent
      };

      if (section === 'wellness' && wellnessImageFile) {
        const storageRef = ref(storage, `wellness/${Date.now()}_${wellnessImageFile.name}`);
        const snapshot = await uploadBytes(storageRef, wellnessImageFile);
        const imageUrl = await getDownloadURL(snapshot.ref);
        contentToUpdate.wellness.imageUrl = imageUrl;
      }

      await setDoc(doc(db, 'content', 'productsPage'), contentToUpdate, { merge: true });
      toast.success(`${section} section updated!`);
      setWellnessImageFile(null);
    } catch (error) {
      toast.error('Error saving content');
    }
    setIsSaving(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex gap-4">
        <button
          onClick={() => setActiveSection('hero')}
          className={`px-4 py-2 rounded-lg ${
            activeSection === 'hero' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
          }`}
        >
          Hero Section
        </button>
        <button
          onClick={() => setActiveSection('wellness')}
          className={`px-4 py-2 rounded-lg ${
            activeSection === 'wellness' ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
          }`}
        >
          Wellness Section
        </button>
      </div>

      <div className="p-6">
        {activeSection === 'hero' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Main Title
              </label>
              <input
                type="text"
                value={heroContent.title}
                onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={heroContent.subtitle}
                onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={heroContent.description}
                onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                rows="3"
              />
            </div>

            <button
              onClick={() => handleSave('hero')}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
              disabled={isSaving}
            >
              <FiSave /> {isSaving ? 'Saving...' : 'Save Hero Section'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Main Title
              </label>
              <input
                type="text"
                value={wellnessContent.title}
                onChange={(e) => setWellnessContent({...wellnessContent, title: e.target.value})}
                className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">ADA Compliance</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={wellnessContent.adaTitle}
                    onChange={(e) => setWellnessContent({...wellnessContent, adaTitle: e.target.value})}
                    className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={wellnessContent.adaDescription}
                    onChange={(e) => setWellnessContent({...wellnessContent, adaDescription: e.target.value})}
                    className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                    rows="3"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Wellness Solutions</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={wellnessContent.wellnessTitle}
                    onChange={(e) => setWellnessContent({...wellnessContent, wellnessTitle: e.target.value})}
                    className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={wellnessContent.wellnessDescription}
                    onChange={(e) => setWellnessContent({...wellnessContent, wellnessDescription: e.target.value})}
                    className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Section Image
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border border-dashed flex items-center gap-2">
                  <FiUploadCloud />
                  Upload New Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setWellnessImageFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                {wellnessImageFile && (
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {wellnessImageFile.name}
                    <button 
                      onClick={() => setWellnessImageFile(null)}
                      className="text-red-500 ml-2"
                    >
                      <FiX />
                    </button>
                  </span>
                )}
              </div>
              {wellnessContent.imageUrl && (
                <div className="mt-4 w-48 border rounded-lg overflow-hidden">
                  <img 
                    src={wellnessContent.imageUrl} 
                    alt="Current wellness" 
                    className="w-full h-auto"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => handleSave('wellness')}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
              disabled={isSaving}
            >
              <FiSave /> {isSaving ? 'Saving...' : 'Save Wellness Section'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductForm = ({ 
  product, 
  setProduct, 
  imageFile, 
  setImageFile,
  categories,
  onCancel,
  onSubmit,
  isEditing,
  isSubmitting
}) => {
  const [imagePreview, setImagePreview] = useState(product.imageUrl || '');
  const [tagsInput, setTagsInput] = useState(product.tags?.join(', ') || '');

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(imageFile);
    } else if (product.imageLink) {
      setImagePreview(product.imageLink);
    } else {
      setImagePreview('');
    }
  }, [imageFile, product.imageLink]);

  const handleTagChange = (e) => {
    setTagsInput(e.target.value);
    setProduct({
      ...product,
      tags: e.target.value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Name*
          </label>
          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category*
          </label>
          <select
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.replace(/-/g, ' ').toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price*
          </label>
          <input
            type="number"
            placeholder="0.00"
            step="0.01"
            min="0"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="tag1, tag2, tag3"
            value={tagsInput}
            onChange={handleTagChange}
            className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Image URL (optional)
          </label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={product.imageLink}
            onChange={(e) => setProduct({ ...product, imageLink: e.target.value })}
            className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-2"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            OR upload an image below
          </p>
          
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Upload Image
          </label>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <FiImage />
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            {imageFile && (
              <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                {imageFile.name}
                <button 
                  type="button"
                  onClick={() => setImageFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiX />
                </button>
              </span>
            )}
          </div>
        </div>

        {imagePreview && (
          <div className="md:col-span-2 flex justify-center">
            <div className="relative w-48 h-48 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
          disabled={
            !product.name || 
            !product.category || 
            !product.price || 
            isSubmitting
          }
        >
          {isSubmitting ? (
            'Processing...'
          ) : isEditing ? (
            <>
              <FiCheck /> Update Product
            </>
          ) : (
            <>
              <FiPlus /> Add Product
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const ProductItem = ({ product, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600">
            <img
              src={
                product.imageUrl || 
                'https://via.placeholder.com/400x300.png?text=No+Image'
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {product.category.replace(/-/g, ' ')} – $
              {parseFloat(product.price || 0).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
            title="Edit product"
          >
            <FiEdit />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id);
            }}
            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
            title="Delete product"
          >
            <FiTrash />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4"
          >
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              {product.tags?.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <img 
                  src={
                    product.imageUrl || 
                    'https://via.placeholder.com/400x300.png?text=No+Image'
                  } 
                  alt={product.name} 
                  className="max-w-full h-48 object-contain rounded border border-gray-200 dark:border-gray-600"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    imageLink: '',
    tags: []
  });
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = setupFirebaseListeners();
    return () => unsubscribe();
  }, [selectedCategory, sortBy, sortOrder]);

  const setupFirebaseListeners = () => {
    setLoading(true);
    setError(null);

    try {
      const productsRef = collection(db, 'products');
      let productsQuery;

      if (selectedCategory === 'all') {
        productsQuery = query(productsRef, orderBy(sortBy, sortOrder));
      } else {
        productsQuery = query(
          productsRef,
          where('category', '==', selectedCategory),
          orderBy(sortBy, sortOrder)
        );
      }

      const unsubscribe = onSnapshot(productsQuery, snapshot => {
        const loadedProducts = snapshot.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            price: data.price?.toString() || '',
            tags: Array.isArray(data.tags) ? data.tags : []
          };
        });
        setProducts(loadedProducts);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error('Error setting up product listener:', err);
      setError('Failed to load products');
      setLoading(false);
      return () => {};
    }
  };

  const handleCreate = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      if (imageFile && !imageFile.type.startsWith('image/')) {
        throw new Error('Please upload a valid image file (JPEG/PNG, etc.)');
      }

      let imageUrl = newProduct.imageLink.trim() || '';

      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snap = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snap.ref);
      }

      const priceValue = parseFloat(newProduct.price);
      if (isNaN(priceValue)) {
        throw new Error('Please enter a valid price');
      }

      const productData = {
        name: newProduct.name.trim(),
        category: newProduct.category,
        price: priceValue,
        imageUrl: imageUrl || 'https://via.placeholder.com/400x300.png?text=No+Image',
        tags: newProduct.tags.filter(tag => tag.trim() !== ''),
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'products'), productData);

      const user = auth.currentUser;
      await addDoc(collection(db, 'activityLog'), {
        action: 'Product Created',
        itemName: newProduct.name.trim(),
        userName: user?.displayName || 'Admin',
        actionType: 'add',
        timestamp: serverTimestamp()
      });

      setNewProduct({
        name: '',
        category: '',
        price: '',
        imageLink: '',
        tags: []
      });
      setImageFile(null);
      setIsCreating(false);

    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    setIsSubmitting(true);
    setError(null);

    try {
      if (imageFile && !imageFile.type.startsWith('image/')) {
        throw new Error('Please upload a valid image file (JPEG/PNG, etc.)');
      }

      const priceValue = parseFloat(editingProduct.price);
      if (isNaN(priceValue)) {
        throw new Error('Please enter a valid price');
      }

      let imageUrl = editingProduct.imageLink?.trim() || editingProduct.imageUrl;
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snap = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snap.ref);
      }

      const updatedData = {
        name: editingProduct.name.trim(),
        category: editingProduct.category,
        price: priceValue,
        imageUrl,
        tags: editingProduct.tags.filter(tag => tag.trim() !== ''),
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(db, 'products', editingProduct.id), updatedData);

      const user = auth.currentUser;
      await addDoc(collection(db, 'activityLog'), {
        action: 'Product Updated',
        itemName: editingProduct.name,
        userName: user?.displayName || 'Admin',
        actionType: 'update',
        timestamp: serverTimestamp(),
        productId: editingProduct.id
      });

      setEditingProduct(null);
      setImageFile(null);

    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const user = auth.currentUser;
      const product = products.find(p => p.id === productId);

      await deleteDoc(doc(db, 'products', productId));

      await addDoc(collection(db, 'activityLog'), {
        action: 'Product Deleted',
        itemName: product.name,
        userName: user?.displayName || 'Admin',
        actionType: 'delete',
        timestamp: serverTimestamp(),
        productId
      });

      setProducts(products.filter(p => p.id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.tags && product.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <AdminLayout title="Products">
      <div className="space-y-8">
        <SectionEditor />
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Products
            </h2>
            <button
              onClick={() => {
                setIsCreating(true);
                setEditingProduct(null);
                setNewProduct({
                  name: '',
                  category: '',
                  price: '',
                  imageLink: '',
                  tags: []
                });
                setImageFile(null);
                setError(null);
              }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
              disabled={isCreating || !!editingProduct}
            >
              <FiPlus /> Add Product
            </button>
          </div>

          {error && (
            <div className="px-6 py-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100">
              {error}
            </div>
          )}

          <AnimatePresence>
            {(isCreating || editingProduct) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
              >
                <ProductForm
                  product={editingProduct || newProduct}
                  setProduct={editingProduct ? setEditingProduct : setNewProduct}
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  categories={CATEGORY_OPTIONS}
                  onCancel={() => {
                    setIsCreating(false);
                    setEditingProduct(null);
                    setImageFile(null);
                    setError(null);
                  }}
                  onSubmit={editingProduct ? handleUpdate : handleCreate}
                  isEditing={!!editingProduct}
                  isSubmitting={isSubmitting}
                />
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
                    placeholder="Search products..."
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
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {CATEGORY_OPTIONS.map(category => (
                    <option key={category} value={category}>
                      {category.replace(/-/g, ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
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
                  <option value="name">Name</option>
                  <option value="category">Category</option>
                  <option value="price">Price</option>
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
            ) : filteredProducts.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                {searchTerm ? 'No products match your search.' : 'No products available.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredProducts.map(product => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onDelete={handleDelete}
                    onEdit={p => {
                      setEditingProduct(p);
                      setIsCreating(false);
                      setImageFile(null);
                      setError(null);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;