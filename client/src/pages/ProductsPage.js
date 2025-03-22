// // src/pages/ProductsPage.js
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Helmet } from 'react-helmet-async';
// import { 
//   FiShoppingCart, 
//   FiMoon, 
//   FiSun,
//   FiMapPin,
//   FiPhone,
//   FiMail,
//   FiMenu
// } from 'react-icons/fi';

// function ProductsPage() {
//   const [filter, setFilter] = useState('all');
//   const [isDark, setIsDark] = useState(() => 
//     localStorage.getItem('theme') === 'dark' || 
//     window.matchMedia('(prefers-color-scheme: dark)').matches
//   );
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // 1) State for products
//   const [products, setProducts] = useState([]);

  // // Nav links
  // const navLinks = [
  //   { name: 'Home', href: '/' },
  //   { name: 'Technology', href: '/technology' },
  //   { name: 'Products', href: '/products' },
  //   { name: 'Solutions', href: '/solutions' },
  //   { name: 'About', href: '/about' },
  //   { name: 'Contact', href: '/contact' }
  // ];

//   // 2) Load products from localStorage on mount
//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
//     setProducts(storedProducts);
//   }, []);

//   // 3) Filter logic
//   const filteredProducts = 
//     filter === 'all' 
//       ? products 
//       : products.filter((p) => p.category === filter);

//   // Dark mode toggle
//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [isDark]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       <Helmet>
//         <title>Products - Preferred Vending</title>
//         <meta name="description" content="Explore Preferred Vending's innovative vending solutions" />
//       </Helmet>

      // {/* Navbar */}
      // <motion.nav className="fixed w-full z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 shadow-sm">
      //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      //     <div className="flex justify-between items-center">
      //       <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
      //         <span className="text-2xl font-bold gradient-text">
      //           Preferred <span className="font-light">Vending</span>
      //         </span>
      //       </motion.div>

      //       {/* Mobile Menu Button */}
      //       <button
      //         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      //         className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      //       >
      //         <FiMenu className="text-xl text-gray-600 dark:text-gray-300" />
      //       </button>

      //       {/* Desktop Nav Links */}
      //       <div className="hidden md:flex items-center gap-8">
      //         {navLinks.map((link) => (
      //           <motion.a
      //             key={link.name}
      //             href={link.href}
      //             className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
      //             whileHover={{ y: -2 }}
      //           >
      //             {link.name}
      //           </motion.a>
      //         ))}
      //       </div>

      //       {/* Actions (Dark Mode + Get Started) */}
      //       <div className="hidden md:flex items-center gap-4">
      //         <motion.button
      //           onClick={() => setIsDark(!isDark)}
      //           className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      //           whileHover={{ rotate: 15 }}
      //         >
      //           {isDark ? (
      //             <FiSun className="text-xl text-yellow-400" />
      //           ) : (
      //             <FiMoon className="text-xl text-gray-600" />
      //           )}
      //         </motion.button>

      //         <motion.button
      //           className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
      //           whileHover={{ scale: 1.05 }}
      //         >
      //           <FiShoppingCart /> Get Started
      //         </motion.button>
      //       </div>
      //     </div>

      //     {/* Mobile Menu */}
      //     {isMobileMenuOpen && (
      //       <div className="md:hidden mt-4">
      //         <div className="flex flex-col gap-4">
      //           {navLinks.map((link) => (
      //             <a
      //               key={link.name}
      //               href={link.href}
      //               className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
      //             >
      //               {link.name}
      //             </a>
      //           ))}
      //           <div className="flex items-center gap-4">
      //             <button
      //               onClick={() => setIsDark(!isDark)}
      //               className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      //             >
      //               {isDark ? (
      //                 <FiSun className="text-xl text-yellow-400" />
      //               ) : (
      //                 <FiMoon className="text-xl text-gray-600" />
      //               )}
      //             </button>
      //             <button
      //               className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
      //             >
      //               <FiShoppingCart /> Get Started
      //             </button>
      //           </div>
      //         </div>
      //       </div>
      //     )}
      //   </div>
      // </motion.nav>

//       {/* Products Hero */}
//       <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto text-center">
//           <motion.h1 
//             className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Explore Our
//             <span className="block mt-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
//               Vending Solutions
//             </span>
//           </motion.h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
//             Discover smart, sustainable vending machines designed for modern retail needs.
//           </p>
//         </div>
//       </section>

//       {/* Products Content */}
//       <section className="py-12 bg-white dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//           {/* Filter Buttons */}
//           <div className="flex justify-center gap-4 mb-12">
//             {['all', 'snacks', 'drinks', 'healthy'].map((category) => (
//               <motion.button
//                 key={category}
//                 onClick={() => setFilter(category)}
//                 className={`px-6 py-2 rounded-full capitalize ${
//                   filter === category
//                     ? 'bg-primary-600 text-white'
//                     : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 {category}
//               </motion.button>
//             ))}
//           </div>

//           {/* Product Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredProducts.map((product) => (
//               <motion.div
//                 key={product.id}
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
//                 whileHover={{ y: -10 }}
//               >
//                 {/* If you stored imageUrl from Admin, use that here */}
//                 <img 
//                   src={product.imageUrl || 'https://via.placeholder.com/400x300.png?text=No+Image'}
//                   alt={product.name} 
//                   className="w-full h-64 object-cover"
//                 />

