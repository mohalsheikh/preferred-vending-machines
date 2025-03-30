// // SiteSettings.js
// import React, { useState, useEffect } from 'react';
// import { db } from '../firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import {
//   FiSave,
//   FiDroplet,
//   FiType,
//   FiSun,
//   FiChevronDown,
//   FiChevronUp,
// } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const TABS = [
//   { id: 'colors', label: 'Color Scheme', icon: <FiDroplet /> },
//   { id: 'typography', label: 'Typography', icon: <FiType /> },
//   { id: 'shadows', label: 'Shadows', icon: <FiSun /> },
// ];

// // Some example shadow presets
// const SHADOW_PRESETS = {
//   none: 'none',
//   soft: '0 2px 6px rgba(0, 0, 0, 0.1)',
//   medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
//   heavy: '0 8px 24px rgba(0, 0, 0, 0.2)',
// };

// // Some popular font families (you might want to import them in your index.html if they’re not system fonts)
// const FONT_FAMILIES = [
//   'Inter',
//   'Roboto',
//   'Open Sans',
//   'Helvetica Neue',
//   'Georgia',
//   'Times New Roman',
//   'Monospace',
//   'Custom Font',
// ];

// const SiteSettings = () => {
//   const navigate = useNavigate();
//   const [themeConfig, setThemeConfig] = useState({
//     colors: {
//       primary: {
//         500: '#22c55e',
//         600: '#16a34a',
//         700: '#15803d',
//       },
//       secondary: {
//         500: '#3b82f6',
//         600: '#2563eb',
//       },
//       accent: {
//         500: '#8b5cf6',
//       },
//       dark: {
//         800: '#1f2937',
//         900: '#111827',
//       },
//       gray: {
//         50: '#F9FAFB',
//         100: '#F3F4F6',
//         200: '#E5E7EB',
//         300: '#D1D5DB',
//         600: '#4B5563',
//         700: '#374151',
//         800: '#1F2937',
//         900: '#111827',
//       },
//     },
//     typography: {
//       fontFamily: 'Inter',
//       headingSize: '3rem',
//       baseSize: '1rem',
//     },
//     shadows: {
//       button: '0 8px 32px -4px rgba(0, 0, 0, 0.1)',
//       card:
//         '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5)',
//     },
//     animations: {
//       buttonHover: 'scale-105',
//       transitionSpeed: '300ms',
//     },
//   });

//   const [activeTab, setActiveTab] = useState('colors');
//   const [expandedGroup, setExpandedGroup] = useState('');

//   // For easier use in Typography & Shadows
//   const [buttonShadowPreset, setButtonShadowPreset] = useState('custom');
//   const [cardShadowPreset, setCardShadowPreset] = useState('custom');

//   // For the font-family select
//   const [fontFamilySelect, setFontFamilySelect] = useState('Inter');

//   const toggleGroupExpand = (group) => {
//     setExpandedGroup((prev) => (prev === group ? '' : group));
//   };

//   useEffect(() => {
//     const fetchTheme = async () => {
//       try {
//         const docRef = doc(db, 'theme', 'config');
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setThemeConfig(data);
//           applyTheme(data);

//           // If the doc has known shadows, set the default shadow select
//           const { button, card } = data.shadows;
//           const foundButtonKey = Object.entries(SHADOW_PRESETS).find(
//             ([, val]) => val === button
//           );
//           const foundCardKey = Object.entries(SHADOW_PRESETS).find(
//             ([, val]) => val === card
//           );
//           setButtonShadowPreset(foundButtonKey ? foundButtonKey[0] : 'custom');
//           setCardShadowPreset(foundCardKey ? foundCardKey[0] : 'custom');

//           // Font family
//           const foundFamily = FONT_FAMILIES.find(
//             (fam) => fam.toLowerCase() === data.typography.fontFamily.toLowerCase()
//           );
//           setFontFamilySelect(foundFamily || 'Custom Font');
//         }
//       } catch (error) {
//         console.error('Error fetching theme:', error);
//       }
//     };
//     fetchTheme();
//   }, []);

//   // Applies the theme by setting the CSS variables on :root
//   const applyTheme = (config) => {
//     const root = document.documentElement;
//     Object.entries(config.colors).forEach(([group, shades]) => {
//       Object.entries(shades).forEach(([shade, hex]) => {
//         root.style.setProperty(`--${group}-${shade}`, hex);
//       });
//     });
//     root.style.setProperty('--font-family', config.typography.fontFamily);
//     root.style.setProperty('--heading-size', config.typography.headingSize);
//     root.style.setProperty('--base-size', config.typography.baseSize);
//   };

