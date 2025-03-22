// // src/pages/AboutPage.js
// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Helmet } from 'react-helmet-async';


// import {
//   FiMoon,
//   FiSun,
//   FiShoppingCart,
//   FiZap,
//   FiStar,
//   FiSettings,
//   FiChevronRight,
// } from 'react-icons/fi';

// // Swiper (if you need it elsewhere on this page, otherwise remove)
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, EffectCreative } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-creative';

// function AboutPage() {
//   const [isDark, setIsDark] = useState(() =>
//     localStorage.getItem('theme') === 'dark' ||
//     window.matchMedia('(prefers-color-scheme: dark)').matches
//   );
  
//   // Framer motion scroll progress
//   const { scrollYProgress } = useScroll();
//   const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

//   // Sync theme preference with localStorage
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
//       {/* Helmet for SEO */}
//       <Helmet>
//         <title>About Us - Preferred Vending Machines</title>
//         <meta
//           name="description"
//           content="Learn more about Preferred Vending Machines' mission, history, and values."
//         />
//       </Helmet>

//       {/* Scroll Progress Indicator */}
//       <motion.div
//         className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-600 to-primary-700 z-50"
//         style={{ scaleX: scrollYProgress }}
//       />

//       {/* Navigation (same style as HomePage) */}
//       <motion.nav className="fixed w-full z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//           {/* Logo & Brand */}
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="flex items-center gap-2 cursor-pointer"
//           >
//             <img
//               src="/logo.svg"
//               className="h-14 w-auto dark:invert"
//               alt="Premium Vending Solutions"
//             />
//             <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
//               VEND<span className="font-light">Vending</span>
//             </span>
//           </motion.div>

//           {/* Nav Links + Actions */}
//           <div className="flex items-center gap-6">
//             {/* Desktop Nav */}
//             <ul className="hidden md:flex items-center gap-6">
//               <li>
//                 <a
//                   href="/"
//                   className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/products"
//                   className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                 >
//                   Products
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/pricing"
//                   className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                 >
//                   Pricing
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/about"
//                   className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                 >
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/contact"
//                   className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
//                 >
//                   Contact
//                 </a>
//               </li>
//             </ul>

//             {/* Dark Mode Toggle */}
//             <motion.button
//               onClick={() => setIsDark(!isDark)}
//               className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//               whileHover={{ rotate: 15 }}
//             >
//               {isDark ? (
//                 <FiSun className="text-xl text-yellow-400" />
//               ) : (
//                 <FiMoon className="text-xl text-gray-600" />
//               )}
//             </motion.button>

//             {/* CTA Button (optional) */}
//             <motion.button
//               className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
//               whileHover={{ scale: 1.05 }}
//             >
//               <FiShoppingCart /> Get Started
//             </motion.button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Hero/Intro Section for About Page */}
//       <section className="relative flex items-center justify-center h-80 md:h-96 overflow-hidden mt-[76px]">
//         {/* Simple background gradient overlay for hero */}
//         <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-700/20 dark:from-primary-700/30 dark:to-primary-900/30" />
//         <div className="relative z-10 text-center px-4">
//           <motion.h1
//             className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             About <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">Preferred Vending</span>
//           </motion.h1>
//           <motion.p
//             className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             Discover our journey, mission, and commitment to innovative vending solutions.
//           </motion.p>
//         </div>
//       </section>

//       {/* Main About Content */}
//       <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
//           {/* Our Story */}
//           <div className="space-y-6">
//             <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
//               Our Story
//             </h2>
//             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//               Preferred Vending Machines, operating under the brand Preferred Vending,” has been
//               providing top-notch vending services for over 10 years. We started with a simple
//               goal: to revolutionize the vending machine industry by integrating modern
//               technology, healthy product options, and exceptional customer support.
//             </p>
//           </div>