//                 <div className="p-6">
//                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                     {product.name}
//                   </h2>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 capitalize">
//                     {product.category}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xl font-semibold text-gray-900 dark:text-white">
//                       ${product.price}
//                     </span>
//                     <motion.button
//                       className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
//                       whileHover={{ scale: 1.05 }}
//                     >
//                       <FiShoppingCart /> Buy
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

      // {/* Footer */}
      // <footer className="bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
      //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      //     <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
      //       <div className="space-y-4">
      //         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferred Vending</h3>
      //         <p className="text-sm">Innovating sustainable vending solutions through cutting-edge technology.</p>
      //         <div className="flex items-center gap-2">
      //           <FiMapPin className="text-primary-600" />
      //           <span>123 Green Street, Eco City</span>
      //         </div>
      //         <div className="flex items-center gap-2">
      //           <FiPhone className="text-primary-600" />
      //           <span>+1 (555) 123-4567</span>
      //         </div>
      //         <div className="flex items-center gap-2">
      //           <FiMail className="text-primary-600" />
      //           <span>info@PreferredVendingprovides.com</span>
      //         </div>
      //       </div>
            
      //       <div className="space-y-4">
      //         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h3>
      //         <ul className="space-y-2">
      //           {['Smart Vending', 'Inventory System', 'Mobile App', 'Analytics'].map((item) => (
      //             <li key={item}>
      //               <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
      //             </li>
      //           ))}
      //         </ul>
      //       </div>
            
      //       <div className="space-y-4">
      //         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
      //         <ul className="space-y-2">
      //           {['About Us', 'Careers', 'Blog', 'Partners'].map((item) => (
      //             <li key={item}>
      //               <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
      //             </li>
      //           ))}
      //         </ul>
      //       </div>
            
      //       <div className="space-y-4">
      //         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
      //         <ul className="space-y-2">
      //           {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'FAQs'].map((item) => (
      //             <li key={item}>
      //               <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
      //             </li>
      //           ))}
      //         </ul>
      //       </div>
      //     </div>
          
      //     <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
      //       <p className="text-gray-500 dark:text-gray-600">
      //         © 2024 Preferred Vending. All rights reserved.
      //       </p>
      //     </div>
      //   </div>
      // </footer>
//     </div>
//   );
// }

// export default ProductsPage;

// src/pages/ProductsPage.js

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// 1) Import Firestore functions
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // <-- your firebase.js

import { 
  FiShoppingCart, 
  FiMoon, 
  FiSun,
  FiMapPin,
  FiPhone,
  FiMail,
  FiMenu
} from 'react-icons/fi';

function ProductsPage() {
  const [filter, setFilter] = useState('all');
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2) State for Firestore products
  const [products, setProducts] = useState([]);


  // Nav links (same as before)
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Technology', href: '/technology' },
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  // 3) Load products from Firestore on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const loadedProducts = [];
        snapshot.forEach((docSnap) => {
          loadedProducts.push({ id: docSnap.id, ...docSnap.data() });
        });
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  // 4) Filter logic
  const filteredProducts = 
    filter === 'all' 
      ? products
      : products.filter((p) => p.category === filter);

  // 5) Dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>Products - Preferred Vending</title>
        <meta name="description" content="Explore Preferred Vending's innovative vending solutions" />
      </Helmet>

            {/* Navbar */}
            <motion.nav className="fixed w-full z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              <span className="text-2xl font-bold gradient-text">
                Preferred <span className="font-light">Vending</span>
              </span>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiMenu className="text-xl text-gray-600 dark:text-gray-300" />
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Actions (Dark Mode + Get Started) */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ rotate: 15 }}
              >
                {isDark ? (
                  <FiSun className="text-xl text-yellow-400" />
                ) : (
                  <FiMoon className="text-xl text-gray-600" />
                )}
              </motion.button>

              <motion.button
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <FiShoppingCart /> Get Started
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {isDark ? (
                      <FiSun className="text-xl text-yellow-400" />
                    ) : (
                      <FiMoon className="text-xl text-gray-600" />
                    )}
                  </button>
                  <button
                    className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
                  >
                    <FiShoppingCart /> Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Products Hero */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Explore Our
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Vending Solutions
            </span>
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Discover smart, sustainable vending machines designed for modern retail needs.
          </p>
        </div>
      </section>

      {/* Products Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {['all', 'snacks', 'drinks', 'healthy'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full capitalize ${
                  filter === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                whileHover={{ y: -10 }}
              >
                <img 
                  src={product.imageUrl || 'https://via.placeholder.com/400x300.png?text=No+Image'}
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 capitalize">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    <motion.button
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FiShoppingCart /> Buy
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* Footer */}
     <footer className="bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferred Vending</h3>
              <p className="text-sm">Innovating sustainable vending solutions through cutting-edge technology.</p>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-primary-600" />
                <span>123 Green Street, Eco City</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-primary-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-primary-600" />
                <span>info@PreferredVendingprovides.com</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h3>
              <ul className="space-y-2">
                {['Smart Vending', 'Inventory System', 'Mobile App', 'Analytics'].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Blog', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'FAQs'].map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-600">
              © 2024 Preferred Vending. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProductsPage;
