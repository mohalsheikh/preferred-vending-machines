// // src/pages/AdminSolutionsPage.js
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Helmet } from 'react-helmet-async';
// import { db } from '../../firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { FiSave, FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
// import AdminLayout from './layout/AdminLayout';


// const defaultContent = {
//   hero: {
//     title: "Tailored Vending Solutions",
//     subtitle: "Built for Reliability",
//     description: `"We deliver customized vending solutions that keep your operations running smoothly"`
//   },
//   serviceReliability: {
//     title: "Service You Can Depend On",
//     description: `“We follow consumer trends and employ your feedback, ensuring your machines are always filled with preferred options. Our service includes:”`,
//     listItems: [
//       "Routine maintenance & deep cleaning",
//       "Quick and efficient restocking",
//       "Product assortment optimization",
//       "24/7 remote monitoring"
//     ]
//   },
//   serviceCommitment: {
//     title: "Our Service Commitment",
//     services: [
//       {
//         icon: "FiTool",
//         title: "Proactive Maintenance",
//         text: "Regular servicing and immediate response to technical issues"
//       },
//       {
//         icon: "FiMonitor",
//         title: "Smart Inventory Management",
//         text: "Real-time stock monitoring prevents empty machines"
//       },
//       {
//         icon: "FiSmile",
//         title: "Customer-Driven Selection",
//         text: "Regular product rotation based on user preferences"
//       }
//     ]
//   },
//   coverageAreas: [
//     "Solano County",
//     "Yolo County",
//     "Sacramento County"
//   ],
//   whyChooseUs: [
//     {
//       title: 'Customized Menus',
//       text: 'Tailored product selections matching your audience preferences'
//     },
//     {
//       title: 'Routine Maintenance',
//       text: 'Full-service cleaning & maintenance program included'
//     },
//     {
//       title: 'Smart Technology',
//       text: 'Remote monitoring & advanced payment systems'
//     },
//     {
//       title: 'Local Expertise',
//       text: 'Personal service with community understanding'
//     }
//   ],
//   pricing: {
//     title: "Transparent Pricing",
//     description: "“No hidden fees - our solutions include:”",
//     listItems: [
//       "ADA-compliant machines at no extra cost",
//       "Credit/debit processing fees included",
//       "Free maintenance & technical support",
//       "No long-term contracts"
//     ]
//   },
//   serviceCommitment: {
//     title: "Our Service Commitment",
//     services: [
//       {
//         icon: "FiTool",
//         title: "Proactive Maintenance",
//         text: "Regular servicing and immediate response to technical issues"
//       },
//       {
//         icon: "FiMonitor",
//         title: "Smart Inventory Management",
//         text: "Real-time stock monitoring prevents empty machines"
//       },
//       {
//         icon: "FiSmile",
//         title: "Customer-Driven Selection",
//         text: "Regular product rotation based on user preferences"
//       }
//     ]
//   },
// };

// function AdminSolutionsPage() {
//   const [content, setContent] = useState(defaultContent);
//   const [loading, setLoading] = useState(true);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const docRef = doc(db, 'content', 'solutions');
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setContent(docSnap.data());
//         }
//       } catch (error) {
//         console.error("Error fetching content:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContent();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = doc(db, 'content', 'solutions');
//       await setDoc(docRef, content, { merge: true }); // This creates or updates the document
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
//     } catch (error) {
//       console.error("Error updating content:", error);
//     }
//   };  

//   const handleReset = () => {
//     if (window.confirm("Reset to default content?")) {
//       setContent(defaultContent);
//     }
//   };

//   if (loading) return <div className="p-8 text-center">Loading...</div>;

//   return (
//     <AdminLayout title="Solutions Page Editor">
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
//       <Helmet>
//         <title>Manage Solutions Content</title>
//       </Helmet>

//       <motion.form 
//         onSubmit={handleSubmit}
//         className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
//       >
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold dark:text-white">Manage Solutions Content</h1>
//           <div className="flex gap-4">
//             <button
//               type="button"
//               onClick={handleReset}
//               className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
//             >
//               Reset Defaults
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
//             >
//               <FiSave /> Save Changes
//             </button>
//           </div>
//         </div>

