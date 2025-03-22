// // src/pages/HomePage.js
// import { FiCheckCircle, FiChevronRight, FiPlay, FiSettings, FiShoppingCart, FiStar, FiZap } from 'react-icons/fi';
// import React, { useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Helmet } from 'react-helmet-async';
// import ReactPlayer from 'react-player';
// import { useNavigate } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-creative';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// function HomePage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

//   const features = [
//     { icon: <FiZap />, title: "Instant Service", text: "AI-powered quick response system" },
//     { icon: <FiShoppingCart />, title: "Smart Inventory", text: "Real-time stock monitoring" },
//     { icon: <FiStar />, title: "Premium Quality", text: "Commercial-grade components" },
//     { icon: <FiSettings />, title: "Remote Control", text: "Cloud-based management" }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <Helmet>
//         <title>Next-Gen Vending Solutions | Preferred Vending</title>
//       </Helmet>

//       {/* Enhanced Navigation */}
//       <motion.nav className="fixed w-full z-50 backdrop-blur-lg bg-white/90 shadow-sm border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
//           <div className="flex justify-between items-center">
//             <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
//               <img 
//                 src="/logo.svg" 
//                 className="h-12 w-auto" 
//                 alt="Premium Vending Solutions" 
//               />
//               <span className="text-xl font-bold text-gray-800">Preferred Vending</span>
//             </motion.div>
            
//             <div className="hidden md:flex items-center gap-8">
//               {['Products', 'Solutions', 'Industries', 'Resources'].map((item) => (
//                 <motion.a
//                   key={item}
//                   href="/"
//                   className="text-gray-600 hover:text-primary-600 font-medium transition-colors relative group"
//                   whileHover={{ y: -2 }}
//                 >
//                   {item}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
//                 </motion.a>
//               ))}
//               <motion.button
//                 className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <FiShoppingCart /> Get Started
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Hero Section with Parallax Effect */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 -z-10">
//           <ReactPlayer
//             url="/videos/hero-background.mp4"
//             playing
//             loop
//             muted
//             width="100%"
//             height="100%"
//             className="object-cover scale-125"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-400/90" />
//         </div>

//         <motion.div 
//           className="relative z-10 text-center px-4 space-y-8"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
//             Intelligent
//             <span className="block mt-4 gradient-text">Vending Ecosystem</span>
//           </h1>
//           <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
//             Next-generation smart retail solutions powered by AI and IoT technology
//           </p>
//           <div className="flex justify-center gap-4">
//             <motion.button
//               className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1"
//               whileHover={{ scale: 1.05 }}
//             >
//               <FiPlay className="text-2xl" /> Interactive Demo
//             </motion.button>
//             <motion.button
//               className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all hover:border-white/50"
//               whileHover={{ scale: 1.05 }}
//             >
//               Schedule Consultation
//             </motion.button>
//           </div>
//         </motion.div>

//         <motion.div 
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-float"
//           style={{ opacity }}
//         >
//           <FiChevronRight className="h-8 w-8 rotate-90" />
//         </motion.div>
//       </section>

