// // AdminFooterPage.jsx
// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { FiSave, FiEdit, FiPlus, FiMail, FiMapPin, FiPhone, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
// import AdminLayout from './layout/AdminLayout';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const AdminFooterPage = () => {
//   const [sections, setSections] = useState({
//     companyInfo: {},
//     products: [],
//     company: [],
//     legal: [],
//     copyright: ''
//   });

//   const handleEdit = (section) => {
//     setEditingSection(section);
//     setTempContent(sections[section]);
//   };

//   const [editingSection, setEditingSection] = useState(null);
//   const [tempContent, setTempContent] = useState(null);
//   const [expandedSections, setExpandedSections] = useState(new Set());

//   // Toggle section expansion
//   const toggleSection = (sectionKey) => {
//     setExpandedSections(prev => {
//       const next = new Set(prev);
//       next.has(sectionKey) ? next.delete(sectionKey) : next.add(sectionKey);
//       return next;
//     });
//   };

//   // Fetch footer data
//   useEffect(() => {
//     const fetchFooterContent = async () => {
//       try {
//         const sectionNames = ['companyInfo', 'products', 'company', 'legal', 'copyright'];
//         const content = {};

//         const fetchPromises = sectionNames.map(async (name) => {
//           const snap = await getDoc(doc(db, 'footerContent', name));
//           return { name, snap };
//         });

//         const results = await Promise.all(fetchPromises);
        
//         results.forEach(({ name, snap }) => {
//           if (snap.exists()) {
//             content[name] = name === 'copyright' ? snap.data().text || '' :
//               name === 'companyInfo' ? snap.data() :
//               snap.data().items || [];
//           } else {
//             content[name] = name === 'copyright' ? '' :
//               name === 'companyInfo' ? {} : [];
//           }
//         });

//         setSections(content);
//       } catch (err) {
//         toast.error('Failed to load footer content');
//         console.error('Error loading footer content:', err);
//       }
//     };

//     fetchFooterContent();
//   }, []);

//   // Handle drag and drop reordering
//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
    
//     const items = Array.from(tempContent);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//     setTempContent(items);
//   };

//   // Save changes
//   const handleSave = async (section) => {
//     try {
//       const docData = section === 'copyright' ? { text: tempContent } :
//         section === 'companyInfo' ? tempContent :
//         { items: tempContent };

//       await setDoc(doc(db, 'footerContent', section), docData, { merge: true });
      
//       setSections(prev => ({ ...prev, [section]: tempContent }));
//       setEditingSection(null);
//       toast.success('Changes saved successfully!');
//     } catch (error) {
//       toast.error('Failed to save changes');
//       console.error('Error saving footer content:', error);
//     }
//   };

//   return (
//     <AdminLayout title="Footer Page Editor">
//       <div className="container mx-auto p-4 lg:p-8 max-w-6xl">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Footer Content Manager
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-2">
//             Manage your website's footer content and navigation
//           </p>
//         </header>

//         <div className="space-y-6">
//           <SectionWrapper
//             title="Company Information"
//             sectionKey="companyInfo"
//             content={sections.companyInfo}
//             isEditing={editingSection === 'companyInfo'}
//             isExpanded={expandedSections.has('companyInfo')}
//             onToggle={toggleSection}
//             onEdit={() => handleEdit('companyInfo')}
//             onCancel={() => setEditingSection(null)}
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <EditableField
//                 label="Company Name"
//                 value={tempContent?.title || ''}
//                 onChange={(e) => setTempContent({ ...tempContent, title: e.target.value })}
//                 placeholder="Enter company name"
//               />
//               <EditableTextArea
//                 label="Description"
//                 value={tempContent?.description || ''}
//                 onChange={(e) => setTempContent({ ...tempContent, description: e.target.value })}
//                 placeholder="Brief company description"
//               />
//               <div className="col-span-full space-y-4">
//                 <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
//                   Contact Information
//                 </h3>
//                 <ContactField
//                   icon={<FiMapPin />}
//                   label="Address"
//                   value={tempContent?.address || ''}
//                   onChange={(e) => setTempContent({ ...tempContent, address: e.target.value })}
//                   placeholder="Street address, City, Country"
//                 />
//                 <ContactField
//                   icon={<FiPhone />}
//                   label="Phone Number"
//                   value={tempContent?.phone || ''}
//                   onChange={(e) => setTempContent({ ...tempContent, phone: e.target.value })}
//                   placeholder="+1 (555) 000-0000"
//                 />
//                 <ContactField
//                   icon={<FiMail />}
//                   label="Email Address"
//                   value={tempContent?.email || ''}
//                   onChange={(e) => setTempContent({ ...tempContent, email: e.target.value })}
//                   placeholder="contact@company.com"
//                 />
//               </div>
//             </div>
//           </SectionWrapper>