//           {/* Mission & Values */}
//           <div className="grid md:grid-cols-2 gap-12 items-start">
//             <div className="space-y-6">
//               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                 Our Mission
//               </h3>
//               <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                 Our mission is to deliver reliable, smart, and healthy vending solutions
//                 to businesses and communities worldwide. We strive to leverage AI, IoT,
//                 and data analytics to enhance consumer experiences and ensure maximum
//                 profitability for our partners.
//               </p>
//             </div>
//             <div className="space-y-6">
//               <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                 Our Values
//               </h3>
//               <ul className="space-y-2 text-gray-700 dark:text-gray-300">
//                 <li className="flex items-center gap-2">
//                   <FiZap className="text-primary-600 dark:text-primary-500" />
//                   Innovation
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <FiStar className="text-primary-600 dark:text-primary-500" />
//                   Quality
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <FiSettings className="text-primary-600 dark:text-primary-500" />
//                   Reliability
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <FiShoppingCart className="text-primary-600 dark:text-primary-500" />
//                   Customer-centric
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Timeline / Milestones */}
//           <div className="space-y-6">
//             <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
//               Our Journey
//             </h3>
//             <div className="border-l border-gray-200 dark:border-gray-700 pl-6 space-y-8">
//               <div className="relative">
//                 <span className="absolute -left-3 top-1.5 bg-primary-600 text-white rounded-full p-2">
//                   2012
//                 </span>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   Founded by a small team passionate about automating retail for healthier snacks
//                   and drinks.
//                 </p>
//               </div>
//               <div className="relative">
//                 <span className="absolute -left-3 top-1.5 bg-primary-600 text-white rounded-full p-2">
//                   2015
//                 </span>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   Introduced AI-driven inventory management to reduce stock-outs by 40%.
//                 </p>
//               </div>
//               <div className="relative">
//                 <span className="absolute -left-3 top-1.5 bg-primary-600 text-white rounded-full p-2">
//                   2018
//                 </span>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   Expanded to international markets, supporting over 5,000 vending machines.
//                 </p>
//               </div>
//               <div className="relative">
//                 <span className="absolute -left-3 top-1.5 bg-primary-600 text-white rounded-full p-2">
//                   2023
//                 </span>
//                 <p className="text-gray-700 dark:text-gray-300">
//                   Launched next-gen IoT solutions with cloud-based analytics and remote control.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Interactive Chat Bubble (optional, for consistency) */}
//       <motion.div
//         className="fixed bottom-6 right-6 z-50"
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 1.5 }}
//       >
//         <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-72">
//           <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-3 rounded-full shadow-lg">
//             <FiShoppingCart className="text-xl" />
//           </div>
//           <div className="space-y-3">
//             <h3 className="font-semibold dark:text-white">Got questions?</h3>
//             <p className="text-sm text-gray-600 dark:text-gray-300">
//               Our AI assistant is ready to tell you more about us.
//             </p>
//             <button className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
//               Chat Now
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Footer (same style as HomePage) */}
//       <footer className="bg-gray-50 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 mt-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid md:grid-cols-4 gap-8 text-gray-700 dark:text-gray-200">
//             {/* Column 1: Company */}
//             <div>
//               <h3 className="text-lg font-semibold mb-3">Company</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a href="/about" className="hover:text-primary-500 transition-colors">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Press
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Column 2: Products */}
//             <div>
//               <h3 className="text-lg font-semibold mb-3">Products</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Vending Machines
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Smart Kiosks
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Mobile App
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Column 3: Resources */}
//             <div>
//               <h3 className="text-lg font-semibold mb-3">Resources</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Help Center
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Blog
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Webinars
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Column 4: Follow Us */}
//             <div>
//               <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Twitter
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     LinkedIn
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-primary-500 transition-colors">
//                     Instagram
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
//             <p className="text-gray-600 dark:text-gray-500">
//               © 2024 Preferred Vending. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default AboutPage;



// src/pages/AboutPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  FiCheckCircle, 
  FiClock, 
  FiUsers, 
  FiAward, 
  FiMapPin,
  FiZap,
  FiSettings,
  FiMoon, 
  FiSun,
  FiShoppingCart,
  FiMail,
  FiPhone
} from 'react-icons/fi';

function AboutPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO', exp: '15+ years in retail tech', img: 'https://via.placeholder.com/200' },
    { name: 'Michael Chen', role: 'CTO', exp: 'AI & IoT Specialist', img: 'https://via.placeholder.com/200' },
    { name: 'Emma Wilson', role: 'COO', exp: 'Operations Expert', img: 'https://via.placeholder.com/200' },
  ];

  const timeline = [
    { year: 2010, event: 'Company Founded', icon: <FiCheckCircle /> },
    { year: 2014, event: 'Launched Smart Vending 1.0', icon: <FiZap /> },
    { year: 2018, event: 'AI Integration Platform', icon: <FiSettings /> },
    { year: 2023, event: 'Global Expansion', icon: <FiMapPin /> },
  ];

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
        <title>About Us - Preferred Vending</title>
        <meta name="description" content="Discover Preferred Vending's commitment to sustainable vending innovation and our journey in smart retail technology" />
      </Helmet>

      {/* Navbar */}
      <motion.nav className="fixed w-full z-40 backdrop-blur-lg bg-white/90 dark:bg-gray-900/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              {/* <img 
                src="/logo.svg" 
                className="h-12 w-auto dark:invert" 
                alt="Preferred Vending Logo" 
              /> */}
              <span className="text-2xl font-bold gradient-text">
              Preferred <span className="font-light">Vending</span>
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
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Pioneering
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Sustainable Vending
            </span>
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            Revolutionizing retail automation through eco-friendly innovation and cutting-edge technology
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <FiClock className="text-4xl text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold dark:text-white mb-2">12+ Years</h3>
              <p className="text-gray-600 dark:text-gray-400">Of industry leadership in smart vending solutions</p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <FiUsers className="text-4xl text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold dark:text-white mb-2">500+ Clients</h3>
              <p className="text-gray-600 dark:text-gray-400">Serving businesses across 15 countries</p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              whileHover={{ y: -10 }}
            >
              <FiAward className="text-4xl text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold dark:text-white mb-2">28 Awards</h3>
              <p className="text-gray-600 dark:text-gray-400">Recognized for innovation and sustainability</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://via.placeholder.com/600x400.png?text=PreferredVendingprovides+Office" 
              alt="Our Office" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Our Sustainable Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              At Preferred Vending, we're committed to transforming the vending industry through:
            </p>
            <ul className="space-y-4">
              {['Carbon-neutral operations', 'Energy-efficient machines', 'Recyclable materials', 'Smart inventory reduction'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <FiCheckCircle className="text-primary-600 text-xl flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our Journey
          </h2>
          <div className="relative pl-8 space-y-10 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary-200 dark:before:bg-primary-900">
            {timeline.map((item, index) => (
              <motion.div 
                key={item.year}
                className="relative pl-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="absolute left-0 top-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.year}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {item.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member) => (
              <motion.div 
                key={member.name}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{member.exp}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-primary-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Join the Vending Revolution?
          </h2>
          <motion.button
            className="px-8 py-4 bg-white text-primary-600 rounded-xl flex items-center gap-2 shadow-2xl hover:shadow-3xl mx-auto transition-all"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/contact')}
          >
            Get Started Today
          </motion.button>
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

export default AboutPage;