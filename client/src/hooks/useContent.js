// src/hooks/useContent.js
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export const useContent = (pageId) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'content', pageId);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setContent(doc.data());
      } else {
        console.log("No content found for", pageId);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pageId]);

  return { content, loading };
};