//         {success && (
//           <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
//             Content saved successfully!
//           </div>
//         )}

//         {/* Hero Section */}
//         <Section title="Hero Section">
//           <Input
//             label="Title"
//             value={content.hero.title}
//             onChange={e => setContent({ ...content, hero: { ...content.hero, title: e.target.value }})}
//           />
//           <Input
//             label="Subtitle"
//             value={content.hero.subtitle}
//             onChange={e => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value }})}
//           />
//           <TextArea
//             label="Description"
//             value={content.hero.description}
//             onChange={e => setContent({ ...content, hero: { ...content.hero, description: e.target.value }})}
//           />
//         </Section>

//         {/* Service Reliability */}
//         <Section title="Service Reliability">
//           <Input
//             label="Title"
//             value={content.serviceReliability.title}
//             onChange={e => setContent({ ...content, serviceReliability: { ...content.serviceReliability, title: e.target.value }})}
//           />
//           <TextArea
//             label="Description"
//             value={content.serviceReliability.description}
//             onChange={e => setContent({ ...content, serviceReliability: { ...content.serviceReliability, description: e.target.value }})}
//           />
//           <ListEditor
//             items={content.serviceReliability.listItems}
//             onChange={newItems => setContent({ ...content, serviceReliability: { ...content.serviceReliability, listItems: newItems }})}
//             label="List Items"
//           />
//         </Section>

//         {/* Coverage Areas */}
//         <Section title="Coverage Areas">
//           <ListEditor
//             items={content.coverageAreas}
//             onChange={newItems => setContent({ ...content, coverageAreas: newItems })}
//             label="Counties"
//           />
//         </Section>

//         {/* Why Choose Us */}
//         <Section title="Why Choose Us">
//           <div className="space-y-6">
//             {content.whyChooseUs.map((item, index) => (
//               <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="font-medium dark:text-white">Feature {index + 1}</h3>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const newFeatures = content.whyChooseUs.filter((_, i) => i !== index);
//                       setContent({ ...content, whyChooseUs: newFeatures });
//                     }}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <FiTrash />
//                   </button>
//                 </div>
//                 <Input
//                   label="Title"
//                   value={item.title}
//                   onChange={e => {
//                     const newFeatures = [...content.whyChooseUs];
//                     newFeatures[index].title = e.target.value;
//                     setContent({ ...content, whyChooseUs: newFeatures });
//                   }}
//                 />
//                 <TextArea
//                   label="Description"
//                   value={item.text}
//                   onChange={e => {
//                     const newFeatures = [...content.whyChooseUs];
//                     newFeatures[index].text = e.target.value;
//                     setContent({ ...content, whyChooseUs: newFeatures });
//                   }}
//                 />
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => setContent({ ...content, whyChooseUs: [...content.whyChooseUs, { title: '', text: '' }]})}
//               className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
//             >
//               <FiPlus /> Add Feature
//             </button>
//           </div>
//         </Section>

