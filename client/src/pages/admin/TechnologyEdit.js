import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FiCheck, FiPlus, FiTrash, FiX, FiSave, FiArrowUp, FiArrowDown, FiImage, FiCreditCard, FiMonitor, FiPackage, FiSmartphone,
  FiHeart,
  FiSettings,
  FiWifi,
  FiAlertCircle,
  FiSun,
  FiMoon,
  FiShoppingCart
 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from './layout/AdminLayout';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// Helper function to generate stable IDs for droppables
const getDroppableId = (section, index = '') => `${section}-droppable${index ? `-${index}` : ''}`;

const TechnologyEdit = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  const [content, setContent] = useState({
    hero: {
      title: "Smart Vending Solutions",
      subtitle: "For Modern Needs",
      description: "Experience the next generation of vending technology designed for convenience and efficiency."
    },
    payments: {
      title: "Seamless Payment Solutions",
      subtitle: "Offering multiple secure payment options to suit every user",
      items: [
        { icon: "FiCreditCard", title: "Credit/Debit Cards", text: "Chip & contactless enabled" },
        { icon: "FiSmartphone", title: "Mobile Payments", text: "Apple Pay & Google Pay" },
        { icon: "FiHeart", title: "Loyalty Program", text: "Monyx Mobile App rewards" },
        { icon: "FiSettings", title: "Cash Payments", text: "Advanced bill validation" }
      ]
    },
    features: {
      title: "Real-Time Inventory Tracking",
      description: "Our software provides live inventory updates, ensuring machines stay fully stocked and operational.",
      items: [
        "Automatic restock alerts",
        "24/7 Remote monitoring",
        "Predictive maintenance"
      ]
    },
    environments: {
      title: "Perfect for Any Environment",
      subtitle: "Customizable solutions for diverse organizational needs",
      items: [
        { 
          title: "Corporate Offices", 
          features: ["Healthy snack options", "Employee wellness integration", "Discreet operation"] 
        },
        { 
          title: "Schools & Universities", 
          features: ["Student-friendly pricing", "Nutritional education displays", "Parental controls"] 
        },
        { 
          title: "Medical Facilities", 
          features: ["24/7 availability", "Special dietary options", "Sanitary touchless interface"] 
        }
      ]
    },
    smartFeatures: {
      title: "Smart Features Overview",
      items: [
        {
          title: "Sales Analytics",
          description: "Detailed reports on product performance and consumer behavior"
        },
        {
          title: "Custom Alerts", 
          description: "Instant notifications for maintenance needs or technical issues"
        },
        {
          title: "Energy Efficient",
          description: "Eco-friendly operation with low power consumption modes"
        }
      ]
    }
  });

  const [availableIcons] = useState([
    "FiCreditCard", "FiSmartphone", "FiHeart", "FiSettings",
    "FiMonitor", "FiPackage", "FiWifi", "FiAlertCircle",
    "FiCheck", "FiSun", "FiMoon", "FiShoppingCart"
  ]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'technologyPage');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (!data.smartFeatures) {
            data.smartFeatures = {
              title: "Smart Features Overview",
              items: [
                {
                  title: "Sales Analytics",
                  description: "Detailed reports on product performance and consumer behavior"
                },
                {
                  title: "Custom Alerts", 
                  description: "Instant notifications for maintenance needs or technical issues"
                },
                {
                  title: "Energy Efficient",
                  description: "Eco-friendly operation with low power consumption modes"
                }
              ]
            };
          }
          setContent(data);
        }
      } catch (error) {
        toast.error('Error loading content');
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, 'content', 'technologyPage');
      await setDoc(docRef, content);
      toast.success('Changes saved successfully!');
    } catch (error) {
      toast.error('Error saving changes');
    }
    setIsSaving(false);
  };

  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = content[section].items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setContent(prev => ({ ...prev, [section]: { ...prev[section], items: updated } }));
  };

  const addItem = (section, template) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], items: [...prev[section].items, template] }
    }));
  };

  const removeItem = (section, index) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], items: prev[section].items.filter((_, i) => i !== index) }
    }));
  };

  const addFeature = (section, itemIndex, feature) => {
    const updatedItems = [...content[section].items];
    updatedItems[itemIndex].features = [...updatedItems[itemIndex].features, feature];
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], items: updatedItems }
    }));
  };

  const removeFeature = (section, itemIndex, featureIndex) => {
    const updatedItems = [...content[section].items];
    updatedItems[itemIndex].features = updatedItems[itemIndex].features.filter((_, i) => i !== featureIndex);
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], items: updatedItems }
    }));
  };

  const handleDragEnd = (result) => {
    setIsDragging(false);
    
    if (!result.destination) return;
    
    const { source, destination } = result;
    const section = source.droppableId.split('-')[0]; // Extract section name from droppableId
    
    // For nested features (environments section)
    if (source.droppableId.includes('features')) {
      const itemIndex = parseInt(source.droppableId.split('-')[2]);
      const updatedItems = [...content.environments.items];
      const features = [...updatedItems[itemIndex].features];
      
      const [movedFeature] = features.splice(source.index, 1);
      features.splice(destination.index, 0, movedFeature);
      
      updatedItems[itemIndex].features = features;
      
      setContent(prev => ({
        ...prev,
        environments: { ...prev.environments, items: updatedItems }
      }));
      return;
    }
    
    // For regular sections
    const items = Array.from(content[section].items);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], items }
    }));
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [content]);

  const FiIcon = ({ name, ...props }) => {
    const icons = {
      FiCreditCard: <FiCreditCard {...props} />,
      FiSmartphone: <FiSmartphone {...props} />,
      FiHeart: <FiHeart {...props} />,
      FiSettings: <FiSettings {...props} />,
      FiMonitor: <FiMonitor {...props} />,
      FiPackage: <FiPackage {...props} />,
      // Add other icons as needed
    };
    return icons[name] || <FiCheck {...props} />;
  };

  return (
    <AdminLayout title="Technology Page Editor">
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Floating Save Button */}
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-lg flex items-center gap-2 text-sm font-semibold"
            disabled={isSaving}
          >
            <FiSave className="w-5 h-5" />
            {isSaving ? 'Saving...' : 'Save Changes (Ctrl+S)'}
          </button>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto px-4">
            {['hero', 'payments', 'features', 'environments', 'smartFeatures'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'border-b-2 border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 max-w-5xl mx-auto space-y-8">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Hero Section */}
              {activeTab === 'hero' && (
                <SectionContainer title="Hero Section" icon="FiImage">
                  <div className="space-y-6">
                    <TextField 
                      label="Main Title"
                      value={content.hero.title}
                      onChange={(e) => handleChange('hero', 'title', e.target.value)}
                      preview={<h1 className="text-4xl font-bold dark:text-white">{content.hero.title}</h1>}
                    />
                    <TextField
                      label="Subtitle"
                      value={content.hero.subtitle}
                      onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                      preview={<h2 className="text-2xl text-gray-600 dark:text-gray-300">{content.hero.subtitle}</h2>}
                    />
                    <TextField
                      label="Description"
                      value={content.hero.description}
                      onChange={(e) => handleChange('hero', 'description', e.target.value)}
                      textarea
                      preview={<p className="text-gray-500 dark:text-gray-400">{content.hero.description}</p>}
                    />
                  </div>
                </SectionContainer>
              )}

              {/* Payment Solutions */}
              {activeTab === 'payments' && (
                <SectionContainer title="Payment Methods" icon="FiCreditCard">
                  <div className="space-y-6">
                    <TextField
                      label="Section Title"
                      value={content.payments.title}
                      onChange={(e) => handleChange('payments', 'title', e.target.value)}
                    />
                    <TextField
                      label="Section Subtitle"
                      value={content.payments.subtitle}
                      onChange={(e) => handleChange('payments', 'subtitle', e.target.value)}
                    />
                    
                    <DragDropContext 
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={(result) => handleDragEnd(result, 'payments')}
                    >
                      <Droppable droppableId="payments">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {content.payments.items.map((item, index) => (
                              <Draggable key={index} draggableId={`payment-${index}`} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="mb-4"
                                  >
                                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                          <div 
                                            {...provided.dragHandleProps}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-move flex flex-col"
                                          >
                                            <FiArrowUp className="w-3 h-3" />
                                            <FiArrowDown className="w-3 h-3" />
                                          </div>
                                          <div className="space-y-3 flex-1">
                                            <TextField
                                              label="Title"
                                              value={item.title}
                                              onChange={(e) => handleArrayChange('payments', index, 'title', e.target.value)}
                                            />
                                            <TextField
                                              label="Description"
                                              value={item.text}
                                              onChange={(e) => handleArrayChange('payments', index, 'text', e.target.value)}
                                              textarea
                                            />
                                            <IconPicker
                                              value={item.icon}
                                              onChange={(value) => handleArrayChange('payments', index, 'icon', value)}
                                              options={availableIcons}
                                            />
                                          </div>
                                        </div>
                                        <button
                                          onClick={() => removeItem('payments', index)}
                                          className="text-red-500 hover:text-red-700 mt-1"
                                        >
                                          <FiX className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    <AddItemButton
                      onClick={() => addItem('payments', { icon: 'FiCreditCard', title: 'New Payment', text: '' })}
                      text="Add Payment Method"
                    />
                  </div>
                </SectionContainer>
              )}

              {/* Features Section */}
              {activeTab === 'features' && (
                <SectionContainer title="Inventory Features" icon="FiPackage">
                  <div className="space-y-6">
                    <TextField
                      label="Section Title"
                      value={content.features.title}
                      onChange={(e) => handleChange('features', 'title', e.target.value)}
                    />
                    <TextField
                      label="Description"
                      value={content.features.description}
                      onChange={(e) => handleChange('features', 'description', e.target.value)}
                      textarea
                    />
                    
                    <DragDropContext 
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={(result) => handleDragEnd(result, 'features')}
                    >
                      <Droppable droppableId="features">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {content.features.items.map((item, index) => (
                              <Draggable key={index} draggableId={`feature-${index}`} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="mb-3"
                                  >
                                    <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                      <div 
                                        {...provided.dragHandleProps}
                                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-move flex flex-col"
                                      >
                                        <FiArrowUp className="w-3 h-3" />
                                        <FiArrowDown className="w-3 h-3" />
                                      </div>
                                      <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                          const updated = [...content.features.items];
                                          updated[index] = e.target.value;
                                          setContent(prev => ({ ...prev, features: { ...prev.features, items: updated } }));
                                        }}
                                        className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                      />
                                      <button
                                        onClick={() => removeItem('features', index)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                      >
                                        <FiTrash className="w-5 h-5" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    <AddItemButton
                      onClick={() => addItem('features', 'New Feature')}
                      text="Add Feature"
                    />
                  </div>
                </SectionContainer>
              )}

  {/* Environments Section */}
  {activeTab === 'environments' && (
    <SectionContainer title="Environments" icon="FiMonitor">
      <div className="space-y-6">
        <TextField
          label="Section Title"
          value={content.environments.title}
          onChange={(e) => handleChange('environments', 'title', e.target.value)}
        />
        <TextField
          label="Subtitle"
          value={content.environments.subtitle}
          onChange={(e) => handleChange('environments', 'subtitle', e.target.value)}
        />
        
        <DragDropContext 
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          <Droppable droppableId={getDroppableId('environments')}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {content.environments.items.map((item, index) => (
                  <Draggable 
                    key={`env-${index}`} 
                    draggableId={`environment-${index}`} 
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mb-4"
                      >
                        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3 w-full">
                              <div 
                                {...provided.dragHandleProps}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-move flex flex-col"
                              >
                                <FiArrowUp className="w-3 h-3" />
                                <FiArrowDown className="w-3 h-3" />
                              </div>
                              <div className="space-y-3 flex-1">
                                <TextField
                                  label="Environment Title"
                                  value={item.title}
                                  onChange={(e) => handleArrayChange('environments', index, 'title', e.target.value)}
                                />
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Features</label>
                                  <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId={getDroppableId('environments-features', index)}>
                                      {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                          {item.features.map((feature, fIndex) => (
                                            <Draggable 
                                              key={`feature-${index}-${fIndex}`} 
                                              draggableId={`feature-${index}-${fIndex}`} 
                                              index={fIndex}
                                            >
                                              {(provided) => (
                                                <div
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  className="mb-2"
                                                >
                                                  <div className="flex items-center gap-2">
                                                    <div 
                                                      {...provided.dragHandleProps}
                                                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-move"
                                                    >
                                                      <FiArrowUp className="w-3 h-3" />
                                                      <FiArrowDown className="w-3 h-3" />
                                                    </div>
                                                    <input
                                                      type="text"
                                                      value={feature}
                                                      onChange={(e) => {
                                                        const updated = [...item.features];
                                                        updated[fIndex] = e.target.value;
                                                        handleArrayChange('environments', index, 'features', updated);
                                                      }}
                                                      className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    />
                                                    <button
                                                      onClick={() => removeFeature('environments', index, fIndex)}
                                                      className="text-red-500 hover:text-red-700 p-2"
                                                    >
                                                      <FiTrash className="w-4 h-4" />
                                                    </button>
                                                  </div>
                                                </div>
                                              )}
                                            </Draggable>
                                          ))}
                                          {provided.placeholder}
                                        </div>
                                      )}
                                    </Droppable>
                                  </DragDropContext>
                                  <button
                                    onClick={() => addFeature('environments', index, "New Feature")}
                                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                                  >
                                    <FiPlus className="w-4 h-4" /> Add Feature
                                  </button>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem('environments', index)}
                              className="text-red-500 hover:text-red-700 mt-1"
                            >
                              <FiX className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <AddItemButton
          onClick={() => addItem('environments', { 
            title: 'New Environment', 
            features: ["Feature 1", "Feature 2"] 
          })}
          text="Add Environment"
        />
      </div>
    </SectionContainer>
  )}


              {/* Smart Features Section */}
              {activeTab === 'smartFeatures' && (
                <SectionContainer title="Smart Features" icon="FiSettings">
                  <div className="space-y-6">
                    <TextField
                      label="Section Title"
                      value={content.smartFeatures.title}
                      onChange={(e) => handleChange('smartFeatures', 'title', e.target.value)}
                    />
                    
                    <DragDropContext 
                      onDragStart={() => setIsDragging(true)}
                      onDragEnd={(result) => handleDragEnd(result, 'smartFeatures')}
                    >
                      <Droppable droppableId="smartFeatures">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {content.smartFeatures.items.map((item, index) => (
                              <Draggable key={index} draggableId={`smartFeature-${index}`} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="mb-4"
                                  >
                                    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                                      <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                          <div 
                                            {...provided.dragHandleProps}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-move flex flex-col"
                                          >
                                            <FiArrowUp className="w-3 h-3" />
                                            <FiArrowDown className="w-3 h-3" />
                                          </div>
                                          <div className="space-y-3 flex-1">
                                            <TextField
                                              label="Feature Title"
                                              value={item.title}
                                              onChange={(e) => handleArrayChange('smartFeatures', index, 'title', e.target.value)}
                                            />
                                            <TextField
                                              label="Description"
                                              value={item.description}
                                              onChange={(e) => handleArrayChange('smartFeatures', index, 'description', e.target.value)}
                                              textarea
                                            />
                                          </div>
                                        </div>
                                        <button
                                          onClick={() => removeItem('smartFeatures', index)}
                                          className="text-red-500 hover:text-red-700 mt-1"
                                        >
                                          <FiX className="w-5 h-5" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    <AddItemButton
                      onClick={() => addItem('smartFeatures', { 
                        title: 'New Smart Feature', 
                        description: 'Feature description' 
                      })}
                      text="Add Smart Feature"
                    />
                  </div>
                </SectionContainer>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </AdminLayout>
  );
};

// Reusable Components
const SectionContainer = ({ title, icon, children }) => {
  const FiIcon = ({ name }) => {
    const icons = {
      FiImage: <FiImage className="w-5 h-5 text-primary-600" />,
      FiCreditCard: <FiCreditCard className="w-5 h-5 text-primary-600" />,
      FiPackage: <FiPackage className="w-5 h-5 text-primary-600" />,
      FiMonitor: <FiMonitor className="w-5 h-5 text-primary-600" />,
      FiSettings: <FiSettings className="w-5 h-5 text-primary-600" />,
    };
    return icons[name] || <FiCheck className="w-5 h-5 text-primary-600" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <FiIcon name={icon} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

const TextField = ({ label, value, onChange, textarea = false, preview }) => (
  <div className="space-y-4">
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
    {preview && (
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">Preview:</span>
        {preview}
      </div>
    )}
  </div>
);

const IconPicker = ({ value, onChange, options }) => {
  const FiIcon = ({ name, ...props }) => {
    const icons = {
      FiCreditCard: <FiCreditCard {...props} />,
      FiSmartphone: <FiSmartphone {...props} />,
      FiHeart: <FiHeart {...props} />,
      FiSettings: <FiSettings {...props} />,
      FiMonitor: <FiMonitor {...props} />,
      FiPackage: <FiPackage {...props} />,
      FiWifi: <FiWifi {...props} />,
      FiAlertCircle: <FiAlertCircle {...props} />,
      FiCheck: <FiCheck {...props} />,
      FiSun: <FiSun {...props} />,
      FiMoon: <FiMoon {...props} />,
      FiShoppingCart: <FiShoppingCart {...props} />,
    };
    return icons[name] || <FiCheck {...props} />;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Icon</label>
      <div className="grid grid-cols-6 gap-2">
        {options.map(icon => (
          <button
            key={icon}
            onClick={() => onChange(icon)}
            className={`p-2 rounded-lg border flex items-center justify-center ${
              value === icon 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
            }`}
          >
            <FiIcon name={icon} className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        ))}
      </div>
    </div>
  );
};

const AddItemButton = ({ onClick, text }) => (
  <motion.button
    onClick={onClick}
    className="w-full p-4 border-2 border-dashed border-gray-300 hover:border-primary-500 rounded-xl flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 dark:border-gray-600 dark:hover:border-primary-500"
    whileHover={{ scale: 1.02 }}
  >
    <FiPlus className="w-5 h-5" />
    <span className="font-medium">{text}</span>
  </motion.button>
);

export default TechnologyEdit;