//       {/* 3D Feature Cards Section */}
//       <section className="py-24 bg-gradient-to-b from-white to-primary-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="space-y-8">
//               <h2 className="text-4xl font-bold text-gray-900 bg-clip-text">
//                 Smart Retail Revolution
//               </h2>
//               <p className="text-gray-600 text-lg max-w-xl">
//                 Transform your business with our integrated platform featuring:
//               </p>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {features.map((feature, index) => (
//                   <motion.div
//                     key={feature.title}
//                     className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden"
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     whileHover={{ scale: 1.02 }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                     <div className="text-primary-600 text-3xl mb-4">{feature.icon}</div>
//                     <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                     <p className="text-gray-600">{feature.text}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
            
//             <motion.div 
//               className="relative h-[600px] bg-gray-100 rounded-[40px] overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow"
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//             >
//               <img
//                 src="https://images.unsplash.com/photo-1589984662646-e7f2fff099ad"
//                 alt="Smart vending interface"
//                 className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Modern Footer */}
//       <footer className="bg-gray-900 text-gray-300 pt-24 pb-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="space-y-6">
//               <div className="flex items-center gap-3">
//                 <img src="/logo-white.svg" className="h-10 w-auto" alt="Preferred Vending" />
//                 <span className="text-xl font-semibold text-white">Preferred Vending</span>
//               </div>
//               <p className="text-gray-400">
//                 Leading innovation in automated retail solutions since 2020
//               </p>
//               <div className="flex gap-4">
//                 {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
//                   <motion.a
//                     key={social}
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors"
//                     whileHover={{ scale: 1.1 }}
//                   >
//                     <img 
//                       src={`/icons/${social}.svg`} 
//                       className="h-6 w-6" 
//                       alt={social} 
//                     />
//                   </motion.a>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h4 className="text-white font-semibold mb-4">Solutions</h4>
//               {['Smart Vending', 'Inventory Management', 'Payment Systems', 'Analytics Platform'].map((item) => (
//                 <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors">
//                   {item}
//                 </a>
//               ))}
//             </div>

//             <div className="space-y-4">
//               <h4 className="text-white font-semibold mb-4">Company</h4>
//               {['About Us', 'Careers', 'Newsroom', 'Contact'].map((item) => (
//                 <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors">
//                   {item}
//                 </a>
//               ))}
//             </div>

//             <div className="space-y-4">
//               <h4 className="text-white font-semibold mb-4">Legal</h4>
//               {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Compliance'].map((item) => (
//                 <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors">
//                   {item}
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
//             <p>© 2024 Preferred Vending. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       {/* Floating Chat Button */}
//       <motion.div 
//         className="fixed bottom-8 right-8 z-50"
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 1 }}
//       >
//         <div className="relative">
//           <button className="p-4 bg-primary-600 text-white rounded-full shadow-2xl hover:bg-primary-700 transition-all transform hover:scale-110">
//             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//           </button>
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
//             1
//           </span>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default HomePage;


// // src/pages/HomePage.js
// import { FiCheckCircle, FiChevronRight, FiPlay, FiSettings, FiShoppingCart, FiStar, FiZap, FiMoon, FiSun, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Helmet } from 'react-helmet-async';
// import ReactPlayer from 'react-player';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectCreative } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-creative';

// function HomePage() {
//   const [isDark, setIsDark] = useState(() => {
//     return localStorage.getItem('theme') === 'dark' || 
//            window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });
  
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

//   useEffect(() => {
//     if (isDark) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [isDark]);

//   const features = [
//     { icon: <FiZap />, title: "Instant Service", text: "AI-powered quick response system" },
//     { icon: <FiShoppingCart />, title: "Smart Inventory", text: "Real-time stock monitoring" },
//     { icon: <FiStar />, title: "Premium Quality", text: "Commercial-grade components" },
//     { icon: <FiSettings />, title: "Remote Control", text: "Cloud-based management" }
//   ];

//   const navLinks = [
//     { name: 'Products', href: '/products' },
//     { name: 'Solutions', href: '/solutions' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
//       <Helmet>
//         <title>Next-Gen Vending Solutions | Preferred Vending</title>
//       </Helmet>

//       {/* Scroll Progress Indicator */}
//       <motion.div
//         className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-400 to-primary-600 z-50"
//         style={{ scaleX: scrollYProgress }}
//       />

//       {/* Navigation */}
//       <motion.nav className="fixed w-full z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
//               <img 
//                 src="/logo.svg" 
//                 className="h-12 w-auto dark:invert" 
//                 alt="Premium Vending Solutions" 
//               />
//               <span className="text-2xl font-bold gradient-text">
//                 Green<span className="font-light">Vend</span>
//               </span>
//             </motion.div>
            
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
            
//             <div className="flex items-center gap-4">
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
//                 className="px-6 py-2.5 bg-primary-600 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <FiShoppingCart /> Get Started
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Hero Section */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 dark:from-primary-900/40 dark:to-primary-800/40" />
        