//   const handleSave = async () => {
//     try {
//       const docRef = doc(db, 'theme', 'config');
//       await setDoc(docRef, themeConfig);
//       applyTheme(themeConfig); // apply it immediately in this session
//       alert('Theme saved successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error('Error saving theme:', error);
//       alert('Error saving theme');
//     }
//   };

//   // For any color input
//   const handleColorChange = (group, shade, value) => {
//     setThemeConfig((prev) => ({
//       ...prev,
//       colors: {
//         ...prev.colors,
//         [group]: {
//           ...prev.colors[group],
//           [shade]: value,
//         },
//       },
//     }));
//   };

//   // For typography
//   const handleTypographyChange = (field, value) => {
//     setThemeConfig((prev) => ({
//       ...prev,
//       typography: {
//         ...prev.typography,
//         [field]: value,
//       },
//     }));
//   };

//   // For shadows
//   const handleShadowChange = (type, value) => {
//     setThemeConfig((prev) => ({
//       ...prev,
//       shadows: {
//         ...prev.shadows,
//         [type]: value,
//       },
//     }));
//   };

//   // Handle font family select changes
//   const onFontSelectChange = (e) => {
//     const newVal = e.target.value;
//     setFontFamilySelect(newVal);

//     // If it's "Custom Font", we'll keep the config's existing fontFamily
//     // else we set the config to newVal
//     if (newVal !== 'Custom Font') {
//       handleTypographyChange('fontFamily', newVal);
//     }
//   };

//   // When user types a custom font, automatically select "Custom Font"
//   const onCustomFontChange = (e) => {
//     const newVal = e.target.value;
//     handleTypographyChange('fontFamily', newVal);
//     setFontFamilySelect('Custom Font');
//   };

//   // Handle shadow preset changes
//   const onShadowPresetChange = (target, preset) => {
//     if (preset === 'custom') {
//       // do nothing special here; user can fill custom text
//     } else {
//       // set the theme's shadow for that target
//       handleShadowChange(target, SHADOW_PRESETS[preset]);
//     }

//     if (target === 'button') setButtonShadowPreset(preset);
//     if (target === 'card') setCardShadowPreset(preset);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Sticky Header with Title & Save */}
//       <div className="sticky top-0 bg-gray-50 dark:bg-gray-900 shadow-sm z-10 p-4 flex justify-between items-center">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
//           Theme Settings
//         </h1>
//         <motion.button
//           onClick={handleSave}
//           className="px-6 py-3 bg-primary-500 text-white rounded-lg flex items-center gap-2 shadow-md"
//           whileHover={{ scale: 1.05 }}
//         >
//           <FiSave /> Save
//         </motion.button>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto p-4 md:p-8">
//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 dark:border-gray-800 mb-8">
//           {TABS.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex items-center px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium focus:outline-none transition-colors ${
//                 activeTab === tab.id
//                   ? 'text-primary-600 border-b-2 border-primary-600'
//                   : 'text-gray-600 dark:text-gray-300'
//               }`}
//             >
//               <span className="mr-2">{tab.icon}</span>
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <AnimatePresence mode="wait">
//           {/* COLORS TAB */}
//           {activeTab === 'colors' && (
//             <motion.div
//               key="colors-tab"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-8"
//             >
//               {/* Color Groups */}
//               {Object.entries(themeConfig.colors).map(([group, shades]) => (
//                 <div
//                   key={group}
//                   className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
//                 >
//                   <button
//                     className="w-full flex justify-between items-center text-left"
//                     onClick={() => toggleGroupExpand(group)}
//                   >
//                     <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
//                       {group} Colors
//                     </h3>
//                     {expandedGroup === group ? <FiChevronUp /> : <FiChevronDown />}
//                   </button>
//                   <AnimatePresence>
//                     {expandedGroup === group && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: 'auto', opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="overflow-hidden"
//                       >
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//                           {Object.entries(shades).map(([shade, value]) => (
//                             <ColorInput
//                               key={`${group}-${shade}`}
//                               label={`${group}-${shade}`}
//                               value={value}
//                               onChange={(val) => handleColorChange(group, shade, val)}
//                             />
//                           ))}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ))}

