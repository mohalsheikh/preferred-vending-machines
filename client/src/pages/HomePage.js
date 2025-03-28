// // src/pages/HomePage.js
// import {
//   FiCheckCircle,
//   FiChevronRight,
//   FiSettings,
//   FiShoppingCart,
//   FiStar,
//   FiZap,
//   FiMoon,
//   FiSun,
//   FiMapPin,
//   FiPhone,
//   FiMail,
//   FiMenu
// } from 'react-icons/fi';
// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Helmet } from 'react-helmet-async';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectCreative } from 'swiper/modules';
// import { useNavigate } from 'react-router-dom';
// import 'swiper/css';
// import 'swiper/css/effect-creative';

// // NEW: import Firestore methods
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase'; // <-- adjust path if needed

// function HomePage() {
//   const navigate = useNavigate();
//   const [isDark, setIsDark] = useState(() =>
//     localStorage.getItem('theme') === 'dark' ||
//     window.matchMedia('(prefers-color-scheme: dark)').matches
//   );
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

//   // State for dynamically fetched text content
//   const [content, setContent] = useState({
//     heroTitle: '',
//     heroSubtitle: '',
//     freeVendingTitle: '',
//     freeVendingSubtitle: '',
//     technologyTitle: '',
//     technologySubtitle: '',
//   });

//   useEffect(() => {
//     // Theme setup
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [isDark]);

//   // Fetch home page text from Firestore on mount
//   useEffect(() => {
//     const fetchHomeContent = async () => {
//       try {
//         const docRef = doc(db, 'siteContent/pages', 'homePage');
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setContent(docSnap.data());
//         } else {
//           console.log('No homePage document found in Firestore.');
//         }
//       } catch (error) {
//         console.error('Error fetching homePage data:', error);
//       }
//     };

//     fetchHomeContent();
//   }, []);

//   // Features for the Technology section (these could also come from Firestore if desired)
//   const features = [
//     { icon: <FiZap />, title: 'Premium Snacks', text: 'Curated selection of healthy choices' },
//     { icon: <FiShoppingCart />, title: 'Zero Cost', text: 'Free installation & maintenance' },
//     { icon: <FiStar />, title: 'Smart Technology', text: 'Real-time inventory tracking' },
//     { icon: <FiSettings />, title: '24/7 Support', text: 'Dedicated customer service' }
//   ];

//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Technology', href: '/technology' },
//     { name: 'Products', href: '/products' },
//     { name: 'Solutions', href: '/solutions' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'FAQ', href: '/FAQ' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       <Helmet>
//         <title>Preferred Vending</title>
//         <meta 
//           name="description" 
//           content="Premium vending solutions for businesses and schools with free installation and smart technology" 
//         />
//       </Helmet>

//       <motion.div
//         className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700 z-50"
//         style={{ scaleX: scrollYProgress }}
//       />

//       {/* Navbar */}
//       <motion.nav className="fixed w-full z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
//               <span className="text-2xl font-bold gradient-text">
//                 Preferred <span className="font-light">Vending</span>
//               </span>
//             </motion.div>

//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//             >
//               <FiMenu className="text-xl text-gray-600 dark:text-gray-300" />
//             </button>

//             <div className="hidden md:flex items-center gap-8">
//               {navLinks.map((link) => (
//                 <motion.a
//                   key={link.name}
//                   href={link.href}
//                   className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
//                   whileHover={{ y: -2 }}
//                 >
//                   {link.name}
//                 </motion.a>
//               ))}
//             </div>

//             <div className="hidden md:flex items-center gap-4">
//               <motion.button
//                 onClick={() => setIsDark(!isDark)}
//                 className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                 whileHover={{ rotate: 15 }}
//               >
//                 {isDark ? (
//                   <FiSun className="text-xl text-yellow-400" />
//                 ) : (
//                   <FiMoon className="text-xl text-gray-600" />
//                 )}
//               </motion.button>

//               <motion.button
//                 onClick={() => navigate('/contact')}
//                 className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <FiShoppingCart /> Get Started
//               </motion.button>
//             </div>
//           </div>

//           {isMobileMenuOpen && (
//             <div className="md:hidden mt-4">
//               <div className="flex flex-col gap-4">
//                 {navLinks.map((link) => (
//                   <a
//                     key={link.name}
//                     href={link.href}
//                     className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
//                   >
//                     {link.name}
//                   </a>
//                 ))}
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => setIsDark(!isDark)}
//                     className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                   >
//                     {isDark ? (
//                       <FiSun className="text-xl text-yellow-400" />
//                     ) : (
//                       <FiMoon className="text-xl text-gray-600" />
//                     )}
//                   </button>
//                   <button
//                     onClick={() => navigate('/contact')}
//                     className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
//                   >
//                     <FiShoppingCart /> Get Started
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </motion.nav>