//         <motion.div 
//           className="relative z-10 text-center px-4 space-y-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
//             Sustainable
//             <span className="block mt-4 gradient-text">
//               Vending Innovation
//             </span>
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Eco-friendly smart retail systems powered by AI and IoT
//           </p>
//           <div className="flex justify-center gap-4">
//             <motion.button
//               className="px-8 py-4 bg-primary-600 text-white rounded-xl flex items-center gap-2 shadow-2xl hover:shadow-3xl hover:bg-primary-700 transition-all"
//               whileHover={{ scale: 1.05 }}
//             >
//               <FiPlay /> Watch Demo
//             </motion.button>
//             <motion.button
//               className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all gradient-border"
//               whileHover={{ scale: 1.05 }}
//             >
//               Explore Features
//             </motion.button>
//           </div>
//         </motion.div>
//       </section>

//       {/* Features Grid */}
//       <section className="py-24 bg-white dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <div className="space-y-8">
//               <h2 className="text-4xl font-bold gradient-text">
//                 Smart Retail Ecosystem
//               </h2>
//               <div className="grid grid-cols-2 gap-6">
//                 {features.map((feature, index) => (
//                   <motion.div
//                     key={feature.title}
//                     className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group border border-transparent hover:border-primary-100 dark:hover:border-primary-900"
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                   >
//                     <div className="text-primary-600 dark:text-primary-400 text-3xl mb-4 transition-colors">
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
//                 alt="Smart interface"
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modern Footer */}
//       <footer className="bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferred Vending</h3>
//               <p className="text-sm">Innovating sustainable vending solutions through cutting-edge technology.</p>
//               <div className="flex items-center gap-2">
//                 <FiMapPin className="text-primary-600" />
//                 <span>123 Green Street, Eco City</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiPhone className="text-primary-600" />
//                 <span>+1 (555) 123-4567</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <FiMail className="text-primary-600" />
//                 <span>info@Preferred Vending.com</span>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h3>
//               <ul className="space-y-2">
//                 {['Smart Vending', 'Inventory System', 'Mobile App', 'Analytics'].map((item) => (
//                   <li key={item}>
//                     <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
//               <ul className="space-y-2">
//                 {['About Us', 'Careers', 'Blog', 'Partners'].map((item) => (
//                   <li key={item}>
//                     <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Legal</h3>
//               <ul className="space-y-2">
//                 {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'FAQs'].map((item) => (
//                   <li key={item}>
//                     <a href="/" className="hover:text-primary-600 transition-colors">{item}</a>
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
  FiPlay,
  FiSettings,
  FiShoppingCart,
  FiStar,
  FiZap,
  FiMoon,
  FiSun,
  FiMapPin,
  FiPhone,
  FiMail
} from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import ReactPlayer from 'react-player';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

function HomePage() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
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

  const features = [
    { icon: <FiZap />, title: 'Instant Service', text: 'AI-powered quick response system' },
    { icon: <FiShoppingCart />, title: 'Smart Inventory', text: 'Real-time stock monitoring' },
    { icon: <FiStar />, title: 'Premium Quality', text: 'Commercial-grade components' },
    { icon: <FiSettings />, title: 'Remote Control', text: 'Cloud-based management' }
  ];

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Next-Gen Vending Solutions | Preferred Vending</title>
      </Helmet>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <motion.nav className="fixed w-full z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              <img 
                src="/logo.svg" 
                className="h-12 w-auto dark:invert" 
                alt="GreenVend Logo" 
              />
              <span className="text-2xl font-bold gradient-text">
                Green<span className="font-light">Vend</span>
              </span>
            </motion.div>
            
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
            
            <div className="flex items-center gap-4">
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
            Intelligent
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              Vending Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Next-generation smart retail systems powered by AI and IoT
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl flex items-center gap-2 shadow-2xl hover:shadow-3xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <FiPlay /> Watch Demo
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Explore Features
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                Smart Retail Ecosystem
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-primary-600 dark:text-primary-400 text-3xl mb-4 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right side image */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
              <img
                src="https://via.placeholder.com/800x600.png?text=Smart+Vending+Interface"
                alt="Smart interface"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 text-gray-600 dark:text-gray-400">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GreenVend</h3>
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
                <span>info@greenvend.com</span>
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
              © 2024 GreenVend. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;