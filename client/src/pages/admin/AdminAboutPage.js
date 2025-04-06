import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { db, storage } from '../../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FiSave, FiUpload, FiX, FiPlus, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import AdminLayout from './layout/AdminLayout';
import toast, { Toaster } from 'react-hot-toast';

const DEFAULT_CONTENT = {
  meta: {
    title: 'About Us - Preferred Vending',
    description: "Discover Preferred Vending's story, mission, and commitment to local communities"
  },
  founderSection: {
    title: 'Our Story',
    subtitle: 'From Local Roots to Regional Service',
    heading: 'Building Better Vending Experiences',
    description: 'Founded by Rusty Popp in 2003...',
    bulletPoints: [
      'Premium equipment maintenance',
      'Competitive pricing models',
      'Diverse product selection',
      'Community-focused service'
    ],
    imageUrl: ''
  },
  missionPrinciples: [
    {
      title: 'Customer First',
      description: 'Only the Best for Your Customers, Employees, and Company',
      icon: 'FiUsers'
    },
    {
      title: 'Product Quality',
      description: 'Curated selection of snacks for every stage of healthy eating',
      icon: 'FiPackage'
    },
    {
      title: 'Local Commitment',
      description: 'Same-day service powered by remote inventory monitoring',
      icon: 'FiGlobe'
    }
  ],
  teamMembers: [
    {
      name: 'Rusty Popp',
      role: 'Founder & CEO',
      exp: '20+ years in vending industry',
      img: 'https://via.placeholder.com/200'
    }
  ],
  localEmphasis: {
    title: 'Community Focused Service',
    description: 'As a locally-owned business, we understand...',
    bulletPoints: [
      '24/7 emergency maintenance',
      'Bi-weekly freshness rotations',
      'Seasonal product updates',
      'Community donation program'
    ],
    imageUrl: ''
  },
  communityCommitment: [
    {
      title: 'We Give Back',
      description: '5% of profits support local food banks and youth programs',
      icon: 'FiHeart'
    },
    {
      title: 'Eco-Friendly',
      description: 'Energy-efficient machines and recycling initiatives',
      icon: 'FiGlobe'
    },
    {
      title: 'Local Jobs',
      description: '90% of our team lives within 50 miles of our clients',
      icon: 'FiUsers'
    }
  ],
  testimonials: [
    {
      quote: 'Preferred Vending transformed our break room...',
      author: '- Manufacturing Plant Manager'
    }
  ]
};

