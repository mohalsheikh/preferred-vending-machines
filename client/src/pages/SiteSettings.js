// src/pages/SiteSettings.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    primaryColor: '#22c55e',
    fontFamily: 'Inter',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'site');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data());
        applyStyles(docSnap.data());
      }
    };
    fetchSettings();
  }, []);

  const applyStyles = (settings) => {
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.body.style.fontFamily = settings.fontFamily;
  };

  const handleChange = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    applyStyles(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    await setDoc(doc(db, 'settings', 'site'), settings, { merge: true });
    setSaving(false);
    alert('Settings saved!');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Settings</h1>

        {/* Primary Color Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Primary Color
          </label>
          <input
            type="color"
            value={settings.primaryColor}
            onChange={(e) => handleChange('primaryColor', e.target.value)}
            className="w-16 h-10 rounded border"
          />
        </div>

        {/* Font Family Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Font Family
          </label>
          <select
            value={settings.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
          >
            <option value="Inter">Inter</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="system-ui">System UI</option>
          </select>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg shadow-md"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </motion.button>
      </div>
    </div>
  );
};

export default SiteSettings;