//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 dark:from-primary-700/30 dark:to-primary-900/30" />
//         <motion.div 
//           className="relative z-10 text-center px-4 space-y-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
//             {/* Use heroTitle from Firestore */}
//             {content.heroTitle || 'Preferred Vending Solutions'}
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             {/* Use heroSubtitle from Firestore */}
//             {content.heroSubtitle || 'Premium snacks, competitive pricing, and exceptional service'}
//           </p>
//           <div className="flex justify-center gap-4">
//             <motion.button
//               onClick={() => navigate('/contact')}
//               className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-all"
//               whileHover={{ scale: 1.05 }}
//             >
//               <FiCheckCircle /> Get Started
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Free Vending Section */}
//       <section className="relative py-24 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div 
//             className="space-y-8"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//           >
//             <h2 className="text-4xl md:text-6xl font-bold">
//               {/* Use freeVendingTitle from Firestore */}
//               {content.freeVendingTitle || 'FREE Vending Machines'}
//               <span className="block mt-4">For Your Business or School</span>
//             </h2>
//             <p className="text-xl md:text-2xl max-w-3xl mx-auto">
//               {/* Use freeVendingSubtitle from Firestore */}
//               {content.freeVendingSubtitle || 'We provide full-service vending solutions at no cost to you, featuring:'}
//             </p>
//             <div className="grid md:grid-cols-3 gap-8 mt-12">
//               <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
//                 <h3 className="text-2xl font-bold mb-4">Healthy Options</h3>
//                 <p>Nutritionist-curated snack selection</p>
//               </div>
//               <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
//                 <h3 className="text-2xl font-bold mb-4">Smart Technology</h3>
//                 <p>Real-time inventory tracking</p>
//               </div>
//               <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
//                 <h3 className="text-2xl font-bold mb-4">24/7 Support</h3>
//                 <p>Dedicated maintenance team</p>
//               </div>
//             </div>
//             <motion.button
//               onClick={() => navigate('/contact')}
//               className="px-8 py-4 bg-white text-primary-600 rounded-xl shadow-2xl hover:shadow-3xl transition-all mx-auto mt-8"
//               whileHover={{ scale: 1.05 }}
//             >
//               Claim Your Free Machine
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Technology Section */}
//       <section className="py-24 bg-white dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="space-y-8">
//               <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
//                 {/* Use technologyTitle from Firestore */}
//                 {content.technologyTitle || 'Smart Choices Technology'}
//               </h2>
//               <p className="text-xl text-gray-600 dark:text-gray-300">
//                 {/* Use technologySubtitle from Firestore */}
//                 {content.technologySubtitle || 'State-of-the-art vending solutions featuring:'}
//               </p>
//               <div className="grid grid-cols-2 gap-6">
//                 {features.map((feature, index) => (
//                   <motion.div
//                     key={feature.title}
//                     className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all"
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     <div className="text-primary-600 dark:text-primary-400 text-3xl mb-4">
//                       {feature.icon}
//                     </div>
//                     <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
//                     <p className="text-gray-600 dark:text-gray-400">{feature.text}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             <div className="relative h-[600px] rounded-3xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
//               <img
//                 src="https://via.placeholder.com/800x600.png?text=Smart+Vending+Interface"
//                 alt="Smart Vending Technology"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferred Vending</h3>
//               <p className="text-sm">Innovating vending solutions through cutting-edge technology</p>
//               <div className="flex items-center gap-2">
//                 <FiMapPin className="text-primary-600" />
//                 <span>123 Commerce Street, Business City</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiPhone className="text-primary-600" />
//                 <span>+1 (888) 123-4567</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiMail className="text-primary-600" />
//                 <span>contact@PreferredVending.com</span>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h3>
//               <ul className="space-y-2">
//                 {['Snack Machines', 'Beverage Machines', 'Micro Markets', 'Smart Fridges'].map((item) => (
//                   <li key={item}>
//                     <a href="/products" className="hover:text-primary-600 transition-colors">{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
//               <ul className="space-y-2">
//                 {['About Us', 'Careers', 'Blog', 'Partners'].map((item) => (
//                   <li key={item}>
//                     <a href="/about" className="hover:text-primary-600 transition-colors">{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
//               <ul className="space-y-2">
//                 {['Privacy Policy', 'Terms of Service', 'Accessibility', 'FAQs'].map((item) => (
//                   <li key={item}>
//                     <a href="/legal" className="hover:text-primary-600 transition-colors">{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
          
//           <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
//             <p className="text-gray-500 dark:text-gray-600">
//               © 2024 Preferred Vending. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default HomePage;