//               {/* Color Preview */}
//               <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
//                   Live Color Preview
//                 </h4>
//                 <div className="flex flex-wrap gap-4">
//                   {Object.entries(themeConfig.colors).map(([group, shades]) => (
//                     <div key={group} className="flex flex-col items-center">
//                       <div
//                         className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700"
//                         style={{ backgroundColor: shades['500'] }}
//                       />
//                       <span className="mt-1 text-sm text-gray-700 dark:text-gray-300 capitalize">
//                         {group}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* TYPOGRAPHY TAB */}
//           {activeTab === 'typography' && (
//             <motion.div
//               key="typography-tab"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-8"
//             >
//               {/* Font & Sizes Editor */}
//               <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-4">
//                 {/* Font Family */}
//                 <div className="flex flex-col space-y-2">
//                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Font Family
//                   </label>
//                   <select
//                     className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                     value={fontFamilySelect}
//                     onChange={onFontSelectChange}
//                   >
//                     {FONT_FAMILIES.map((fam) => (
//                       <option key={fam} value={fam}>
//                         {fam}
//                       </option>
//                     ))}
//                   </select>
//                   {fontFamilySelect === 'Custom Font' && (
//                     <input
//                       type="text"
//                       className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                       placeholder="Enter custom font name (e.g. 'Lobster')"
//                       value={themeConfig.typography.fontFamily}
//                       onChange={onCustomFontChange}
//                     />
//                   )}
//                 </div>

//                 {/* Heading Size with a slider */}
//                 <div className="flex flex-col space-y-2">
//                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Heading Size: {themeConfig.typography.headingSize}
//                   </label>
//                   <input
//                     type="range"
//                     min={1.5}
//                     max={5}
//                     step={0.1}
//                     value={parseFloat(
//                       themeConfig.typography.headingSize.replace('rem', '')
//                     )}
//                     onChange={(e) => {
//                       const val = `${e.target.value}rem`;
//                       handleTypographyChange('headingSize', val);
//                     }}
//                     className="cursor-pointer"
//                   />
//                 </div>

//                 {/* Base Font Size slider */}
//                 <div className="flex flex-col space-y-2">
//                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Base Font Size: {themeConfig.typography.baseSize}
//                   </label>
//                   <input
//                     type="range"
//                     min={0.75}
//                     max={2}
//                     step={0.05}
//                     value={parseFloat(themeConfig.typography.baseSize.replace('rem', ''))}
//                     onChange={(e) => {
//                       const val = `${e.target.value}rem`;
//                       handleTypographyChange('baseSize', val);
//                     }}
//                     className="cursor-pointer"
//                   />
//                 </div>
//               </div>

//               {/* Typography Preview */}
//               <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//                 <h4
//                   className="font-bold mb-2"
//                   style={{
//                     fontSize: themeConfig.typography.headingSize,
//                     fontFamily: themeConfig.typography.fontFamily,
//                   }}
//                 >
//                   Heading Preview
//                 </h4>
//                 <p
//                   style={{
//                     fontSize: themeConfig.typography.baseSize,
//                     fontFamily: themeConfig.typography.fontFamily,
//                   }}
//                 >
//                   This is a paragraph preview showing your base font settings. The quick
//                   brown fox jumps over the lazy dog.
//                 </p>
//               </div>
//             </motion.div>
//           )}

//           {/* SHADOWS TAB */}
//           {activeTab === 'shadows' && (
//             <motion.div
//               key="shadows-tab"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-8"
//             >
//               {/* Button Shadow */}
//               <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-4">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Button Shadow
//                 </label>
//                 <select
//                   className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   value={buttonShadowPreset}
//                   onChange={(e) => onShadowPresetChange('button', e.target.value)}
//                 >
//                   <option value="none">None</option>
//                   <option value="soft">Soft</option>
//                   <option value="medium">Medium</option>
//                   <option value="heavy">Heavy</option>
//                   <option value="custom">Custom</option>
//                 </select>

//                 {/* Only show textarea if user picks "custom" */}
//                 {buttonShadowPreset === 'custom' && (
//                   <textarea
//                     rows="3"
//                     className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                     value={themeConfig.shadows.button}
//                     onChange={(e) => handleShadowChange('button', e.target.value)}
//                   />
//                 )}

//                 <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <button
//                     className="px-6 py-3 bg-primary-500 text-white rounded-lg"
//                     style={{ boxShadow: themeConfig.shadows.button }}
//                   >
//                     Button Preview
//                   </button>
//                 </div>
//               </div>

