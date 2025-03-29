// // src/pages/HomeEdit.js
// import React, { useState, useEffect } from 'react';
// import { db } from '../firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { FiSave } from 'react-icons/fi';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

// const HomeEdit = () => {
//   const navigate = useNavigate();
//   const [content, setContent] = useState({
//     hero: {
//       title: "Preferred",
//       highlightedTitle: "Vending Solutions",
//       subtitle: "Premium snacks, competitive pricing, and exceptional service",
//       buttonText: "Get Started"
//     },
//     freeVending: {
//       title: "FREE Vending Machines",
//       subtitle: "For Your Business or School",
//       description: "We provide full-service vending solutions at no cost to you, featuring:",
//       features: [
//         "Healthy Options: Nutritionist-curated snack selection",
//         "Smart Technology: Real-time inventory tracking",
//         "24/7 Support: Dedicated maintenance team"
//       ],
//       buttonText: "Claim Your Free Machine"
//     },
//     technology: {
//       title: "Smart Choices Technology",
//       subtitle: "State-of-the-art vending solutions featuring:",
//       features: [
//         { 
//           title: "Premium Snacks", 
//           text: "Curated selection of healthy choices",
//           icon: "FiZap"
//         },
//         { 
//           title: "Smart Inventory", 
//           text: "Real-time stock monitoring system",
//           icon: "FiShoppingCart"
//         },
//         { 
//           title: "Quality Assurance", 
//           text: "Automated product freshness checks",
//           icon: "FiStar"
//         },
//         { 
//           title: "Remote Management", 
//           text: "Cloud-based machine controls",
//           icon: "FiSettings"
//         }
//       ]
//     },
//     footer: {
//       address: "123 Commerce Street, Business City",
//       phone: "+1 (888) 123-4567",
//       email: "contact@PreferredVending.com",
//       copyright: "© 2024 Preferred Vending. All rights reserved."
//     }
//   });

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const docRef = doc(db, 'content', 'homePage');
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setContent(docSnap.data());
//         }
//       } catch (error) {
//         console.error("Error fetching document: ", error);
//         alert('Error loading content');
//       }
//     };
//     fetchContent();
//   }, []);

//   const handleSave = async () => {
//     try {
//       const docRef = doc(db, 'content', 'homePage');
//       await setDoc(docRef, content, { merge: true });
//       alert('Changes saved successfully!');
//       navigate('/');
//     } catch (error) {
//       console.error("Error saving document: ", error);
//       alert('Error saving changes. Check console for details.');
//     }
//   };

//   const handleChange = (section, field, value) => {
//     setContent(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleArrayChange = (section, index, field, value) => {
//     const updatedArray = content[section].features.map((item, i) => 
//       i === index ? { ...item, [field]: value } : item
//     );
//     setContent(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         features: updatedArray
//       }
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
//       <div className="max-w-4xl mx-auto space-y-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Edit Home Page Content
//           </h1>
//           <motion.button
//             onClick={handleSave}
//             className="px-6 py-3 bg-primary-600 text-white rounded-lg flex items-center gap-2"
//             whileHover={{ scale: 1.05 }}
//           >
//             <FiSave /> Save All Changes
//           </motion.button>
//         </div>

//         {/* Hero Section Editor */}
//         <SectionEditor title="Hero Section">
//           <TextField 
//             label="Main Title"
//             value={content.hero?.title || ''}
//             onChange={(e) => handleChange('hero', 'title', e.target.value)}
//           />
//           <TextField 
//             label="Highlighted Title"
//             value={content.hero?.highlightedTitle || ''}
//             onChange={(e) => handleChange('hero', 'highlightedTitle', e.target.value)}
//           />
//           <TextField 
//             label="Subtitle"
//             textarea
//             value={content.hero?.subtitle || ''}
//             onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
//           />
//           <TextField 
//             label="Button Text"
//             value={content.hero?.buttonText || ''}
//             onChange={(e) => handleChange('hero', 'buttonText', e.target.value)}
//           />
//         </SectionEditor>

//         {/* Free Vending Section Editor */}
//         <SectionEditor title="Free Vending Section">
//           <TextField 
//             label="Main Title"
//             value={content.freeVending?.title || ''}
//             onChange={(e) => handleChange('freeVending', 'title', e.target.value)}
//           />
//           <TextField 
//             label="Subtitle"
//             value={content.freeVending?.subtitle || ''}
//             onChange={(e) => handleChange('freeVending', 'subtitle', e.target.value)}
//           />
//           <TextField 
//             label="Description"
//             textarea
//             value={content.freeVending?.description || ''}
//             onChange={(e) => handleChange('freeVending', 'description', e.target.value)}
//           />
          
//           <div className="space-y-4">
//             <h3 className="font-medium text-gray-900 dark:text-white">Features</h3>
//             {content.freeVending?.features?.map((feature, index) => (
//               <TextField
//                 key={index}
//                 label={`Feature ${index + 1}`}
//                 textarea
//                 value={feature}
//                 onChange={(e) => {
//                   const updatedFeatures = [...content.freeVending.features];
//                   updatedFeatures[index] = e.target.value;
//                   handleChange('freeVending', 'features', updatedFeatures);
//                 }}
//               />
//             ))}
//           </div>
//         </SectionEditor>