//         // In the AdminSolutionsPage component, add this section:
// <Section title="Service Commitment">
//   <Input
//     label="Section Title"
//     value={content.serviceCommitment.title}
//     onChange={e => setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, title: e.target.value }})}
//   />
//   <div className="space-y-6">
//     {content.serviceCommitment.services.map((service, index) => (
//       <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-medium dark:text-white">Service {index + 1}</h3>
//           <button
//             type="button"
//             onClick={() => {
//               const newServices = content.serviceCommitment.services.filter((_, i) => i !== index);
//               setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
//             }}
//             className="text-red-500 hover:text-red-700"
//           >
//             <FiTrash />
//           </button>
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Icon</label>
//             <select
//               value={service.icon}
//               onChange={e => {
//                 const newServices = [...content.serviceCommitment.services];
//                 newServices[index].icon = e.target.value;
//                 setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
//               }}
//               className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
//             >
//               {['FiTool', 'FiMonitor', 'FiSmile', 'FiCalendar', 'FiShoppingCart', 'FiThumbsUp'].map(icon => (
//                 <option key={icon} value={icon}>{icon}</option>
//               ))}
//             </select>
//           </div>
//           <Input
//             label="Title"
//             value={service.title}
//             onChange={e => {
//               const newServices = [...content.serviceCommitment.services];
//               newServices[index].title = e.target.value;
//               setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
//             }}
//           />
//         </div>
//         <TextArea
//           label="Description"
//           value={service.text}
//           onChange={e => {
//             const newServices = [...content.serviceCommitment.services];
//             newServices[index].text = e.target.value;
//             setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
//           }}
//         />
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={() => setContent({ ...content, serviceCommitment: { 
//         ...content.serviceCommitment, 
//         services: [...content.serviceCommitment.services, { icon: 'FiTool', title: '', text: '' }]
//       }})}
//       className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
//     >
//       <FiPlus /> Add Service Item
//     </button>
//   </div>
// </Section>

//         {/* Pricing Section */}
//         <Section title="Pricing Section">
//           <Input
//             label="Title"
//             value={content.pricing.title}
//             onChange={e => setContent({ ...content, pricing: { ...content.pricing, title: e.target.value }})}
//           />
//           <TextArea
//             label="Description"
//             value={content.pricing.description}
//             onChange={e => setContent({ ...content, pricing: { ...content.pricing, description: e.target.value }})}
//           />
//           <ListEditor
//             items={content.pricing.listItems}
//             onChange={newItems => setContent({ ...content, pricing: { ...content.pricing, listItems: newItems }})}
//             label="List Items"
//           />
//         </Section>
//       </motion.form>
//     </div>
//     </AdminLayout>
//   );
// }

// const Section = ({ title, children }) => (
//   <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
//     <h2 className="text-xl font-semibold mb-4 dark:text-white">{title}</h2>
//     <div className="space-y-4">{children}</div>
//   </div>
// );

// const Input = ({ label, value, onChange }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1 dark:text-gray-300">{label}</label>
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//       className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
//     />
//   </div>
// );

// const TextArea = ({ label, value, onChange }) => (
//   <div>
//     <label className="block text-sm font-medium mb-1 dark:text-gray-300">{label}</label>
//     <textarea
//       value={value}
//       onChange={onChange}
//       rows="3"
//       className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
//     />
//   </div>
// );

// const ListEditor = ({ items, onChange, label }) => (
//   <div>
//     <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
//     <div className="space-y-2">
//       {items.map((item, index) => (
//         <div key={index} className="flex gap-2">
//           <input
//             type="text"
//             value={item}
//             onChange={e => {
//               const newItems = [...items];
//               newItems[index] = e.target.value;
//               onChange(newItems);
//             }}
//             className="flex-1 p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
//           />
//           <button
//             type="button"
//             onClick={() => onChange(items.filter((_, i) => i !== index))}
//             className="p-2 text-red-500 hover:text-red-700"
//           >
//             <FiTrash />
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() => onChange([...items, ""])}
//         className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
//       >
//         <FiPlus /> Add Item
//       </button>
//     </div>
//   </div>
// );

// export default AdminSolutionsPage;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FiSave, FiEdit, FiPlus, FiTrash } from 'react-icons/fi';
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

function AdminSolutionsPage() {
  const [content, setContent] = useState({ ...defaultContent });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'content', 'solutions');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Merge with defaults to ensure all fields exist
          setContent({
            ...defaultContent,
            ...docSnap.data()
          });
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'content', 'solutions');
      await updateDoc(docRef, content);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <AdminLayout title="Home Page Editor">
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <Helmet>
        <title>Manage Solutions Content</title>
      </Helmet>

      <motion.form 
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        {/* Header and buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white">Manage Solutions Content</h1>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setContent({ ...defaultContent })}
              className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              Reset Defaults
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <FiSave /> Save Changes
            </button>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
            Content saved successfully!
          </div>
        )}

        {/* Hero Section */}
        <Section title="Hero Section">
          <Input
            label="Title"
            value={content.hero?.title || ''}
            onChange={e => setContent({ ...content, hero: { ...content.hero, title: e.target.value }})}
          />
          <Input
            label="Subtitle"
            value={content.hero?.subtitle || ''}
            onChange={e => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value }})}
          />
          <TextArea
            label="Description"
            value={content.hero?.description || ''}
            onChange={e => setContent({ ...content, hero: { ...content.hero, description: e.target.value }})}
          />
        </Section>

        {/* Service Reliability */}
        <Section title="Service Reliability">
          <Input
            label="Title"
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
            label="List Items"
          />
        </Section>

        {/* Service Commitment */}
        <Section title="Service Commitment">
          <Input
            label="Section Title"
            value={content.serviceCommitment?.title || ''}
            onChange={e => setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, title: e.target.value }})}
          />
          <div className="space-y-6">
            {(content.serviceCommitment?.services || []).map((service, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium dark:text-white">Service {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newServices = content.serviceCommitment.services.filter((_, i) => i !== index);
                      setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Icon</label>
                    <select
                      value={service.icon || 'FiTool'}
                      onChange={e => {
                        const newServices = [...content.serviceCommitment.services];
                        newServices[index].icon = e.target.value;
                        setContent({ ...content, serviceCommitment: { ...content.serviceCommitment, services: newServices }});
                      }}
                      className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    >
                      {['FiTool', 'FiMonitor', 'FiSmile', 'FiCalendar', 'FiShoppingCart', 'FiThumbsUp'].map(icon => (
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
              </div>
            ))}
            <button
              type="button"
              onClick={() => setContent({ ...content, serviceCommitment: { 
                ...content.serviceCommitment, 
                services: [...(content.serviceCommitment?.services || []), { icon: 'FiTool', title: '', text: '' }]
              }})}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
            >
              <FiPlus /> Add Service Item
            </button>
          </div>
        </Section>

        {/* Coverage Areas */}
        <Section title="Coverage Areas">
          <ListEditor
            items={content.coverageAreas}
            onChange={newItems => setContent({ ...content, coverageAreas: newItems })}
            label="Counties"
          />
        </Section>

        {/* Why Choose Us */}
        <Section title="Why Choose Us">
          <div className="space-y-6">
            {content.whyChooseUs.map((item, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium dark:text-white">Feature {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newFeatures = content.whyChooseUs.filter((_, i) => i !== index);
                      setContent({ ...content, whyChooseUs: newFeatures });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash />
                  </button>
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
              </div>
            ))}
            <button
              type="button"
              onClick={() => setContent({ ...content, whyChooseUs: [...content.whyChooseUs, { title: '', text: '' }]})}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
            >
              <FiPlus /> Add Feature
            </button>
          </div>
        </Section>

        {/* Pricing Section */}
        <Section title="Pricing Section">
          <Input
            label="Title"
            value={content.pricing.title}
            onChange={e => setContent({ ...content, pricing: { ...content.pricing, title: e.target.value }})}
          />
          <TextArea
            label="Description"
            value={content.pricing.description}
            onChange={e => setContent({ ...content, pricing: { ...content.pricing, description: e.target.value }})}
          />
          <ListEditor
            items={content.pricing.listItems}
            onChange={newItems => setContent({ ...content, pricing: { ...content.pricing, listItems: newItems }})}
            label="List Items"
          />
        </Section>
      </motion.form>
    </div>
    </AdminLayout>
  );
}

// Helper components
const Section = ({ title, children }) => (
  <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
    <h2 className="text-xl font-semibold mb-4 dark:text-white">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1 dark:text-gray-300">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
    />
  </div>
);

const TextArea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1 dark:text-gray-300">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      rows="3"
      className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
    />
  </div>
);

const ListEditor = ({ items, onChange, label }) => (
  <div>
    <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={e => {
              const newItems = [...items];
              newItems[index] = e.target.value;
              onChange(newItems);
            }}
            className="flex-1 p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <FiTrash />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="flex items-center gap-2 text-primary-600 hover:text-primary-800"
      >
        <FiPlus /> Add Item
      </button>
    </div>
  </div>
);

export default AdminSolutionsPage;