//           {['products', 'company', 'legal'].map((sectionKey) => (
//             <SectionWrapper
//               key={sectionKey}
//               title={`${sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)} Links`}
//               sectionKey={sectionKey}
//               content={sections[sectionKey]}
//               isEditing={editingSection === sectionKey}
//               isExpanded={expandedSections.has(sectionKey)}
//               onToggle={toggleSection}
//               onEdit={() => handleEdit(sectionKey)}
//               onCancel={() => setEditingSection(null)}
//             >
//               <DragDropContext onDragEnd={handleDragEnd}>
//                 <Droppable droppableId="links">
//                   {(provided) => (
//                     <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
//                       {tempContent.map((item, index) => (
//                         <Draggable key={index} draggableId={`item-${index}`} index={index}>
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex gap-3 items-center"
//                             >
//                               <div {...provided.dragHandleProps} className="text-gray-400 hover:text-gray-600 cursor-move">
//                                 <FiChevronUp className="block" />
//                                 <FiChevronDown className="block -mt-2" />
//                               </div>
//                               <input
//                                 type="text"
//                                 placeholder="Link text"
//                                 value={item.name}
//                                 onChange={(e) => {
//                                   const newItems = [...tempContent];
//                                   newItems[index].name = e.target.value;
//                                   setTempContent(newItems);
//                                 }}
//                                 className="flex-1 p-2 border rounded"
//                               />
//                               <input
//                                 type="text"
//                                 placeholder="URL"
//                                 value={item.url}
//                                 onChange={(e) => {
//                                   const newItems = [...tempContent];
//                                   newItems[index].url = e.target.value;
//                                   setTempContent(newItems);
//                                 }}
//                                 className="flex-1 p-2 border rounded"
//                               />
//                               <button
//                                 onClick={() => setTempContent(tempContent.filter((_, i) => i !== index))}
//                                 className="text-red-500 hover:text-red-700 p-2"
//                               >
//                                 <FiX />
//                               </button>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </DragDropContext>
//               <button
//                 onClick={() => setTempContent([...tempContent, { name: '', url: '' }])}
//                 className="mt-4 bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-gray-600 px-4 py-2 rounded-md flex items-center gap-2"
//               >
//                 <FiPlus />
//                 Add New Link
//               </button>
//             </SectionWrapper>
//           ))}

//           <SectionWrapper
//             title="Copyright Notice"
//             sectionKey="copyright"
//             content={sections.copyright}
//             isEditing={editingSection === 'copyright'}
//             isExpanded={expandedSections.has('copyright')}
//             onToggle={toggleSection}
//             onEdit={() => handleEdit('copyright')}
//             onCancel={() => setEditingSection(null)}
//           >
//             <div className="relative">
//               <input
//                 type="text"
//                 value={tempContent || ''}
//                 onChange={(e) => setTempContent(e.target.value)}
//                 placeholder="© 2024 Company Name. All rights reserved."
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700"
//               />
//               <div className="absolute right-3 top-3 text-gray-400">
//                 {tempContent?.length || 0}/120
//               </div>
//             </div>
//           </SectionWrapper>
//         </div>

