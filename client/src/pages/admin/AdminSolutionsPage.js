import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FiSave, FiPlus, FiTrash, FiArrowUp, FiArrowDown, FiStar, FiShield, FiSettings, FiTool, FiMonitor, FiSmile, FiCalendar, FiShoppingCart, FiThumbsUp, FiMapPin } from 'react-icons/fi';
import AdminLayout from './layout/AdminLayout';

const defaultContent = {
  hero: {
    title: "Tailored Vending Solutions",
    subtitle: "Built for Reliability",
    description: `"We deliver customized vending solutions that keep your operations running smoothly"`
  },
  serviceReliability: {
    title: "Service You Can Depend On",
    description: `"We follow consumer trends and employ your feedback..."`,
    listItems: [
      "Routine maintenance & deep cleaning",
      "Quick and efficient restocking",
      "Product assortment optimization",
      "24/7 remote monitoring"
    ]
  },
  serviceCommitment: {
    title: "Our Service Commitment",
    services: [
      {
        icon: "FiTool",
        title: "Proactive Maintenance",
        text: "Regular servicing and immediate response to technical issues"
      },
      {
        icon: "FiMonitor",
        title: "Smart Inventory Management",
        text: "Real-time stock monitoring prevents empty machines"
      },
      {
        icon: "FiSmile",
        title: "Customer-Driven Selection",
        text: "Regular product rotation based on user preferences"
      }
    ]
  },
  coverageAreas: [
    "Solano County",
    "Yolo County",
    "Sacramento County"
  ],
  whyChooseUs: [
    { 
      title: 'Customized Menus',
      text: 'Tailored product selections matching your audience preferences'
    },
    { 
      title: 'Routine Maintenance',
      text: 'Full-service cleaning & maintenance program included'
    },
    { 
      title: 'Smart Technology',
      text: 'Remote monitoring & advanced payment systems'
    },
    { 
      title: 'Local Expertise',
      text: 'Personal service with community understanding'
    }
  ],
  pricing: {
    title: "Transparent Pricing",
    description: "“No hidden fees - our solutions include:”",
    listItems: [
      "ADA-compliant machines at no extra cost",
      "Credit/debit processing fees included",
      "Free maintenance & technical support",
      "No long-term contracts"
    ]
  }
};

const iconComponents = {
  FiTool: FiTool,
  FiMonitor: FiMonitor,
  FiSmile: FiSmile,
  FiCalendar: FiCalendar,
  FiShoppingCart: FiShoppingCart,
  FiThumbsUp: FiThumbsUp,
  FiMapPin: FiMapPin
};