//               {/* Card Shadow */}
//               <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-4">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Card Shadow
//                 </label>
//                 <select
//                   className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   value={cardShadowPreset}
//                   onChange={(e) => onShadowPresetChange('card', e.target.value)}
//                 >
//                   <option value="none">None</option>
//                   <option value="soft">Soft</option>
//                   <option value="medium">Medium</option>
//                   <option value="heavy">Heavy</option>
//                   <option value="custom">Custom</option>
//                 </select>

//                 {/* Only show textarea if user picks "custom" */}
//                 {cardShadowPreset === 'custom' && (
//                   <textarea
//                     rows="3"
//                     className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                     value={themeConfig.shadows.card}
//                     onChange={(e) => handleShadowChange('card', e.target.value)}
//                   />
//                 )}

//                 <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                   <div
//                     className="p-4 bg-white dark:bg-gray-800 rounded-lg"
//                     style={{ boxShadow: themeConfig.shadows.card }}
//                   >
//                     Card Preview
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// /* ---------- Reusable Components ---------- */

// // Reusable color input
// const ColorInput = ({ label, value, onChange }) => (
//   <div className="space-y-1">
//     <div className="flex items-center gap-3">
//       <input
//         type="color"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600"
//       />
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//       />
//     </div>
//     <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
//   </div>
// );

// export default SiteSettings;

// SiteSettings.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FiSave, FiDroplet, FiType, FiSun, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { id: 'colors', label: 'Color Scheme', icon: <FiDroplet /> },
  { id: 'typography', label: 'Typography', icon: <FiType /> },
  { id: 'shadows', label: 'Shadows', icon: <FiSun /> },
];

const SiteSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('colors');
  const [expandedGroup, setExpandedGroup] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [themeConfig, setThemeConfig] = useState({
    colors: {
      primary: { 500: '#22c55e', 600: '#16a34a', 700: '#15803d' },
      secondary: { 500: '#3b82f6', 600: '#2563eb' },
      accent: { 500: '#8b5cf6' },
      dark: { 800: '#1f2937', 900: '#111827' },
      gray: {
        50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB',
        600: '#4B5563', 700: '#374151', 800: '#1F2937', 900: '#111827'
      },
    },
    typography: {
      fontFamily: 'Inter',
      headingSize: '3rem',
      baseSize: '1rem',
    },
    shadows: {
      button: '0 8px 32px -4px rgba(0, 0, 0, 0.1)',
      card: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.5)'
    },
    animations: {
      buttonHover: 'scale-105',
      transitionSpeed: '300ms',
    },
  });

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const docRef = doc(db, 'theme', 'config');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setThemeConfig(docSnap.data());
          applyTheme(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };
    fetchTheme();
  }, []);

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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const docRef = doc(db, 'theme', 'config');
      await setDoc(docRef, themeConfig);
      applyTheme(themeConfig);
      alert('Theme saved successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving theme:', error);
      alert('Error saving theme');
    }
    setIsSaving(false);
  };

  const handleColorChange = (group, shade, value) => {
    setThemeConfig(prev => ({
      ...prev,
      colors: { ...prev.colors, [group]: { ...prev.colors[group], [shade]: value } }
    }));
  };

  const handleTypographyChange = (field, value) => {
    setThemeConfig(prev => ({
      ...prev,
      typography: { ...prev.typography, [field]: value }
    }));
  };

  const handleShadowChange = (type, value) => {
    setThemeConfig(prev => ({
      ...prev,
      shadows: { ...prev.shadows, [type]: value }
    }));
  };

  const toggleGroupExpand = (group) => {
    setExpandedGroup(expandedGroup === group ? '' : group);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 bg-gray-50 dark:bg-gray-900 shadow-sm z-10 p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Theme Settings
        </h1>
        <motion.button
          onClick={handleSave}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg flex items-center gap-2 shadow-md"
          whileHover={{ scale: 1.05 }}
          disabled={isSaving}
        >
          <FiSave /> {isSaving ? 'Saving...' : 'Save'}
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
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
          {activeTab === 'colors' && (
            <motion.div
              key="colors-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {Object.entries(themeConfig.colors).map(([group, shades]) => (
                <div key={group} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
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
            </motion.div>
          )}

          {activeTab === 'typography' && (
            <motion.div
              key="typography-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <FontSelector
                      value={themeConfig.typography.fontFamily}
                      onChange={(val) => handleTypographyChange('fontFamily', val)}
                    />
                    <SizeSlider
                      label="Heading Size"
                      value={themeConfig.typography.headingSize}
                      onChange={(val) => handleTypographyChange('headingSize', val)}
                      min="1"
                      max="4"
                      step="0.1"
                    />
                    <SizeSlider
                      label="Base Size"
                      value={themeConfig.typography.baseSize}
                      onChange={(val) => handleTypographyChange('baseSize', val)}
                      min="0.8"
                      max="1.5"
                      step="0.05"
                    />
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h1 className="font-bold mb-4" style={{
                      fontSize: themeConfig.typography.headingSize,
                      fontFamily: themeConfig.typography.fontFamily
                    }}>
                      Heading Example
                    </h1>
                    <p className="mb-4" style={{
                      fontSize: themeConfig.typography.baseSize,
                      fontFamily: themeConfig.typography.fontFamily
                    }}>
                      This is a paragraph example showing your current settings.
                    </p>
                    <button 
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg"
                      style={{ fontSize: themeConfig.typography.baseSize }}
                    >
                      Example Button
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'shadows' && (
            <motion.div
              key="shadows-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Button Shadow</h3>
                      <ShadowEditor
                        value={themeConfig.shadows.button}
                        onChange={(val) => handleShadowChange('button', val)}
                      />
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <button
                          className="px-6 py-3 bg-primary-500 text-white rounded-lg w-full"
                          style={{ boxShadow: themeConfig.shadows.button }}
                        >
                          Button Preview
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Card Shadow</h3>
                      <ShadowEditor
                        value={themeConfig.shadows.card}
                        onChange={(val) => handleShadowChange('card', val)}
                      />
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div
                          className="p-6 bg-white dark:bg-gray-800 rounded-lg"
                          style={{ boxShadow: themeConfig.shadows.card }}
                        >
                          Card Content Preview
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">Shadow Presets</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          ['0 1px 3px rgba(0,0,0,0.12)', 'Small'],
                          ['0 4px 6px rgba(0,0,0,0.1)', 'Medium'],
                          ['0 10px 15px rgba(0,0,0,0.1)', 'Large'],
                          ['0 20px 25px rgba(0,0,0,0.1)', 'X-Large']
                        ].map(([shadow, label]) => (
                          <button
                            key={shadow}
                            onClick={() => handleShadowChange('button', shadow)}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            style={{ boxShadow: shadow }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Component: ColorInput
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

// Component: FontSelector
const FontSelector = ({ value, onChange }) => {
  const fonts = ['Inter', 'Roboto', 'Open Sans', 'Poppins', 'Montserrat', 'System UI'];
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Font Family
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        {fonts.map((font) => (
          <option key={font} value={font}>{font}</option>
        ))}
      </select>
    </div>
  );
};

// Component: SizeSlider
const SizeSlider = ({ label, value, onChange, min, max, step }) => {
  const numericValue = parseFloat(value);
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={numericValue}
          onChange={(e) => onChange(`${e.target.value}rem`)}
          className="flex-1"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
    </div>
  );
};

// Component: ShadowEditor
const ShadowEditor = ({ value, onChange }) => {
  const parseShadow = (shadow) => {
    const parts = shadow.match(/(-?\d+px)|(rgba?\([^)]+\))/g) || [];
    return {
      h: parts[0] || '0px',
      v: parts[1] || '0px',
      blur: parts[2] || '0px',
      spread: parts[3] || '0px',
      color: parts[4] || 'rgba(0,0,0,0.1)'
    };
  };

  const [shadow, setShadow] = useState(parseShadow(value));

  const updateShadow = (field, val) => {
    const newShadow = { ...shadow, [field]: val };
    setShadow(newShadow);
    onChange(`${newShadow.h} ${newShadow.v} ${newShadow.blur} ${newShadow.spread} ${newShadow.color}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Horizontal</label>
          <input
            type="text"
            value={shadow.h}
            onChange={(e) => updateShadow('h', e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Vertical</label>
          <input
            type="text"
            value={shadow.v}
            onChange={(e) => updateShadow('v', e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Blur</label>
          <input
            type="text"
            value={shadow.blur}
            onChange={(e) => updateShadow('blur', e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Spread</label>
          <input
            type="text"
            value={shadow.spread}
            onChange={(e) => updateShadow('spread', e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Color</label>
          <input
            type="color"
            value={shadow.color}
            onChange={(e) => updateShadow('color', e.target.value)}
            className="w-full h-10 rounded-md cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;