//         {editingSection && (
//           <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 py-4 mt-8 -mx-4 lg:-mx-8 px-4 lg:px-8 shadow-lg">
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setEditingSection(null)}
//                 className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg border dark:border-gray-700"
//               >
//                 Discard Changes
//               </button>
//               <button
//                 onClick={() => handleSave(editingSection)}
//                 className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2"
//               >
//                 <FiSave className="text-lg" />
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// };

// // Enhanced SectionWrapper with collapsible functionality
// const SectionWrapper = ({ title, sectionKey, children, isEditing, isExpanded, onToggle, onEdit, onCancel, content }) => {
//   return (
//     <section className="border rounded-xl dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
//       <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
//         <div className="flex items-center gap-3">
//           {!isEditing ? (
//             <>
//               <button
//                 onClick={() => onToggle(sectionKey)}
//                 className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg"
//               >
//                 {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
//               </button>
//               <button
//                 onClick={onEdit}
//                 className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 px-3 py-1.5 rounded-md flex items-center gap-2"
//               >
//                 <FiEdit size={16} />
//                 Edit Section
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={onCancel}
//               className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 px-3 py-1.5 rounded-md flex items-center gap-2"
//             >
//               <FiX size={16} />
//               Cancel Editing
//             </button>
//           )}
//         </div>
//       </div>
      
//       {isExpanded && (
//         <div className="p-6 bg-gray-50 dark:bg-gray-950">
//           {isEditing ? (
//             <div className="space-y-6 animate-fadeIn">
//               {children}
//             </div>
//           ) : (
//             <PreviewContent section={sectionKey} content={content} />
//           )}
//         </div>
//       )}
//     </section>
//   );
// };

// // Improved PreviewContent with better visualization
// const PreviewContent = ({ section, content }) => {
//   const getPreview = () => {
//     if (!content || (Array.isArray(content) && content.length === 0)) {
//       return <div className="text-gray-400 italic">No content configured</div>;
//     }