// src/pages/HomePage.js
import {
  FiCheckCircle,
  FiChevronRight,
  FiSettings,
  FiShoppingCart,
  FiStar,
  FiZap,
  FiMoon,
  FiSun,
  FiMapPin,
  FiPhone,
  FiMail,
  FiMenu
} from 'react-icons/fi';
import { db } from '../firebase'; // <-- Make sure this path is correct
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import 'swiper/css';
import 'swiper/css/effect-creative';

function HomePage() {
  const navigate = useNavigate();
  const { content, loading } = useContent('homePage');

  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Technology', href: '/technology' },
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/FAQ' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>{content?.seo?.title || 'Preferred Vending'}</title>
        <meta
          name="description"
          content={
            content?.seo?.description ||
            'Premium vending solutions for businesses and schools with free installation and smart technology'
          }
        />
      </Helmet>

      {/* Progress Bar at the top */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <motion.nav className="fixed w-full z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo / Brand */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <span className="text-2xl font-bold gradient-text">
                Preferred <span className="font-light">Vending</span>
              </span>
            </motion.div>

            {/* Mobile Menu Toggle */}
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

            {/* Desktop Theme + CTA Button */}
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
                onClick={() => navigate('/contact')}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <FiShoppingCart /> Get Started
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
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
                    onClick={() => navigate('/contact')}
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 dark:from-primary-700/30 dark:to-primary-900/30" />
        <motion.div
          className="relative z-10 text-center px-4 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            {content?.hero?.title || 'Preferred'}
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              {content?.hero?.highlightedTitle || 'Vending Solutions'}
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {content?.hero?.subtitle ||
              'Premium snacks, competitive pricing, and exceptional service'}
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <FiCheckCircle />{' '}
              {content?.hero?.buttonText || 'Get Started'}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Free Vending Section */}
      <section className="relative py-24 bg-gradient-to-r from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold">
              {content?.freeVending?.title || 'FREE Vending Machines'}
              <span className="block mt-4">
                {content?.freeVending?.subtitle ||
                  'For Your Business or School'}
              </span>
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              {content?.freeVending?.description ||
                'We provide full-service vending solutions at no cost to you, featuring:'}
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {content?.freeVending?.features?.map((feature, index) => {
                // Each "feature" is just a string like "Healthy Options: Nutritionist..."
                // If you want to split out the title from description, you can do something like:
                const [title, description] = feature.split(': ');
                return (
                  <div
                    key={index}
                    className="p-6 bg-white/10 rounded-xl backdrop-blur-sm"
                  >
                    <h3 className="text-2xl font-bold mb-4">{title}</h3>
                    <p>{description}</p>
                  </div>
                );
              })}
            </div>
            <motion.button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-white text-primary-600 rounded-xl shadow-2xl hover:shadow-3xl transition-all mx-auto mt-8"
              whileHover={{ scale: 1.05 }}
            >
              {content?.freeVending?.buttonText ||
                'Claim Your Free Machine'}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                {content?.technology?.title || 'Smart Choices Technology'}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {content?.technology?.subtitle ||
                  'State-of-the-art vending solutions featuring:'}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {content?.technology?.features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-primary-600 dark:text-primary-400 text-3xl mb-4">
                      {feature.icon === 'FiZap' && <FiZap />}
                      {feature.icon === 'FiShoppingCart' && <FiShoppingCart />}
                      {feature.icon === 'FiStar' && <FiStar />}
                      {feature.icon === 'FiSettings' && <FiSettings />}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative h-[600px] rounded-3xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
              <img
                src="https://via.placeholder.com/800x600.png?text=Smart+Vending+Interface"
                alt="Smart Vending Technology"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Preferred Vending
              </h3>
              <p className="text-sm">
                Innovating vending solutions through cutting-edge technology
              </p>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-primary-600" />
                <span>
                  {content?.footer?.address || '123 Commerce Street, Business City'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="text-primary-600" />
                <span>
                  {content?.footer?.phone || '+1 (888) 123-4567'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-primary-600" />
                <span>
                  {content?.footer?.email || 'contact@PreferredVending.com'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Products
              </h3>
              <ul className="space-y-2">
                {['Snack Machines', 'Beverage Machines', 'Micro Markets', 'Smart Fridges'].map(
                  (item) => (
                    <li key={item}>
                      <a href="/products" className="hover:text-primary-600 transition-colors">
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Company
              </h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Blog', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="/about" className="hover:text-primary-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Legal
              </h3>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Accessibility', 'FAQs'].map((item) => (
                  <li key={item}>
                    <a href="/legal" className="hover:text-primary-600 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-600">
              {content?.footer?.copyright ||
                '© 2024 Preferred Vending. All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