function AdminSolutionsPage() {
  const [content, setContent] = useState({ ...defaultContent });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'solutions');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent({
            ...defaultContent,
            ...docSnap.data()
          });
        } else {
          console.log("No document found, using defaults");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    try {
      console.log("Attempting to save content:", content);
      
      const docRef = doc(db, 'content', 'solutions');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document exists, updating...");
        await setDoc(docRef, content); // Using setDoc instead of updateDoc
      } else {
        console.log("Document doesn't exist, creating...");
        await setDoc(docRef, content); // This will create the document
      }
      
      console.log("Operation completed successfully");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Full error:", error);
      setError(`Failed to save: ${error.message}`);
    }
  };
  
  if (loading) return (
    <div className="p-8 text-center">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Solutions Page Editor">
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
        <Helmet>
          <title>Manage Solutions Content</title>
        </Helmet>

        <motion.form 
          onSubmit={handleSubmit}
          className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Solutions Content Manager</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Edit and preview your solutions page content</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all content to defaults?')) {
                    setContent({ ...defaultContent });
                  }
                }}
                className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 justify-center"
              >
                <FiTrash className="w-4 h-4" /> Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 justify-center shadow-lg shadow-green-500/20"
              >
                <FiSave className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl border border-red-100 dark:border-red-800 flex items-center gap-3"
              >
                <div className="h-6 w-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <FiSave className="w-4 h-4 text-red-600 dark:text-red-300" />
                </div>
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl border border-green-100 dark:border-green-800 flex items-center gap-3"
              >
                <div className="h-6 w-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <FiSave className="w-4 h-4 text-green-600 dark:text-green-300" />
                </div>
                Content saved successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-8">
            <Section title="Hero Section" icon={FiStar}>
              <Input
                label="Title"
                value={content.hero?.title || ''}
                onChange={e => setContent({ ...content, hero: { ...content.hero, title: e.target.value }})}
                placeholder="Main hero heading..."
              />
              <Input
                label="Subtitle"
                value={content.hero?.subtitle || ''}
                onChange={e => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value }})}
                placeholder="Hero subheading..."
              />
              <TextArea
                label="Description"
                value={content.hero?.description || ''}
                onChange={e => setContent({ ...content, hero: { ...content.hero, description: e.target.value }})}
                placeholder="Short description for hero section..."
              />
            </Section>

            <Section title="Service Reliability" icon={FiShield}>
              <Input
                label="Section Title"
                value={content.serviceReliability?.title || ''}
                onChange={e => setContent({ ...content, serviceReliability: { ...content.serviceReliability, title: e.target.value }})}
              />
              <TextArea
                label="Description"
                value={content.serviceReliability?.description || ''}
                onChange={e => setContent({ ...content, serviceReliability: { ...content.serviceReliability, description: e.target.value }})}
              />
              <ListEditor
                items={content.serviceReliability?.listItems || []}
                onChange={newItems => setContent({ ...content, serviceReliability: { ...content.serviceReliability, listItems: newItems }})}
                label="Benefits List"
              />
            </Section>

            <Section title="Service Commitment" icon={FiSettings}>
              <Input
                label="Section Title"
                value={content.serviceCommitment?.title || ''}
                onChange={e => setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, title: e.target.value }})}
              />
              <div className="space-y-4">
                {(content.serviceCommitment?.services || []).map((service, index) => (
                  <motion.div 
                    key={index}
                    className="group relative bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">#{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newServices = content.serviceCommitment.services.filter((_, i) => i !== index);
                            setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
                          }}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-red-500 hover:text-red-700"
                        >
                          <FiTrash className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => {
                            const newServices = [...content.serviceCommitment.services];
                            [newServices[index], newServices[index - 1]] = [newServices[index - 1], newServices[index]];
                            setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
                          }}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg disabled:opacity-40"
                        >
                          <FiArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={index === content.serviceCommitment.services.length - 1}
                          onClick={() => {
                            const newServices = [...content.serviceCommitment.services];
                            [newServices[index], newServices[index + 1]] = [newServices[index + 1], newServices[index]];
                            setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
                          }}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg disabled:opacity-40"
                        >
                          <FiArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-2">Icon</label>
                        <select
                          value={service.icon || 'FiTool'}
                          onChange={e => {
                            const newServices = [...content.serviceCommitment.services];
                            newServices[index].icon = e.target.value;
                            setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
                          }}
                          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-2 focus:ring-blue-500"
                        >
                          {Object.keys(iconComponents).map(icon => (
                            <option key={icon} value={icon}>{icon}</option>
                          ))}
                        </select>
                      </div>
                      <Input
                        label="Title"
                        value={service.title || ''}
                        onChange={e => {
                          const newServices = [...content.serviceCommitment.services];
                          newServices[index].title = e.target.value;
                          setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
                        }}
                      />
                    </div>
                    <TextArea
                      label="Description"
                      value={service.text || ''}
                      onChange={e => {
                        const newServices = [...content.serviceCommitment.services];
                        newServices[index].text = e.target.value;
                        setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
                      }}
                    />
                  </motion.div>
                ))}
                <button
                  type="button"
                  onClick={() => setContent({ ...content, serviceCommitment: { 
                    ...content.serviceCommitment, 
                    services: [...(content.serviceCommitment?.services || []), { icon: 'FiTool', title: 'New Service', text: 'Service description' }]
                  }})}
                  className="w-full py-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <FiPlus className="w-4 h-4" /> Add Service
                </button>
              </div>
            </Section>

            <Section title="Coverage Areas" icon={FiMapPin}>
              <ListEditor
                items={content.coverageAreas || []}
                onChange={newItems => setContent({ ...content, coverageAreas: newItems })}
                label="Counties We Serve"
              />
            </Section>

            <Section title="Why Choose Us" icon={FiThumbsUp}>
              <div className="space-y-4">
                {content.whyChooseUs.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="group relative bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">#{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newFeatures = content.whyChooseUs.filter((_, i) => i !== index);
                            setContent({ ...content, whyChooseUs: newFeatures });
                          }}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-red-500 hover:text-red-700"
                        >
                          <FiTrash className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => {
                            const newFeatures = [...content.whyChooseUs];
                            [newFeatures[index], newFeatures[index - 1]] = [newFeatures[index - 1], newFeatures[index]];
                            setContent({ ...content, whyChooseUs: newFeatures });
                          }}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg disabled:opacity-40"
                        >
                          <FiArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={index === content.whyChooseUs.length - 1}
                          onClick={() => {
                            const newFeatures = [...content.whyChooseUs];
                            [newFeatures[index], newFeatures[index + 1]] = [newFeatures[index + 1], newFeatures[index]];
                            setContent({ ...content, whyChooseUs: newFeatures });
                          }}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg disabled:opacity-40"
                        >
                          <FiArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <Input
                      label="Title"
                      value={item.title}
                      onChange={e => {
                        const newFeatures = [...content.whyChooseUs];
                        newFeatures[index].title = e.target.value;
                        setContent({ ...content, whyChooseUs: newFeatures });
                      }}
                    />
                    <TextArea
                      label="Description"
                      value={item.text}
                      onChange={e => {
                        const newFeatures = [...content.whyChooseUs];
                        newFeatures[index].text = e.target.value;
                        setContent({ ...content, whyChooseUs: newFeatures });
                      }}
                    />
                  </motion.div>
                ))}
                <button
                  type="button"
                  onClick={() => setContent({ ...content, whyChooseUs: [...content.whyChooseUs, { title: 'New Feature', text: 'Feature description' }]})}
                  className="w-full py-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <FiPlus className="w-4 h-4" /> Add Feature
                </button>
              </div>
            </Section>

            <Section title="Pricing Section" icon={FiShoppingCart}>
              <Input
                label="Title"
                value={content.pricing?.title || ''}
                onChange={e => setContent({ ...content, pricing: { ...content.pricing, title: e.target.value }})}
              />
              <TextArea
                label="Description"
                value={content.pricing?.description || ''}
                onChange={e => setContent({ ...content, pricing: { ...content.pricing, description: e.target.value }})}
              />
              <ListEditor
                items={content.pricing?.listItems || []}
                onChange={newItems => setContent({ ...content, pricing: { ...content.pricing, listItems: newItems }})}
                label="Pricing Features"
              />
            </Section>
          </div>
        </motion.form>
      </div>
    </AdminLayout>
  );
}

const Section = ({ title, children, icon: Icon }) => (
  <motion.div 
    className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
    </div>
    <div className="space-y-5">{children}</div>
  </motion.div>
);

const Input = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      rows="3"
      placeholder={placeholder}
      className="w-full px-4 py-2.5 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
  </div>
);

const ListEditor = ({ items, onChange, label }) => (
  <div>
    <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            value={item}
            onChange={e => {
              const newItems = [...items];
              newItems[index] = e.target.value;
              onChange(newItems);
            }}
            className="flex-1 px-4 py-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Item ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-red-500 hover:text-red-700"
          >
            <FiTrash className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="w-full py-2.5 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-xl flex items-center justify-center gap-2"
      >
        <FiPlus className="w-4 h-4" /> Add List Item
      </button>
    </div>
  </div>
);

export default AdminSolutionsPage;