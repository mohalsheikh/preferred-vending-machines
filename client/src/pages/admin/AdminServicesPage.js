import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from './layout/AdminLayout';
import { 
  FiSave, FiPlus, FiTrash, FiX, FiChevronDown, FiChevronUp,
  FiSettings, FiShoppingCart, FiMapPin, FiStar, FiZap,
  FiUsers, FiAward, FiClock, FiCheckCircle, FiTruck,
  FiShield, FiPieChart, FiLayers
} from 'react-icons/fi';

const iconComponents = {
  FiSettings, FiShoppingCart, FiMapPin, FiStar, FiZap,
  FiUsers, FiAward, FiClock, FiCheckCircle, FiTruck,
  FiShield, FiPieChart, FiLayers
};

const IconPicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = iconComponents[value] || FiSettings;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 border rounded-lg bg-white hover:bg-gray-50
                 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors"
      >
        <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
          <IconComponent className="w-5 h-5" />
          <span>{value}</span>
        </div>
        {isOpen ? (
          <FiChevronUp className="text-gray-600 dark:text-gray-400" />
        ) : (
          <FiChevronDown className="text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg
                        dark:bg-gray-800 dark:border-gray-600 max-h-60 overflow-y-auto">
          <div className="grid grid-cols-3 gap-2 p-2">
            {Object.keys(iconComponents).map((iconName) => {
              const Icon = iconComponents[iconName];
              return (
                <button
                  key={iconName}
                  onClick={() => {
                    onChange(iconName);
                    setIsOpen(false);
                  }}
                  className="p-2 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 rounded-lg
                            dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200"
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs">{iconName}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const AdminServicesPage = () => {
  const [content, setContent] = useState({
    meta: { title: '', description: '' },
    hero: { title: '', subtitle: '', gradientText: '' },
    services: [],
    whyChooseUs: { title: '', items: [] },
    stats: [],
    testimonials: []
  });
  const [activeSection, setActiveSection] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleFeatureChange = (serviceIndex, featureIndex, value) => {
    const updatedServices = [...content.services];
    updatedServices[serviceIndex].features[featureIndex] = value;
    setContent(prev => ({ ...prev, services: updatedServices }));
  };

  useEffect(() => {
    const fetchContent = async () => {
      const docSnap = await getDoc(doc(db, 'content', 'servicesPage'));
      if (docSnap.exists()) {
        setContent(docSnap.data());
      }
    };
    fetchContent();
  }, []);

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleArrayChange = (sectionPath, index, field, value) => {
    setContent(prev => {
      const keys = sectionPath.split('.');
      
      if (keys.length === 2) {
        const [parent, child] = keys;
        const updatedArray = [...prev[parent][child]];
        updatedArray[index][field] = value;
  
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: updatedArray,
          },
        };
      } else {
        const updatedArray = [...prev[sectionPath]];
        updatedArray[index][field] = value;
  
        return {
          ...prev,
          [sectionPath]: updatedArray,
        };
      }
    });
  };

  const addItem = (sectionPath, template = {}) => {
    setContent(prev => {
      const keys = sectionPath.split('.');
      if (keys.length === 2) {
        const [parent, child] = keys;
        const updatedChildArray = [...prev[parent][child], template];
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: updatedChildArray,
          },
        };
      } else {
        return {
          ...prev,
          [sectionPath]: [...prev[sectionPath], template],
        };
      }
    });
  };

  const removeItem = (section, index) => {
    const updated = [...content[section]];
    updated.splice(index, 1);
    setContent(prev => ({ ...prev, [section]: updated }));
  };

  const addFeature = (serviceIndex) => {
    const updated = [...content.services];
    updated[serviceIndex].features.push('');
    setContent(prev => ({ ...prev, services: updated }));
  };

  const removeFeature = (serviceIndex, featureIndex) => {
    const updated = [...content.services];
    updated[serviceIndex].features.splice(featureIndex, 1);
    setContent(prev => ({ ...prev, services: updated }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'content', 'servicesPage'), content);
      setSaveMessage('Successfully saved all changes!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage(`Error: ${error.message}`);
    }
    setIsSaving(false);
  };

  const renderSectionButton = (section, label) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`px-4 py-2 rounded-lg transition-all font-medium
        ${activeSection === section 
          ? 'bg-primary-600 text-white shadow-md'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );

return (
  <AdminLayout title="Services Page Editor">
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Services Page Editor</h1>

        {/* Section buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {renderSectionButton('meta', 'Meta')}
          {renderSectionButton('hero', 'Hero')}
          {renderSectionButton('services', 'Services')}
          {renderSectionButton('whyChooseUs', 'Why Choose Us')}
          {renderSectionButton('stats', 'Stats')}
          {renderSectionButton('testimonials', 'Testimonials')}
        </div>

        {/* Meta Section */}
        {activeSection === 'meta' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 border dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Meta Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Page Title</label>
                <input
                  type="text"
                  value={content.meta.title}
                  onChange={(e) => handleChange('meta', 'title', e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                            bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  placeholder="Page Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Meta Description</label>
                <textarea
                  value={content.meta.description}
                  onChange={(e) => handleChange('meta', 'description', e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                            bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  placeholder="Meta Description"
                  rows="3"
                />
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        {activeSection === 'hero' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 border dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Main Title</label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => handleChange('hero', 'title', e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                            bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  placeholder="Main Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Gradient Text</label>
                <input
                  type="text"
                  value={content.hero.gradientText}
                  onChange={(e) => handleChange('hero', 'gradientText', e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                            bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  placeholder="Gradient Text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Subtitle</label>
                <textarea
                  value={content.hero.subtitle}
                  onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                            bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  placeholder="Subtitle"
                  rows="3"
                />
              </div>
            </div>
          </div>
        )}

        {/* Services Section */}
        {activeSection === 'services' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 border dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Services</h2>
              <button
                onClick={() => addItem('services', { 
                  title: 'New Service', 
                  description: '', 
                  iconName: 'FiSettings', 
                  features: [''] 
                })}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2
                          transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                <FiPlus /> Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {content.services.map((service, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30 dark:border-gray-600">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Service #{index + 1}</h3>
                    <button
                      onClick={() => removeItem('services', index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <FiTrash size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Icon</label>
                      <IconPicker
                        value={service.iconName}
                        onChange={(value) => handleArrayChange('services', index, 'iconName', value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => handleArrayChange('services', index, 'title', e.target.value)}
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                  bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        placeholder="Service Title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Description</label>
                      <textarea
                        value={service.description}
                        onChange={(e) => handleArrayChange('services', index, 'description', e.target.value)}
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                  bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        placeholder="Service Description"
                        rows="3"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Features</label>
                        <button
                          onClick={() => addFeature(index)}
                          className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm
                                    dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          <FiPlus size={14} /> Add Feature
                        </button>
                      </div>
                      
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, fIndex, e.target.value)}
                            className="flex-1 p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                      bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            placeholder="Feature description"
                          />
                          <button
                            onClick={() => removeFeature(index, fIndex)}
                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg
                                      dark:hover:bg-red-900/20"
                          >
                            <FiX size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Choose Us Section */}
        {activeSection === 'whyChooseUs' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 border dark:border-gray-700">
            <div className="space-y-4 mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Why Choose Us</h2>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Section Title</label>
                <input
                  type="text"
                  value={content.whyChooseUs.title}
                  onChange={(e) => handleChange('whyChooseUs', 'title', e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                            bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  placeholder="Section Title"
                />
              </div>
            </div>

            <div className="space-y-4">
              {content.whyChooseUs.items.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30 dark:border-gray-600">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Item #{index + 1}</h3>
                    <button
                      onClick={() => removeItem('whyChooseUs.items', index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <FiTrash size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Icon</label>
                      <IconPicker
                        value={item.iconName}
                        onChange={(value) => handleArrayChange('whyChooseUs.items', index, 'iconName', value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleArrayChange('whyChooseUs.items', index, 'title', e.target.value)}
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                  bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        placeholder="Item Title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleArrayChange('whyChooseUs.items', index, 'description', e.target.value)}
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                  bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        placeholder="Item Description"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => addItem('whyChooseUs.items', { 
                  title: '', 
                  description: '', 
                  iconName: 'FiStar' 
                })}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2
                          transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                <FiPlus /> Add Item
              </button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {activeSection === 'stats' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 border dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Statistics</h2>
            
            <div className="space-y-4">
              {content.stats.map((stat, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30 dark:border-gray-600">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Stat #{index + 1}</h3>
                    <button
                      onClick={() => removeItem('stats', index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <FiTrash size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Icon</label>
                      <IconPicker
                        value={stat.iconName}
                        onChange={(value) => handleArrayChange('stats', index, 'iconName', value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Value</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)}
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                  bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        placeholder="Stat Value (e.g., 500+)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)}
                        className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                                  bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                        placeholder="Stat Label"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => addItem('stats', { 
                  value: '', 
                  label: '', 
                  iconName: 'FiAward' 
                })}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2
                          transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                <FiPlus /> Add Statistic
              </button>
            </div>
          </div>
        )}

{/* Testimonials Section */}
{activeSection === 'testimonials' && (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm mb-6 border dark:border-gray-700">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Testimonials</h2>
      <button
        onClick={() => addItem('testimonials', { 
          quote: '', 
          author: '', 
          role: '' 
        })}
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2
                  transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
      >
        <FiPlus /> Add Testimonial
      </button>
    </div>
    
    <div className="space-y-4">
      {content.testimonials.map((testimonial, index) => (
        <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Testimonial #{index + 1}</h3>
            <button
              onClick={() => removeItem('testimonials', index)}
              className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <FiTrash size={18} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Quote</label>
              <textarea
                value={testimonial.quote}
                onChange={(e) => handleArrayChange('testimonials', index, 'quote', e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                          bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                placeholder="Testimonial Quote"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Author Name</label>
              <input
                type="text"
                value={testimonial.author}
                onChange={(e) => handleArrayChange('testimonials', index, 'author', e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                          bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                placeholder="Author Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">Author Role/Company</label>
              <input
                type="text"
                value={testimonial.role}
                onChange={(e) => handleArrayChange('testimonials', index, 'role', e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                          bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                placeholder="Author Role/Company"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
          >
            <FiSave size={20} />
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
          {saveMessage && (
            <div className={`mt-2 p-3 rounded-lg shadow-md ${
              saveMessage.includes('Error') 
              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' 
              : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              }`}>
              {saveMessage}
            </div>
          )}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminServicesPage;

