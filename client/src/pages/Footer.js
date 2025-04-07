// Footer.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // adjust the path as needed
import { doc, getDoc } from 'firebase/firestore';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  const [footerContent, setFooterContent] = useState({
    companyInfo: {},
    products: [],
    company: [],
    legal: [],
    copyright: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        // Load all docs in parallel
        const [
          companyInfoSnap,
          productsSnap,
          companySnap,
          legalSnap,
          copyrightSnap
        ] = await Promise.all([
          getDoc(doc(db, 'footerContent', 'companyInfo')),
          getDoc(doc(db, 'footerContent', 'products')),
          getDoc(doc(db, 'footerContent', 'company')),
          getDoc(doc(db, 'footerContent', 'legal')),
          getDoc(doc(db, 'footerContent', 'copyright'))
        ]);

        // Set final local state
        setFooterContent({
          companyInfo: companyInfoSnap.exists() ? companyInfoSnap.data() : {},
          products: productsSnap.exists() ? productsSnap.data().items : [],
          company: companySnap.exists() ? companySnap.data().items : [],
          legal: legalSnap.exists() ? legalSnap.data().items : [],
          copyright: copyrightSnap.exists()
            ? copyrightSnap.data().text
            : ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading footer content:', error);
        setLoading(false);
      }
    };

    fetchFooterContent();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading footer content...</div>;
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
          {/* Company Info Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {footerContent.companyInfo.title || 'Preferred Vending'}
            </h3>
            <p className="text-sm">
              {footerContent.companyInfo.description ||
                'Innovating sustainable vending solutions through cutting-edge technology.'}
            </p>
            <div className="flex items-center gap-2">
              <FiMapPin />
              <span>{footerContent.companyInfo.address || '123 Green Street, Eco City'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone />
              <span>{footerContent.companyInfo.phone || '+1 (555) 123-4567'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail />
              <span>{footerContent.companyInfo.email || 'info@preferredvending.com'}</span>
            </div>
          </div>

          {/* Products Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              {footerContent.products.map((item, index) => (
                <li key={index}>
                  <a href={item.url} className="hover:text-primary-600 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-2">
              {footerContent.company.map((item, index) => (
                <li key={index}>
                  <a href={item.url} className="hover:text-primary-600 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              {footerContent.legal.map((item, index) => (
                <li key={index}>
                  <a href={item.url} className="hover:text-primary-600 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-500 dark:text-gray-600">
            {footerContent.copyright ||
              '© 2024 Preferred Vending. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
