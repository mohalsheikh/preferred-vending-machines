// src/pages/HomeEdit.js
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FiSave, FiImage, FiX, FiZap, FiShoppingCart, FiVideo, FiStar, FiSettings, FiPlus, FiTrash2, FiGrid, FiCamera } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './layout/AdminLayout';

const HomeEdit = () => {
  const navigate = useNavigate();
  const storage = getStorage();
  const [content, setContent] = useState({
    hero: {
      title: "Preferred",
      highlightedTitle: "Vending Solutions",
      subtitle: "Premium snacks, competitive pricing, and exceptional service",
      buttonText: "Get Started",
      backgroundImageURL: "https://via.placeholder.com/1920x1080.png?text=Hero+Background"
    },
    freeVending: {
      title: "FREE Vending Machines",
      subtitle: "For Your Business or School",
      description: "We provide full-service vending solutions at no cost to you, featuring:",
      features: [
        "Healthy Options: Nutritionist-curated snack selection",
        "Smart Technology: Real-time inventory tracking",
        "24/7 Support: Dedicated maintenance team"
      ],
      buttonText: "Claim Your Free Machine",
      images: [
        "https://via.placeholder.com/600x400.png?text=Free+Vending+1",
        "https://via.placeholder.com/600x400.png?text=Free+Vending+2",
        "https://via.placeholder.com/600x400.png?text=Free+Vending+3",
        "https://via.placeholder.com/600x400.png?text=Free+Vending+4"
      ]
    },
    gallery: {
      title: "Our Gallery",
      subtitle: "See our vending solutions in action",
      images: [
        "https://via.placeholder.com/600x400.png?text=Gallery+1",
        "https://via.placeholder.com/600x400.png?text=Gallery+2",
        "https://via.placeholder.com/600x400.png?text=Gallery+3",
        "https://via.placeholder.com/600x400.png?text=Gallery+4",
        "https://via.placeholder.com/600x400.png?text=Gallery+5",
        "https://via.placeholder.com/600x400.png?text=Gallery+6"
      ]
    },
    technology: {
      title: "Smart Choices Technology",
      subtitle: "State-of-the-art vending solutions featuring:",
      imageURL: "https://via.placeholder.com/800x600.png?text=Smart+Vending+Interface",
      features: [
        { 
          title: "Premium Snacks", 
          text: "Curated selection of healthy choices",
          icon: "FiZap"
        },
        { 
          title: "Smart Inventory", 
          text: "Real-time stock monitoring system",
          icon: "FiShoppingCart"
        },
        { 
          title: "Quality Assurance", 
          text: "Automated product freshness checks",
          icon: "FiStar"
        },
        { 
          title: "Remote Management", 
          text: "Cloud-based machine controls",
          icon: "FiSettings"
        }
      ]
    },
    footer: {
      address: "123 Commerce Street, Business City",
      phone: "+1 (888) 123-4567",
      email: "contact@PreferredVending.com",
      copyright: "© 2024 Preferred Vending. All rights reserved."
    }
  });

  const handleAddFeature = (section) => {
    if (section === 'technology') {
      setContent(prev => ({
        ...prev,
        technology: {
          ...prev.technology,
          features: [
            ...prev.technology.features,
            { 
              title: "New Feature", 
              text: "Feature description",
              icon: "FiZap"
            }
          ]
        }
      }));
    } else if (section === 'freeVending') {
      setContent(prev => ({
        ...prev,
        freeVending: {
          ...prev.freeVending,
          features: [...prev.freeVending.features, 'New feature']
        }
      }));
    }
  };

  const [activeSection, setActiveSection] = useState('hero');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [tempPreview, setTempPreview] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'homePage');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (!Array.isArray(data.freeVending?.images)) {
            data.freeVending.images = [];
          }
          if (!Array.isArray(data.gallery?.images)) {
            data.gallery.images = [];
          }
          setContent(data);
        }
        
      } catch (error) {
        console.error("Error fetching document: ", error);
        toast.error('Error loading content', { position: 'bottom-right' });
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, 'content', 'homePage');
      await setDoc(docRef, content, { merge: true });
      toast.success('Changes saved successfully!', {
        position: 'bottom-right',
        autoClose: 2000
      });
      setTimeout(() => navigate('/'), 2500);
    } catch (error) {
      toast.error('Error saving changes', { position: 'bottom-right' });
      console.error("Error saving document: ", error);
    }
    setIsSaving(false);
  };

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = content[section].features.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        features: updatedArray
      }
    }));
  };

  const handleImageUpload = async (file, section, index = null) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      // Show temporary preview
      const reader = new FileReader();
      reader.onload = () => setTempPreview(reader.result);
      reader.readAsDataURL(file);

      const storageRef = ref(storage, `homepage/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          toast.error('Image upload failed');
          setUploadProgress(0);
          setTempPreview(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Handle different section types
          if (index !== null) {
            // Array fields (gallery or freeVending images)
            const currentImages = Array.isArray(content[section].images)
  ? [...content[section].images]
  : [];

currentImages[index] = downloadURL;

setContent(prev => ({
  ...prev,
  [section]: { ...prev[section], images: currentImages }
}));

          } else if (section === 'technology') {
            // Technology image
            setContent(prev => ({
              ...prev,
              technology: { ...prev.technology, imageURL: downloadURL }
            }));
          } else if (section === 'hero') {
            // Hero background
            setContent(prev => ({
              ...prev,
              hero: { ...prev.hero, backgroundImageURL: downloadURL }
            }));
          }
          
          setUploadProgress(0);
          setTempPreview(null);
          toast.success('Image uploaded successfully!');
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error('Image upload failed');
      setUploadProgress(0);
      setTempPreview(null);
    }
  };

  const handleVideoUpload = async (file, section) => {
    const storageRef = ref(storage, `uploads/${section}/hero-video-${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload error:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        handleChange(section, 'backgroundVideoURL', downloadURL);
        setUploadProgress(0);
      }
    );
  };
  

  const SECTIONS = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'freeVending', label: 'Free Vending' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'technology', label: 'Technology' },
    { id: 'footer', label: 'Footer' }
  ];

  return (
    <AdminLayout title="Home Page Editor">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Home Page Content</h2>
          <motion.button
            onClick={handleSave}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            disabled={isSaving}
          >
            <FiSave /> {isSaving ? 'Saving...' : 'Save All Changes'}
          </motion.button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`p-3 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-100 text-primary-700 dark:bg-gray-700 dark:text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {activeSection === 'hero' && (
            <SectionEditor title="Hero Content" preview={
              <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg mt-4">
                <div className="h-48 overflow-hidden rounded-lg mb-4">
                {content.hero?.backgroundVideoURL ? (
  <video
    src={content.hero.backgroundVideoURL}
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  />
) : content.hero?.backgroundImageURL ? (
  <img 
    src={content.hero.backgroundImageURL} 
    alt="Hero Background Preview" 
    className="w-full h-full object-cover"
  />
) : (
  <div className="bg-gray-200 dark:bg-gray-600 w-full h-full flex items-center justify-center">
    <FiImage className="text-gray-400 w-12 h-12" />
  </div>
)}
                </div>
                <h1 className="text-4xl font-bold mb-4">
                  {content.hero?.title}{' '}
                  <span className="text-primary-600">{content.hero?.highlightedTitle}</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {content.hero?.subtitle}
                </p>
                <a 
                  href={content.hero?.buttonLink || '#'}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg inline-block"
                >
                  {content.hero?.buttonText}
                </a>
              </div>
            }>
              <TextField 
                label="Main Title"
                value={content.hero?.title || ''}
                onChange={(e) => handleChange('hero', 'title', e.target.value)}
              />
              <TextField 
                label="Highlighted Title"
                value={content.hero?.highlightedTitle || ''}
                onChange={(e) => handleChange('hero', 'highlightedTitle', e.target.value)}
              />
              <TextField 
                label="Subtitle"
                textarea
                value={content.hero?.subtitle || ''}
                onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextField 
                  label="Button Text"
                  value={content.hero?.buttonText || ''}
                  onChange={(e) => handleChange('hero', 'buttonText', e.target.value)}
                />
                <TextField 
                  label="Button Link"
                  value={content.hero?.buttonLink || ''}
                  onChange={(e) => handleChange('hero', 'buttonLink', e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background Image
                </label>
                
                <TextField
                  label="Image URL"
                  value={content.hero?.backgroundImageURL || ''}
                  onChange={(e) => handleChange('hero', 'backgroundImageURL', e.target.value)}
                />
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <FiImage className="w-8 h-8 text-gray-400" />
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Drag & drop image or{' '}
                        <label className="text-primary-600 cursor-pointer">
                          browse files
                          <input
                            type="file"
                            onChange={(e) => {
                              handleImageUpload(e.target.files[0], 'hero');
                              e.target.value = '';
                            }}
                            className="hidden"
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">Recommended size: 1920x1080px</p>
                    </div>
                  </div>
                  
                  {/* Background Image Section */}
<div className="space-y-4">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Background Image
  </label>

  <TextField
    label="Image URL"
    value={content.hero?.backgroundImageURL || ''}
    onChange={(e) => handleChange('hero', 'backgroundImageURL', e.target.value)}
  />

  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
    {/* Upload UI for image */}
  </div>
</div>

{/* 👇 Place Video Section RIGHT HERE 👇 */}
<div className="space-y-4 mt-8">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Background Video (optional)
  </label>

  <TextField
    label="Video URL"
    value={content.hero?.backgroundVideoURL || ''}
    onChange={(e) => handleChange('hero', 'backgroundVideoURL', e.target.value)}
  />

  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
    <div className="flex flex-col items-center gap-2">
      <FiVideo className="w-8 h-8 text-gray-400" />
      <div className="space-y-1">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Drag & drop video or{' '}
          <label className="text-primary-600 cursor-pointer">
            browse files
            <input
              type="file"
              accept="video/mp4"
              onChange={(e) => {
                handleVideoUpload(e.target.files[0], 'hero');
                e.target.value = '';
              }}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-xs text-gray-500">Recommended format: MP4</p>
      </div>
    </div>

    {uploadProgress > 0 && (
      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-primary-600 rounded-full transition-all"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Uploading... {Math.round(uploadProgress)}%
        </p>
      </div>
    )}
  </div>
</div>

                  {uploadProgress > 0 && (
                    <div className="mt-4">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-primary-600 rounded-full transition-all"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Uploading... {Math.round(uploadProgress)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </SectionEditor>
          )}

          {activeSection === 'freeVending' && (
            <SectionEditor title="Free Vending Content">
              <div className="space-y-6">
                <TextField 
                  label="Main Title"
                  value={content.freeVending?.title || ''}
                  onChange={(e) => handleChange('freeVending', 'title', e.target.value)}
                />
                <TextField 
                  label="Subtitle"
                  value={content.freeVending?.subtitle || ''}
                  onChange={(e) => handleChange('freeVending', 'subtitle', e.target.value)}
                />
                <TextField 
                  label="Description"
                  textarea
                  value={content.freeVending?.description || ''}
                  onChange={(e) => handleChange('freeVending', 'description', e.target.value)}
                />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 dark:text-white">Features</h3>
                    <button
                      onClick={() => handleAddFeature('freeVending')}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700"
                    >
                      <FiPlus /> Add Feature
                    </button>
                  </div>
                  
                  {content.freeVending?.features?.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <button
                        onClick={() => {
                          const updatedFeatures = content.freeVending.features.filter((_, i) => i !== index);
                          handleChange('freeVending', 'features', updatedFeatures);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <FiX />
                      </button>
                      <TextField
                        label={`Feature ${index + 1}`}
                        textarea
                        value={feature}
                        onChange={(e) => {
                          const updatedFeatures = [...content.freeVending.features];
                          updatedFeatures[index] = e.target.value;
                          handleChange('freeVending', 'features', updatedFeatures);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <TextField 
                    label="Button Text"
                    value={content.freeVending?.buttonText || ''}
                    onChange={(e) => handleChange('freeVending', 'buttonText', e.target.value)}
                  />
                  <TextField 
                    label="Button Link"
                    value={content.freeVending?.buttonLink || ''}
                    onChange={(e) => handleChange('freeVending', 'buttonLink', e.target.value)}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 dark:text-white">Section Images</h3>
                    <button
                      onClick={() => handleChange('freeVending', 'images', [...content.freeVending.images, ''])}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700"
                    >
                      <FiPlus /> Add Image
                    </button>
                  </div>
                  
                  {content.freeVending?.images?.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Image {index + 1}
                        </span>
                        <button
                          onClick={() => {
                            const updatedImages = content.freeVending.images.filter((_, i) => i !== index);
                            handleChange('freeVending', 'images', updatedImages);
                          }}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <FiX />
                        </button>
                      </div>
                      
                      <TextField
                        value={image}
                        onChange={(e) => {
                          const updatedImages = [...content.freeVending.images];
                          updatedImages[index] = e.target.value;
                          handleChange('freeVending', 'images', updatedImages);
                        }}
                      />
                      
                      <div className="flex gap-2">
                        <label className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer flex items-center gap-2">
                          <FiImage /> Upload Image
                          <input
                            type="file"
                            onChange={(e) => {
                              handleImageUpload(e.target.files[0], 'freeVending', index);
                              e.target.value = '';
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionEditor>
          )}

          {activeSection === 'gallery' && (
            <SectionEditor title="Gallery Content">
              <div className="space-y-6">
                <TextField 
                  label="Section Title"
                  value={content.gallery?.title || ''}
                  onChange={(e) => handleChange('gallery', 'title', e.target.value)}
                />
                <TextField 
                  label="Section Subtitle"
                  textarea
                  value={content.gallery?.subtitle || ''}
                  onChange={(e) => handleChange('gallery', 'subtitle', e.target.value)}
                />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900 dark:text-white">Gallery Images</h3>
                    <button
                      onClick={() => handleChange('gallery', 'images', [...content.gallery.images, ''])}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700"
                    >
                      <FiPlus /> Add Image
                    </button>
                  </div>
                  
                  {content.gallery?.images?.map((image, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-2">
                            <FiGrid className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Image {index + 1}
                            </span>
                          </div>
                          
                          <TextField
                            label="Image URL"
                            value={image}
                            onChange={(e) => {
                              const updatedImages = [...content.gallery.images];
                              updatedImages[index] = e.target.value;
                              handleChange('gallery', 'images', updatedImages);
                            }}
                          />
                          
                          <div className="flex gap-2">
                            <label className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer flex items-center gap-2">
                              <FiImage /> Upload Image
                              <input
                                type="file"
                                onChange={(e) => {
                                  handleImageUpload(e.target.files[0], 'gallery', index);
                                  e.target.value = '';
                                }}
                                className="hidden"
                              />
                            </label>
                            
                            <button
                              onClick={() => {
                                const updatedImages = content.gallery.images.filter((_, i) => i !== index);
                                handleChange('gallery', 'images', updatedImages);
                              }}
                              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg flex items-center gap-2 hover:bg-red-200"
                            >
                              <FiTrash2 /> Remove
                            </button>
                          </div>
                        </div>
                        
                        <div className="w-40 h-32 rounded-lg overflow-hidden border dark:border-gray-600">
                          {image ? (
                            <img src={image} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              <FiCamera className="text-gray-400 w-8 h-8" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {uploadProgress > 0 && (
                        <div className="mt-4">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-primary-600 rounded-full transition-all"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Uploading... {Math.round(uploadProgress)}%
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionEditor>
          )}

          {activeSection === 'technology' && (
            <SectionEditor title="Technology Content">
              <div className="space-y-8">
                <div className="space-y-4">
                  <TextField 
                    label="Section Title"
                    value={content.technology?.title || ''}
                    onChange={(e) => handleChange('technology', 'title', e.target.value)}
                  />
                  <TextField
                    label="Section Subtitle"
                    textarea
                    value={content.technology?.subtitle || ''}
                    onChange={(e) => handleChange('technology', 'subtitle', e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Technology Image
                  </label>
                  
                  <TextField
                    label="Image URL"
                    value={content.technology?.imageURL || ''}
                    onChange={(e) => handleChange('technology', 'imageURL', e.target.value)}
                  />
                  
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FiImage className="w-8 h-8 text-gray-400" />
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Drag & drop image or{' '}
                          <label className="text-primary-600 cursor-pointer">
                            browse files
                            <input
                              type="file"
                              onChange={(e) => {
                                handleImageUpload(e.target.files[0], 'technology');
                                e.target.value = '';
                              }}
                              className="hidden"
                            />
                          </label>
                        </p>
                        <p className="text-xs text-gray-500">Recommended size: 800x600px</p>
                      </div>
                    </div>
                    
                    {uploadProgress > 0 && (
                      <div className="mt-4">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-primary-600 rounded-full transition-all"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Uploading... {Math.round(uploadProgress)}%
                        </p>
                      </div>
                    )}
                  </div>

                  {(tempPreview || content.technology?.imageURL) && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Preview:</p>
                      <img 
                        src={tempPreview || content.technology.imageURL} 
                        alt="Technology Preview" 
                        className="w-full h-48 object-cover rounded-lg border dark:border-gray-600"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold dark:text-white">Features</h3>
                    <button
                      onClick={() => handleAddFeature('technology')}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700"
                    >
                      <FiPlus /> Add Feature
                    </button>
                  </div>
                  
                  {content.technology?.features?.map((feature, index) => (
                    <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl space-y-4 border border-gray-200 dark:border-gray-600">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Feature #{index + 1}
                        </span>
                        <button
                          onClick={() => {
                            const updatedFeatures = content.technology.features.filter((_, i) => i !== index);
                            handleChange('technology', 'features', updatedFeatures);
                          }}
                          className="text-red-500 hover:text-red-700"
                          title="Remove feature"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <TextField
                        label="Feature Title"
                        value={feature.title}
                        onChange={(e) => handleArrayChange('technology', index, 'title', e.target.value)}
                      />
                      
                      <TextField
                        label="Feature Description"
                        textarea
                        value={feature.text}
                        onChange={(e) => handleArrayChange('technology', index, 'text', e.target.value)}
                      />
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Icon Selection
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {['FiZap', 'FiShoppingCart', 'FiStar', 'FiSettings'].map((icon) => (
                            <button
                              key={icon}
                              onClick={() => handleArrayChange('technology', index, 'icon', icon)}
                              className={`p-4 rounded-lg flex flex-col items-center justify-center gap-2 ${
                                feature.icon === icon
                                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'
                              }`}
                            >
                              {React.createElement(require('react-icons/fi')[icon], { className: 'w-6 h-6' })}
                              <span className="text-xs">{icon.replace('Fi', '')}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SectionEditor>
          )}

          {activeSection === 'footer' && (
            <SectionEditor title="Footer Content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField 
                  label="Address"
                  value={content.footer?.address || ''}
                  onChange={(e) => handleChange('footer', 'address', e.target.value)}
                />
                <TextField 
                  label="Phone"
                  value={content.footer?.phone || ''}
                  onChange={(e) => handleChange('footer', 'phone', e.target.value)}
                />
                <TextField 
                  label="Email"
                  value={content.footer?.email || ''}
                  onChange={(e) => handleChange('footer', 'email', e.target.value)}
                />
                <TextField 
                  label="Copyright Text"
                  value={content.footer?.copyright || ''}
                  onChange={(e) => handleChange('footer', 'copyright', e.target.value)}
                />
              </div>
            </SectionEditor>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

const SectionEditor = ({ title, children, preview }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
    <div className="space-y-6">
      {children}
      {preview && (
        <div className="mt-6 border-t pt-6 border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Live Preview</h3>
          {preview}
        </div>
      )}
    </div>
  </div>
);

const TextField = ({ label, value, onChange, textarea = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows="4"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    )}
  </div>
);

export default HomeEdit;