//     switch (section) {
//       case 'companyInfo':
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="font-medium text-gray-900 dark:text-white">{content.title}</h3>
//               <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{content.description}</p>
//             </div>
//             <div className="space-y-2">
//               {content.address && <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                 <FiMapPin className="flex-shrink-0" />
//                 <span>{content.address}</span>
//               </div>}
//               {content.phone && <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                 <FiPhone className="flex-shrink-0" />
//                 <span>{content.phone}</span>
//               </div>}
//               {content.email && <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
//                 <FiMail className="flex-shrink-0" />
//                 <span>{content.email}</span>
//               </div>}
//             </div>
//           </div>
//         );
//       case 'copyright':
//         return <p className="text-gray-600 dark:text-gray-400 text-sm">{content}</p>;
//       default:
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {content.map((item, index) => (
//               <a
//                 key={index}
//                 href={item.url}
//                 className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {item.name}
//               </a>
//             ))}
//           </div>
//         );
//     }
//   };

//   return <div className="text-gray-900 dark:text-gray-200">{getPreview()}</div>;
// };

// // Styled form components
// const EditableField = ({ label, value, onChange, placeholder }) => (
//   <div>
//     <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{label}</label>
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
//     />
//   </div>
// );

// const EditableTextArea = ({ label, value, onChange, placeholder }) => (
//   <div>
//     <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{label}</label>
//     <textarea
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 dark:bg-gray-800 dark:border-gray-700"
//     />
//   </div>
// );

// const ContactField = ({ icon, label, value, onChange, placeholder }) => (
//   <div>
//     <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//       {icon}
//       {label}
//     </label>
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-700"
//     />
//   </div>
// );

// export default AdminFooterPage;

// AdminFooterPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FiSave, FiEdit, FiPlus, FiMail, FiMapPin, FiPhone, FiX, FiLink } from 'react-icons/fi';
import AdminLayout from './layout/AdminLayout';
import { motion } from 'framer-motion';

const AdminFooterPage = () => {
  const [sections, setSections] = useState({
    companyInfo: {},
    products: [],
    company: [],
    legal: [],
    copyright: ''
  });

  const [editingSection, setEditingSection] = useState(null);
  const [tempContent, setTempContent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const sectionNames = ['companyInfo', 'products', 'company', 'legal', 'copyright'];
        const content = {};

        for (const name of sectionNames) {
          const snap = await getDoc(doc(db, 'footerContent', name));
          if (snap.exists()) {
            content[name] = name === 'copyright' ? snap.data().text || '' :
              name === 'companyInfo' ? snap.data() : snap.data().items || [];
          } else {
            content[name] = name === 'copyright' ? '' : name === 'companyInfo' ? {} : [];
          }
        }

        setSections(content);
      } catch (err) {
        console.error('Error loading footer content:', err);
      }
    };

    fetchFooterContent();
  }, []);

  const handleEdit = (section) => {
    setEditingSection(section);
    setTempContent(sections[section]);
  };

  const handleSave = async (section) => {
    setIsSaving(true);
    try {
      const updateData = section === 'copyright' ? { text: tempContent } :
        section === 'companyInfo' ? tempContent : { items: tempContent };

      await setDoc(doc(db, 'footerContent', section), updateData, { merge: true });
      setSections(prev => ({ ...prev, [section]: tempContent }));
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving footer content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout title="Footer Page Editor">
      <div className="container mx-auto p-4 lg:p-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Footer Content Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all footer sections and content
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <SectionWrapper
            title="Company Information"
            sectionKey="companyInfo"
            content={sections.companyInfo}
            isEditing={editingSection === 'companyInfo'}
            onEdit={() => handleEdit('companyInfo')}
            onSave={() => handleSave('companyInfo')}
            onCancel={() => setEditingSection(null)}
            isSaving={isSaving}
          >
<div className="grid gap-4 md:grid-cols-2">
  <EditableField
    label="Company Name"
    icon={<FiMapPin />}
    value={tempContent?.title || ''}
    onChange={(e) => setTempContent({ ...tempContent, title: e.target.value })}
    placeholder="Enter company name"
  />
  <EditableTextArea
    label="Description"
    value={tempContent?.description || ''}
    onChange={(e) => setTempContent({ ...tempContent, description: e.target.value })}
    placeholder="Brief company description"
  />
  <EditableField
    label="Address"
    icon={<FiMapPin />}
    value={tempContent?.address || ''}
    onChange={(e) => setTempContent({ ...tempContent, address: e.target.value })}
    placeholder="123 Business Street"
  />
  <EditableField
    label="Phone"
    icon={<FiPhone />}
    value={tempContent?.phone || ''}
    onChange={(e) => setTempContent({ ...tempContent, phone: e.target.value })}
    placeholder="+1 234 567 890"
  />
  <EditableField
    label="Email"
    icon={<FiMail />}
    value={tempContent?.email || ''}
    onChange={(e) => setTempContent({ ...tempContent, email: e.target.value })}
    placeholder="contact@company.com"
  />
</div>
          </SectionWrapper>

          <SectionWrapper
            title="Quick Links"
            sectionKey="products"
            content={sections.products}
            isEditing={editingSection === 'products'}
            onEdit={() => handleEdit('products')}
            onSave={() => handleSave('products')}
            onCancel={() => setEditingSection(null)}
            isSaving={isSaving}
          >
            <LinkListEditor items={tempContent || []} onChange={setTempContent} />
          </SectionWrapper>

          <SectionWrapper
            title="Company Links"
            sectionKey="company"
            content={sections.company}
            isEditing={editingSection === 'company'}
            onEdit={() => handleEdit('company')}
            onSave={() => handleSave('company')}
            onCancel={() => setEditingSection(null)}
            isSaving={isSaving}
          >
            <LinkListEditor items={tempContent || []} onChange={setTempContent} />
          </SectionWrapper>

          <SectionWrapper
            title="Legal Links"
            sectionKey="legal"
            content={sections.legal}
            isEditing={editingSection === 'legal'}
            onEdit={() => handleEdit('legal')}
            onSave={() => handleSave('legal')}
            onCancel={() => setEditingSection(null)}
            isSaving={isSaving}
          >
            <LinkListEditor items={tempContent || []} onChange={setTempContent} />
          </SectionWrapper>
        </div>

        <SectionWrapper
          title="Copyright Notice"
          sectionKey="copyright"
          content={sections.copyright}
          isEditing={editingSection === 'copyright'}
          onEdit={() => handleEdit('copyright')}
          onSave={() => handleSave('copyright')}
          onCancel={() => setEditingSection(null)}
          isSaving={isSaving}
        >
          <div className="relative">
            <textarea
              value={tempContent || ''}
              onChange={(e) => setTempContent(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 resize-none h-32"
              placeholder="Enter copyright text..."
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {tempContent?.length || 0}/200
            </div>
          </div>
        </SectionWrapper>
      </div>
    </AdminLayout>
  );
};

const SectionWrapper = ({ 
  title, 
  sectionKey, 
  content, 
  children, 
  isEditing, 
  onEdit, 
  onCancel, 
  onSave, 
  isSaving 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
          {!isEditing ? (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiEdit className="text-sm" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg disabled:opacity-50 transition-colors"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiSave className="text-sm" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={onCancel}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-1.5 rounded-lg transition-colors"
              >
                <FiX className="text-sm" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="min-h-[120px]">
          {isEditing ? (
            <div className="space-y-4 animate-fadeIn">
              {children}
            </div>
          ) : (
            <PreviewContent section={sectionKey} content={content} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PreviewContent = ({ section, content }) => {
  const isEmpty = !content || (Array.isArray(content) && content.length === 0);

  if (isEmpty) return (
    <div className="p-4 text-center text-gray-500 dark:text-gray-400 italic">
      No content added yet
    </div>
  );

  switch (section) {
    case 'companyInfo':
      return (
        <div className="space-y-3 text-gray-600 dark:text-gray-300">
          {content.title && <h4 className="font-medium text-gray-800 dark:text-white">{content.title}</h4>}
          {content.description && <p className="text-sm">{content.description}</p>}
          <div className="space-y-1 text-sm">
            {content.address && <div className="flex items-center gap-2"><FiMapPin />{content.address}</div>}
            {content.phone && <div className="flex items-center gap-2"><FiPhone />{content.phone}</div>}
            {content.email && <div className="flex items-center gap-2"><FiMail />{content.email}</div>}
          </div>
        </div>
      );
    case 'copyright':
      return <p className="text-sm text-gray-600 dark:text-gray-400">{content}</p>;
    default:
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              <FiLink className="flex-shrink-0" />
              <a href={item.url} className="truncate" target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      );
  }
};

// const EditableField = ({ label, icon, value, onChange, placeholder }) => (
//   <div className="space-y-1">
//     <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//       {icon}
//       {label}
//     </label>
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//     />
//   </div>
// );

const EditableTextArea = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
    />
  </div>
);

const EditableField = ({ label, icon, value, onChange, placeholder }) => (
  <div className="space-y-1">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      {icon}
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);


const LinkListEditor = ({ items, onChange }) => (
  <div className="space-y-4">
    {items.map((item, index) => (
      <div key={index} className="flex gap-3 items-start">
        <div className="flex-1 space-y-2">
          <input
            type="text"
            placeholder="Link text"
            value={item.name}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].name = e.target.value;
              onChange(newItems);
            }}
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
          <div className="flex gap-2 items-center">
            <FiLink className="text-gray-500" />
            <input
              type="url"
              placeholder="https://example.com"
              value={item.url}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].url = e.target.value;
                onChange(newItems);
              }}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </div>
        <button
          onClick={() => onChange(items.filter((_, i) => i !== index))}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg mt-2"
        >
          <FiX />
        </button>
      </div>
    ))}
    <button
      onClick={() => onChange([...items, { name: '', url: '' }])}
      className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
    >
      <FiPlus />
      Add New Link
    </button>
  </div>
);

export default AdminFooterPage;