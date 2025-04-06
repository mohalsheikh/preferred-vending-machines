// src/pages/AdminContactPage.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { FiPlus, FiTrash2, FiCheckCircle, FiAlertCircle, FiMapPin, FiClock, FiPhone, FiMail } from 'react-icons/fi';
import AdminLayout from './layout/AdminLayout';

function AdminContactPage() {
  const [formData, setFormData] = useState({
    heroTitle: "Let's Connect",
    heroSubtitle: "Get in Touch",
    heroDescription: "Have questions about our sustainable vending solutions? Our team is ready to help you revolutionize your retail operations.",
    address: "123 Green Street, Eco City, EC1 1AA",
    phone: "+1 (555) 123-4567",
    email: "support@PreferredVendingprovides.com",
    supportHours: "Mon-Fri: 9AM - 5PM (GMT)",
    responseTime: "Average response time: 2 hours",
    trustItems: ['24/7 Support', 'Industry Leaders', 'Eco Certified', '5-Star Rating'],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.680384185614!2d-0.1277583842307394!3d51.50073247963429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a5342fdf089c627!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1633018229706!5m2!1sen!2suk"
  });

  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'contactContent', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setStatus('error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await setDoc(doc(db, 'contactContent', 'content'), formData, { merge: true });
      setStatus('success');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error("Error updating content:", error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTrustItemChange = (index, value) => {
    const newItems = [...formData.trustItems];
    newItems[index] = value;
    setFormData({ ...formData, trustItems: newItems });
  };

  const addTrustItem = () => {
    setFormData({ ...formData, trustItems: [...formData.trustItems, ''] });
  };

  const removeTrustItem = (index) => {
    const newItems = formData.trustItems.filter((_, i) => i !== index);
    setFormData({ ...formData, trustItems: newItems });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">
          Loading contact settings...
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="Contact Page Editor">
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <Helmet>
        <title>Admin Contact - Preferred Vending</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Page Settings
          </h1>
          <button
            type="submit"
            form="contact-settings-form"
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Saving...' : 'Save Changes'}
          </button>
        </header>

        <form onSubmit={handleSubmit} id="contact-settings-form" className="space-y-8">
          {/* Hero Section */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-primary-500 rounded-full" />
              Hero Section
            </h2>
            <div className="space-y-6">
              <InputField
                label="Main Title"
                name="heroTitle"
                value={formData.heroTitle}
                onChange={handleChange}
                placeholder="e.g., Let's Work Together"
              />
              <InputField
                label="Subtitle"
                name="heroSubtitle"
                value={formData.heroSubtitle}
                onChange={handleChange}
                placeholder="e.g., Get in Touch"
              />
              <TextAreaField
                label="Description"
                name="heroDescription"
                value={formData.heroDescription}
                onChange={handleChange}
                placeholder="Enter your hero section description..."
              />
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-primary-500 rounded-full" />
              Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={<FiMapPin className="text-gray-500" />}
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter company address"
              />
              <InputField
                icon={<FiPhone className="text-gray-500" />}
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
              <InputField
                icon={<FiMail className="text-gray-500" />}
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="support@company.com"
                type="email"
              />
              <InputField
                icon={<FiClock className="text-gray-500" />}
                label="Support Hours"
                name="supportHours"
                value={formData.supportHours}
                onChange={handleChange}
                placeholder="Mon-Fri: 9AM - 5PM (GMT)"
              />
              <div className="md:col-span-2">
                <InputField
                  label="Response Time"
                  name="responseTime"
                  value={formData.responseTime}
                  onChange={handleChange}
                  placeholder="Average response time: 2 hours"
                />
              </div>
            </div>
          </section>

          {/* Trust Items */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-primary-500 rounded-full" />
              Trust Badges
            </h2>
            <div className="space-y-4">
              {formData.trustItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleTrustItemChange(index, e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none"
                      placeholder="Enter trust badge text"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {index + 1}.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTrustItem(index)}
                    className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTrustItem}
                className="flex items-center gap-2 px-4 py-2.5 text-primary-600 hover:text-primary-700 font-medium"
              >
                <FiPlus className="w-5 h-5" />
                Add Trust Badge
              </button>
            </div>
          </section>

          {/* Map Embed */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-primary-500 rounded-full" />
              Map Settings
            </h2>
            <InputField
              label="Google Maps Embed URL"
              name="mapEmbedUrl"
              value={formData.mapEmbedUrl}
              onChange={handleChange}
              placeholder="Paste Google Maps embed URL here"
              helpText="Get the embed URL from Google Maps → Share → Embed a map"
            />
          </section>

          {status === 'success' && (
            <div className="fixed bottom-6 right-6 flex items-center gap-3 px-6 py-3.5 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg shadow-lg border border-green-100 dark:border-green-800 animate-slide-up">
              <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
              Changes saved successfully!
            </div>
          )}

          {status === 'error' && (
            <div className="fixed bottom-6 right-6 flex items-center gap-3 px-6 py-3.5 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg shadow-lg border border-red-100 dark:border-red-800 animate-slide-up">
              <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
              Error saving changes. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
    </AdminLayout>
  );
}

// Reusable Input Component
const InputField = ({ label, icon, helpText, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`w-full ${icon ? 'pl-10 pr-4' : 'px-4'} py-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none transition-all duration-200`}
      />
    </div>
    {helpText && (
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {helpText}
      </p>
    )}
  </div>
);

// Reusable TextArea Component
const TextAreaField = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <textarea
      {...props}
      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 border-none transition-all duration-200 min-h-[120px]"
    />
  </div>
);

export default AdminContactPage;