const SectionWrapper = ({ title, children, isOpen = true, onToggle }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6 overflow-hidden">
    <div 
      className="p-6 cursor-pointer flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={onToggle}
    >
      <h2 className="text-xl font-bold dark:text-white">{title}</h2>
      {isOpen ? <FiChevronUp /> : <FiChevronDown />}
    </div>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 pb-6"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ImageUploader = ({ id, label, url, uploading, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="flex items-center gap-4">
      <input
        type="file"
        onChange={onChange}
        className="hidden"
        id={id}
        accept="image/*"
      />
      <label
        htmlFor={id}
        className={`flex-1 p-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer 
          ${uploading ? 'opacity-50' : 'hover:border-primary-500'} 
          dark:border-gray-600 dark:hover:border-primary-400`}
      >
        <FiUpload className="w-6 h-6" />
        <span className="text-sm text-center">
          {uploading ? 'Uploading...' : (url ? 'Replace Image' : 'Click to Upload')}
        </span>
      </label>
      {url && (
        <div className="relative w-32 h-32">
          <img
            src={url}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={() => onChange({ target: { files: null } })}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  </div>
);

const EditableArray = ({ items, onAdd, onRemove, children }) => (
  <div className="space-y-4">
    {items.map((_, index) => (
      <div key={index} className="relative group border rounded-lg p-4 dark:border-gray-700">
        <button
          onClick={() => onRemove(index)}
          className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FiX className="w-4 h-4" />
        </button>
        {children(index)}
      </div>
    ))}
    <button
      onClick={onAdd}
      className="w-full py-2 border-2 border-dashed rounded-lg flex items-center justify-center gap-2
        hover:border-primary-500 dark:hover:border-primary-400 transition-colors"
    >
      <FiPlus /> Add Item
    </button>
  </div>
);

function AdminAboutPage() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState({ isUploading: false, field: '', index: null });
  const [openSections, setOpenSections] = useState({
    meta: true,
    founder: true,
    mission: true,
    team: true,
    local: true,
    community: true,
    testimonials: true
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'aboutPage', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent({ ...DEFAULT_CONTENT, ...docSnap.data() });
        } else {
          await setDoc(doc(db, 'aboutPage', 'content'), DEFAULT_CONTENT);
          setContent(DEFAULT_CONTENT);
        }
      } catch (error) {
        console.error('Error loading content:', error);
        toast.error('Failed to load content');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = async () => {
    const savePromise = updateDoc(doc(db, 'aboutPage', 'content'), content);
    
    toast.promise(savePromise, {
      loading: 'Saving changes...',
      success: 'Changes saved successfully!',
      error: 'Failed to save changes',
    });
  };

  const handleImageUpload = async (e, field, index = null) => {
    const file = e.target.files[0];
    if (!file) {
      // Handle image removal
      if (index !== null) {
        const updatedArray = [...content[field]];
        updatedArray[index].img = '';
        setContent(prev => ({ ...prev, [field]: updatedArray }));
      } else {
        setContent(prev => ({
          ...prev,
          [field]: {
            ...prev[field],
            imageUrl: ''
          }
        }));
      }
      return;
    }

    const uploadKey = index !== null ? `${field}-${index}` : field;
    setUploading({ isUploading: true, field: uploadKey, index });

    try {
      const storageRef = ref(storage, `about-page/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      if (index !== null) {
        const updatedArray = [...content[field]];
        updatedArray[index].img = url;
        setContent(prev => ({ ...prev, [field]: updatedArray }));
      } else {
        setContent(prev => ({
          ...prev,
          [field]: {
            ...prev[field],
            imageUrl: url
          }
        }));
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Image upload failed');
    } finally {
      setUploading({ isUploading: false, field: '', index: null });
    }
  };

  const handleTextChange = (field, value, parentField = null) => {
    if (parentField) {
      setContent(prev => ({
        ...prev,
        [parentField]: {
          ...prev[parentField],
          [field]: value
        }
      }));
    } else {
      setContent(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayItemChange = (arrayField, index, field, value) => {
    const updatedArray = [...content[arrayField]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    setContent(prev => ({ ...prev, [arrayField]: updatedArray }));
  };

  const addArrayItem = (arrayField, template) => {
    setContent(prev => ({
      ...prev,
      [arrayField]: [...prev[arrayField], template]
    }));
  };

  const removeArrayItem = (arrayField, index) => {
    setContent(prev => ({
      ...prev,
      [arrayField]: prev[arrayField].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <AdminLayout title="About Page Editor">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="About Page Editor">
      <Helmet>
        <title>Admin - Edit About Page</title>
      </Helmet>
      <Toaster position="bottom-right" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-64 space-y-2">
            <motion.button
              onClick={handleSave}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg flex items-center gap-2 justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <FiSave /> Save All
            </motion.button>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2 dark:text-white">Sections</h3>
              {Object.entries(openSections).map(([section, isOpen]) => (
                <button
                  key={section}
                  onClick={() => toggleSection(section)}
                  className={`w-full text-left px-2 py-1 rounded flex items-center gap-2 ${
                    isOpen ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                >
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  {section === 'meta' && 'Meta Information'}
                  {section === 'founder' && 'Founder Section'}
                  {section === 'mission' && 'Mission Principles'}
                  {section === 'team' && 'Team Members'}
                  {section === 'local' && 'Local Emphasis'}
                  {section === 'community' && 'Community Commitment'}
                  {section === 'testimonials' && 'Testimonials'}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Meta Section */}
            <SectionWrapper 
              title="Meta Information" 
              isOpen={openSections.meta}
              onToggle={() => toggleSection('meta')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Page Title</label>
                  <input
                    value={content.meta.title}
                    onChange={(e) => handleTextChange('title', e.target.value, 'meta')}
                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Meta Description</label>
                  <textarea
                    value={content.meta.description}
                    onChange={(e) => handleTextChange('description', e.target.value, 'meta')}
                    className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 h-24"
                  />
                </div>
              </div>
            </SectionWrapper>

            {/* Founder Section */}
            <SectionWrapper 
              title="Founder Section" 
              isOpen={openSections.founder}
              onToggle={() => toggleSection('founder')}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Title</label>
                    <input
                      value={content.founderSection.title}
                      onChange={(e) => handleTextChange('title', e.target.value, 'founderSection')}
                      className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Subtitle</label>
                    <input
                      value={content.founderSection.subtitle}
                      onChange={(e) => handleTextChange('subtitle', e.target.value, 'founderSection')}
                      className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Heading</label>
                    <input
                      value={content.founderSection.heading}
                      onChange={(e) => handleTextChange('heading', e.target.value, 'founderSection')}
                      className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Description</label>
                    <textarea
                      value={content.founderSection.description}
                      onChange={(e) => handleTextChange('description', e.target.value, 'founderSection')}
                      className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 h-32"
                    />
                  </div>
                </div>
                
                <ImageUploader
                  id="founderImage"
                  label="Founder Image"
                  url={content.founderSection.imageUrl}
                  uploading={uploading.field === 'founderSection'}
                  onChange={(e) => handleImageUpload(e, 'founderSection')}
                />

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Bullet Points</label>
                  <EditableArray
                    items={content.founderSection.bulletPoints}
                    onAdd={() => handleTextChange(
                      'bulletPoints', 
                      [...content.founderSection.bulletPoints, 'New bullet point'], 
                      'founderSection'
                    )}
                    onRemove={(index) => handleTextChange(
                      'bulletPoints',
                      content.founderSection.bulletPoints.filter((_, i) => i !== index),
                      'founderSection'
                    )}
                  >
                    {(index) => (
                      <input
                        value={content.founderSection.bulletPoints[index]}
                        onChange={(e) => {
                          const newPoints = [...content.founderSection.bulletPoints];
                          newPoints[index] = e.target.value;
                          handleTextChange('bulletPoints', newPoints, 'founderSection');
                        }}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                      />
                    )}
                  </EditableArray>
                </div>
              </div>
            </SectionWrapper>

            {/* Mission Principles Section */}
            <SectionWrapper 
              title="Mission Principles" 
              isOpen={openSections.mission}
              onToggle={() => toggleSection('mission')}
            >
              <EditableArray
                items={content.missionPrinciples}
                onAdd={() => addArrayItem('missionPrinciples', { 
                  title: '', 
                  description: '', 
                  icon: 'FiCircle' 
                })}
                onRemove={(index) => removeArrayItem('missionPrinciples', index)}
              >
                {(index) => (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">Title</label>
                      <input
                        value={content.missionPrinciples[index].title}
                        onChange={(e) => handleArrayItemChange('missionPrinciples', index, 'title', e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">Description</label>
                      <input
                        value={content.missionPrinciples[index].description}
                        onChange={(e) => handleArrayItemChange('missionPrinciples', index, 'description', e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">Icon</label>
                      <input
                        value={content.missionPrinciples[index].icon}
                        onChange={(e) => handleArrayItemChange('missionPrinciples', index, 'icon', e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                        placeholder="e.g., FiUsers"
                      />
                    </div>
                  </div>
                )}
              </EditableArray>
            </SectionWrapper>

            {/* Team Members Section */}
            <SectionWrapper 
              title="Team Members" 
              isOpen={openSections.team}
              onToggle={() => toggleSection('team')}
            >
              <EditableArray
                items={content.teamMembers}
                onAdd={() => addArrayItem('teamMembers', { 
                  name: '', 
                  role: '', 
                  exp: '', 
                  img: '' 
                })}
                onRemove={(index) => removeArrayItem('teamMembers', index)}
              >
                {(index) => (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3 space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Name</label>
                        <input
                          value={content.teamMembers[index].name}
                          onChange={(e) => handleArrayItemChange('teamMembers', index, 'name', e.target.value)}
                          className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Role</label>
                        <input
                          value={content.teamMembers[index].role}
                          onChange={(e) => handleArrayItemChange('teamMembers', index, 'role', e.target.value)}
                          className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">Experience</label>
                        <input
                          value={content.teamMembers[index].exp}
                          onChange={(e) => handleArrayItemChange('teamMembers', index, 'exp', e.target.value)}
                          className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <ImageUploader
                        id={`teamImage-${index}`}
                        label="Team Member Photo"
                        url={content.teamMembers[index].img}
                        uploading={uploading.field === `teamMembers-${index}`}
                        onChange={(e) => handleImageUpload(e, 'teamMembers', index)}
                      />
                    </div>
                  </div>
                )}
              </EditableArray>
            </SectionWrapper>

            {/* Local Emphasis Section */}
            <SectionWrapper 
              title="Local Emphasis" 
              isOpen={openSections.local}
              onToggle={() => toggleSection('local')}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Title</label>
                    <input
                      value={content.localEmphasis.title}
                      onChange={(e) => handleTextChange('title', e.target.value, 'localEmphasis')}
                      className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Description</label>
                    <textarea
                      value={content.localEmphasis.description}
                      onChange={(e) => handleTextChange('description', e.target.value, 'localEmphasis')}
                      className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 h-32"
                    />
                  </div>
                </div>
                
                <ImageUploader
                  id="localEmphasisImage"
                  label="Local Emphasis Image"
                  url={content.localEmphasis.imageUrl}
                  uploading={uploading.field === 'localEmphasis'}
                  onChange={(e) => handleImageUpload(e, 'localEmphasis')}
                />

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Bullet Points</label>
                  <EditableArray
                    items={content.localEmphasis.bulletPoints}
                    onAdd={() => handleTextChange(
                      'bulletPoints', 
                      [...content.localEmphasis.bulletPoints, 'New bullet point'], 
                      'localEmphasis'
                    )}
                    onRemove={(index) => handleTextChange(
                      'bulletPoints',
                      content.localEmphasis.bulletPoints.filter((_, i) => i !== index),
                      'localEmphasis'
                    )}
                  >
                    {(index) => (
                      <input
                        value={content.localEmphasis.bulletPoints[index]}
                        onChange={(e) => {
                          const newPoints = [...content.localEmphasis.bulletPoints];
                          newPoints[index] = e.target.value;
                          handleTextChange('bulletPoints', newPoints, 'localEmphasis');
                        }}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                      />
                    )}
                  </EditableArray>
                </div>
              </div>
            </SectionWrapper>

            {/* Community Commitment Section */}
            <SectionWrapper 
              title="Community Commitment" 
              isOpen={openSections.community}
              onToggle={() => toggleSection('community')}
            >
              <EditableArray
                items={content.communityCommitment}
                onAdd={() => addArrayItem('communityCommitment', { 
                  title: '', 
                  description: '', 
                  icon: 'FiCircle' 
                })}
                onRemove={(index) => removeArrayItem('communityCommitment', index)}
              >
                {(index) => (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">Title</label>
                      <input
                        value={content.communityCommitment[index].title}
                        onChange={(e) => handleArrayItemChange('communityCommitment', index, 'title', e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">Description</label>
                      <input
                        value={content.communityCommitment[index].description}
                        onChange={(e) => handleArrayItemChange('communityCommitment', index, 'description', e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">Icon</label>
                      <input
                        value={content.communityCommitment[index].icon}
                        onChange={(e) => handleArrayItemChange('communityCommitment', index, 'icon', e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                        placeholder="e.g., FiHeart"
                      />
                    </div>
                  </div>
                )}
              </EditableArray>
            </SectionWrapper>

            {/* Testimonials Section */}
            <SectionWrapper 
              title="Testimonials" 
              isOpen={openSections.testimonials}
              onToggle={() => toggleSection('testimonials')}
            >
              <EditableArray
                items={content.testimonials}
                onAdd={() => addArrayItem('testimonials', { 
                  quote: '', 
                  author: '' 
                })}
                onRemove={(index) => removeArrayItem('testimonials', index)}
              >
                {(index) => (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">Quote</label>
                      <textarea
                        value={content.testimonials[index].quote}
                        onChange={(e) => handleArrayItemChange('testimonials', index, 'quote', e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 h-24"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">Author</label>
                      <input
                        value={content.testimonials[index].author}
                        onChange={(e) => handleArrayItemChange('testimonials', index, 'author', e.target.value)}
                        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                )}
              </EditableArray>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminAboutPage;