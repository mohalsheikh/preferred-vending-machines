// SiteSettings.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Footer from './Footer';
import {
  FiSave,
  FiDroplet,
  FiType,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Tabs
const TABS = [
  { id: 'colors', label: 'Color Scheme', icon: <FiDroplet /> },
  { id: 'typography', label: 'Typography', icon: <FiType /> },
];

// Popular font families
const FONT_FAMILIES = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Helvetica Neue',
  'Georgia',
  'Times New Roman',
  'Monospace',
  'Custom Font',
];

// 1) Define your default theme config as a constant
const DEFAULT_THEME = {
  colors: {
    primary: {
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    },
    secondary: {
      500: '#3b82f6',
      600: '#2563eb',
    },
    accent: {
      500: '#8b5cf6',
    },
    dark: {
      800: '#1f2937',
      900: '#111827',
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: 'Inter',
    headingSize: '3rem',
    baseSize: '1rem',
  },
  animations: {
    buttonHover: 'scale-105',
    transitionSpeed: '300ms',
  },
};

const SiteSettings = () => {
  const navigate = useNavigate();

  // 2) Initialize themeConfig with the default theme
  const [themeConfig, setThemeConfig] = useState(DEFAULT_THEME);

  const [activeTab, setActiveTab] = useState('colors');
  const [expandedGroup, setExpandedGroup] = useState('');
  const [fontFamilySelect, setFontFamilySelect] = useState('Inter');

  const toggleGroupExpand = (group) => {
    setExpandedGroup((prev) => (prev === group ? '' : group));
  };

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const docRef = doc(db, 'theme', 'config');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setThemeConfig(data);
          applyTheme(data);

          // Update fontFamily dropdown
          const foundFamily = FONT_FAMILIES.find(
            (fam) => fam.toLowerCase() === data.typography.fontFamily.toLowerCase()
          );
          setFontFamilySelect(foundFamily || 'Custom Font');
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };
    fetchTheme();
  }, []);

  // Applies the theme by setting the CSS variables on :root
  const applyTheme = (config) => {
    const root = document.documentElement;
    Object.entries(config.colors).forEach(([group, shades]) => {
      Object.entries(shades).forEach(([shade, hex]) => {
        root.style.setProperty(`--${group}-${shade}`, hex);
      });
    });
    root.style.setProperty('--font-family', config.typography.fontFamily);
    root.style.setProperty('--heading-size', config.typography.headingSize);
    root.style.setProperty('--base-size', config.typography.baseSize);
  };

  // 3) Reset to default theme
  const handleReset = () => {
    setThemeConfig(DEFAULT_THEME);
    applyTheme(DEFAULT_THEME);
    alert('Theme has been reset to defaults (not saved yet).');
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'theme', 'config');
      await setDoc(docRef, themeConfig);
      applyTheme(themeConfig); // so changes take effect immediately
      alert('Theme saved successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving theme:', error);
      alert('Error saving theme');
    }
  };

  // For any color input
  const handleColorChange = (group, shade, value) => {
    setThemeConfig((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [group]: {
          ...prev.colors[group],
          [shade]: value,
        },
      },
    }));
  };

  // For typography
  const handleTypographyChange = (field, value) => {
    setThemeConfig((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [field]: value,
      },
    }));
  };

  // Handle font family select
  const onFontSelectChange = (e) => {
    const newVal = e.target.value;
    setFontFamilySelect(newVal);

    if (newVal !== 'Custom Font') {
      handleTypographyChange('fontFamily', newVal);
    }
  };

  // When user types a custom font
  const onCustomFontChange = (e) => {
    const newVal = e.target.value;
    handleTypographyChange('fontFamily', newVal);
    setFontFamilySelect('Custom Font');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sticky Header with Title & Buttons */}
      <div className="sticky top-0 bg-gray-50 dark:bg-gray-900 shadow-sm z-10 p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Theme Settings
        </h1>
        <div className="flex items-center gap-4">
          {/* Reset Button */}
          <motion.button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            Reset to Default
          </motion.button>

          {/* Save Button */}
          <motion.button
            onClick={handleSave}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg flex items-center gap-2 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <FiSave /> Save
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium focus:outline-none transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* COLORS TAB */}
          {activeTab === 'colors' && (
            <motion.div
              key="colors-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Color Groups */}
              {Object.entries(themeConfig.colors).map(([group, shades]) => (
                <div
                  key={group}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
                >
                  <button
                    className="w-full flex justify-between items-center text-left"
                    onClick={() => toggleGroupExpand(group)}
                  >
                    <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
                      {group} Colors
                    </h3>
                    {expandedGroup === group ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {expandedGroup === group && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                          {Object.entries(shades).map(([shade, value]) => (
                            <ColorInput
                              key={`${group}-${shade}`}
                              label={`${group}-${shade}`}
                              value={value}
                              onChange={(val) => handleColorChange(group, shade, val)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Color Preview */}
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Live Color Preview
                </h4>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(themeConfig.colors).map(([group, shades]) => (
                    <div key={group} className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: shades['500'] }}
                      />
                      <span className="mt-1 text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {group}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TYPOGRAPHY TAB */}
          {activeTab === 'typography' && (
            <motion.div
              key="typography-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-4">
                {/* Font Family */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Font Family
                  </label>
                  <select
                    className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={fontFamilySelect}
                    onChange={onFontSelectChange}
                  >
                    {FONT_FAMILIES.map((fam) => (
                      <option key={fam} value={fam}>
                        {fam}
                      </option>
                    ))}
                  </select>
                  {fontFamilySelect === 'Custom Font' && (
                    <input
                      type="text"
                      className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter custom font name (e.g. 'Lobster')"
                      value={themeConfig.typography.fontFamily}
                      onChange={onCustomFontChange}
                    />
                  )}
                </div>

                {/* Heading Size Slider */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Heading Size: {themeConfig.typography.headingSize}
                  </label>
                  <input
                    type="range"
                    min={1.5}
                    max={5}
                    step={0.1}
                    value={parseFloat(
                      themeConfig.typography.headingSize.replace('rem', '')
                    )}
                    onChange={(e) => {
                      const val = `${e.target.value}rem`;
                      handleTypographyChange('headingSize', val);
                    }}
                    className="cursor-pointer"
                  />
                </div>

                {/* Base Font Size Slider */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Base Font Size: {themeConfig.typography.baseSize}
                  </label>
                  <input
                    type="range"
                    min={0.75}
                    max={2}
                    step={0.05}
                    value={parseFloat(themeConfig.typography.baseSize.replace('rem', ''))}
                    onChange={(e) => {
                      const val = `${e.target.value}rem`;
                      handleTypographyChange('baseSize', val);
                    }}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                <h4
                  className="font-bold mb-2"
                  style={{
                    fontSize: themeConfig.typography.headingSize,
                    fontFamily: themeConfig.typography.fontFamily,
                  }}
                >
                  Heading Preview
                </h4>
                <p
                  style={{
                    fontSize: themeConfig.typography.baseSize,
                    fontFamily: themeConfig.typography.fontFamily,
                  }}
                >
                  This is a paragraph preview showing your base font settings. The quick
                  brown fox jumps over the lazy dog.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Reusable color input for color groups
const ColorInput = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
    <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
  </div>
);

export default SiteSettings;