//         {/* Technology Section Editor */}
//         <SectionEditor title="Technology Features">
//           {content.technology?.features?.map((feature, index) => (
//             <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//               <TextField
//                 label="Feature Title"
//                 value={feature.title}
//                 onChange={(e) => handleArrayChange('technology', index, 'title', e.target.value)}
//               />
//               <TextField
//                 label="Feature Text"
//                 textarea
//                 value={feature.text}
//                 onChange={(e) => handleArrayChange('technology', index, 'text', e.target.value)}
//               />
//               <select
//                 value={feature.icon}
//                 onChange={(e) => handleArrayChange('technology', index, 'icon', e.target.value)}
//                 className="mt-2 p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
//               >
//                 <option value="FiZap">FiZap</option>
//                 <option value="FiShoppingCart">FiShoppingCart</option>
//                 <option value="FiStar">FiStar</option>
//                 <option value="FiSettings">FiSettings</option>
//               </select>
//             </div>
//           ))}
//         </SectionEditor>

//         {/* Footer Editor */}
//         <SectionEditor title="Footer Content">
//           <div className="grid grid-cols-2 gap-4">
//             <TextField 
//               label="Address"
//               value={content.footer?.address || ''}
//               onChange={(e) => handleChange('footer', 'address', e.target.value)}
//             />
//             <TextField 
//               label="Phone"
//               value={content.footer?.phone || ''}
//               onChange={(e) => handleChange('footer', 'phone', e.target.value)}
//             />
//             <TextField 
//               label="Email"
//               value={content.footer?.email || ''}
//               onChange={(e) => handleChange('footer', 'email', e.target.value)}
//             />
//             <TextField 
//               label="Copyright Text"
//               value={content.footer?.copyright || ''}
//               onChange={(e) => handleChange('footer', 'copyright', e.target.value)}
//             />
//           </div>
//         </SectionEditor>
//       </div>
//     </div>
//   );
// };

// const SectionEditor = ({ title, children }) => (
//   <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//     <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
//     <div className="space-y-4">
//       {children}
//     </div>
//   </div>
// );

// const TextField = ({ label, value, onChange, textarea = false }) => (
//   <div className="space-y-2">
//     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
//     {textarea ? (
//       <textarea
//         value={value}
//         onChange={onChange}
//         className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//         rows="3"
//       />
//     ) : (
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//       />
//     )}
//   </div>
// );

// export default HomeEdit;

// src/pages/HomeEdit.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FiSave } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HomeEdit = () => {
  const navigate = useNavigate();
  const storage = getStorage();
  const [content, setContent] = useState({
    hero: {
      title: "Preferred",
      highlightedTitle: "Vending Solutions",
      subtitle: "Premium snacks, competitive pricing, and exceptional service",
      buttonText: "Get Started"
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
      buttonText: "Claim Your Free Machine"
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

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'homePage');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
        alert('Error loading content');
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    try {
      const docRef = doc(db, 'content', 'homePage');
      await setDoc(docRef, content, { merge: true });
      alert('Changes saved successfully!');
      navigate('/');
    } catch (error) {
      console.error("Error saving document: ", error);
      alert('Error saving changes. Check console for details.');
    }
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

  const handleImageUpload = async (file, fieldPath) => {
    if (!file) return;
    
    try {
      const storageRef = ref(storage, `homepage/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setContent(prev => ({
        ...prev,
        [fieldPath]: {
          ...prev[fieldPath],
          imageURL: downloadURL
        }
      }));
      
    } catch (error) {
      console.error("Error uploading image:", error);
      alert('Image upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Home Page Content
          </h1>
          <motion.button
            onClick={handleSave}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <FiSave /> Save All Changes
          </motion.button>
        </div>

        <SectionEditor title="Hero Section">
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
          <TextField 
            label="Button Text"
            value={content.hero?.buttonText || ''}
            onChange={(e) => handleChange('hero', 'buttonText', e.target.value)}
          />
        </SectionEditor>

        <SectionEditor title="Free Vending Section">
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
            <h3 className="font-medium text-gray-900 dark:text-white">Features</h3>
            {content.freeVending?.features?.map((feature, index) => (
              <TextField
                key={index}
                label={`Feature ${index + 1}`}
                textarea
                value={feature}
                onChange={(e) => {
                  const updatedFeatures = [...content.freeVending.features];
                  updatedFeatures[index] = e.target.value;
                  handleChange('freeVending', 'features', updatedFeatures);
                }}
              />
            ))}
          </div>
        </SectionEditor>

        <SectionEditor title="Technology Section">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Technology Image
            </label>
            
            <TextField 
              label="Image URL"
              value={content.technology?.imageURL || ''}
              onChange={(e) => handleChange('technology', 'imageURL', e.target.value)}
            />
            
            <input
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0], 'technology')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-gray-600 dark:file:text-white"
            />
            
            {content.technology?.imageURL && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preview:</p>
                <img 
                  src={content.technology.imageURL} 
                  alt="Technology Preview" 
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <h3 className="font-medium text-gray-900 dark:text-white mt-6">Features</h3>
          {content.technology?.features?.map((feature, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <TextField
                label="Feature Title"
                value={feature.title}
                onChange={(e) => handleArrayChange('technology', index, 'title', e.target.value)}
              />
              <TextField
                label="Feature Text"
                textarea
                value={feature.text}
                onChange={(e) => handleArrayChange('technology', index, 'text', e.target.value)}
              />
              <select
                value={feature.icon}
                onChange={(e) => handleArrayChange('technology', index, 'icon', e.target.value)}
                className="mt-2 p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
              >
                <option value="FiZap">FiZap</option>
                <option value="FiShoppingCart">FiShoppingCart</option>
                <option value="FiStar">FiStar</option>
                <option value="FiSettings">FiSettings</option>
              </select>
            </div>
          ))}
        </SectionEditor>

        <SectionEditor title="Footer Content">
          <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
};

const SectionEditor = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
    <div className="space-y-4">
      {children}
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
        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows="3"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    )}
  </div>
);

export default HomeEdit;