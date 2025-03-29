import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export const useSiteSettings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'site');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings(data);
          applySettingsToCSS(data);
        }
      } catch (error) {
        console.error('Error loading site settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return settings;
};

const applySettingsToCSS = (settings) => {
  if (settings.primaryColor) {
    const rgb = hexToRgb(settings.primaryColor); // e.g. "#22c55e" → "34 197 94"
    document.documentElement.style.setProperty('--color-primary-500', rgb);
  }

  if (settings.fontFamily) {
    document.documentElement.style.setProperty('--font-family-sans', settings.fontFamily);
    document.body.style.fontFamily = settings.fontFamily;
  }
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r} ${g} ${b}`;
};
