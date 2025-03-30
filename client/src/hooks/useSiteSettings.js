// // src/hooks/useSiteSettings.js
// import { useEffect } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase';

// export function useSiteSettings() {
//   useEffect(() => {
//     const loadTheme = async () => {
//       try {
//         const docRef = doc(db, 'theme', 'config');
//         const snapshot = await getDoc(docRef);
//         if (snapshot.exists()) {
//           const theme = snapshot.data();
//           applyThemeToDocument(theme);
//         }
//       } catch (error) {
//         console.error('Failed to load theme settings:', error);
//       }
//     };

//     const applyThemeToDocument = (theme) => {
//       const root = document.documentElement;
//       Object.entries(theme.colors).forEach(([group, shades]) => {
//         Object.entries(shades).forEach(([shade, value]) => {
//           root.style.setProperty(`--${group}-${shade}`, value);
//         });
//       });

//       root.style.setProperty('--font-family', theme.typography.fontFamily);
//       root.style.setProperty('--heading-size', theme.typography.headingSize);
//       root.style.setProperty('--base-size', theme.typography.baseSize);
//     };

//     loadTheme();
//   }, []);
// }


// hooks/useSiteSettings.js
import { useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * A hook that loads the theme config from Firestore
 * and applies it to :root variables so the entire site
 * reflects the saved theme on initial load.
 */
export function useSiteSettings() {
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const docRef = doc(db, 'theme', 'config');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          applyTheme(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching global theme:', error);
      }
    };

    fetchTheme();
  }, []);
}

/**
 * Update the document :root CSS variables
 * so that Tailwind (and custom CSS) see the changes.
 */
function applyTheme(config) {
  const root = document.documentElement;

  // Colors
  Object.entries(config.colors).forEach(([group, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      root.style.setProperty(`--${group}-${shade}`, value.replace('rgb(', '').replace(')', ''));
    });
  });

  // Typography
  root.style.setProperty('--font-family', config.typography.fontFamily);
  root.style.setProperty('--heading-size', config.typography.headingSize);
  root.style.setProperty('--base-size', config.typography.baseSize);

  // If you want to apply shadows, transitions, etc., you can do that here as well.
}
