import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from './Footer';
import { 
  FiCheckCircle, FiSettings, FiShoppingCart, FiZap, FiStar, 
  FiClock, FiUsers, FiAward, FiMapPin, FiMail, FiPhone, 
  FiMoon, FiSun, FiTruck, FiShield, FiPieChart, FiLayers, FiMenu
} from 'react-icons/fi';



// Default content if Firebase is empty
const DEFAULT_CONTENT = {
  meta: {
    title: "Our Services - Preferred Vending",
    description: "Explore Preferred Vending's comprehensive vending services from installation to maintenance."
  },
  hero: {
    title: "Comprehensive",
    subtitle: "From installation to maintenance, we provide end-to-end vending services tailored to your needs.",
    gradientText: "Vending Solutions"
  },
  services: [
    {
      title: "Machine Installation",
      description: "Professional installation of state-of-the-art vending machines tailored to your space.",
      iconName: "FiSettings",
      features: ["Custom placement", "Energy-efficient setup", "24/7 monitoring"]
    },
    {
      title: "Maintenance & Restocking",
      description: "Regular maintenance and timely restocking to ensure seamless operations.",
      iconName: "FiShoppingCart",
      features: ["Scheduled maintenance", "Real-time inventory tracking", "Eco-friendly packaging"]
    },
    {
      title: "Flexible Machine Placement",
      description: "Adaptable solutions for any location, from offices to public spaces.",
      iconName: "FiMapPin",
      features: ["Space optimization", "Custom branding", "Remote management"]
    }
  ],
  whyChooseUs: {
    title: "Why Choose Preferred Vending?",
    items: [
      {
        title: "Proven Expertise",
        description: "10+ years of industry experience",
        iconName: "FiStar"
      },
      {
        title: "Eco-Friendly",
        description: "Sustainable solutions for a greener future",
        iconName: "FiZap"
      },
      {
        title: "Client-Centric",
        description: "Tailored solutions for every business",
        iconName: "FiUsers"
      }
    ]
  },
  stats: [
    { value: "500+", label: "Machines Installed", iconName: "FiTruck" },
    { value: "99.9%", label: "Uptime Guarantee", iconName: "FiShield" },
    { value: "85%", label: "Client Retention", iconName: "FiPieChart" },
    { value: "24/7", label: "Support Available", iconName: "FiClock" }
  ],
  testimonials: [
    {
      quote: "Preferred Vending transformed our break room experience with their reliable service.",
      author: "Sarah Johnson",
      role: "Office Manager, TechCorp"
    },
    {
      quote: "The maintenance team is always punctual and professional. Highly recommend!",
      author: "Michael Chen",
      role: "Facility Director, Urban Spaces"
    }
  ]
};

// Icon mapping
const iconComponents = {
  FiSettings, FiShoppingCart, FiMapPin, FiStar, FiZap, FiUsers,
  FiAward, FiClock, FiCheckCircle, FiTruck, FiShield, FiPieChart, FiLayers
};

function ServicesPage() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Technology', href: '/technology' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/FAQ' },
    { name: 'Contact', href: '/contact' }
  ];  

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const contentSnap = await getDoc(doc(db, 'content', 'servicesPage'));
        if (contentSnap.exists()) {
          setContent({ ...DEFAULT_CONTENT, ...contentSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Helmet>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Helmet>

      {/* Navbar */}
      <motion.nav className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
              <span className="text-2xl font-bold gradient-text">
                Preferred <span className="font-light">Vending</span>
              </span>
            </motion.div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiMenu className="text-xl text-gray-600 dark:text-gray-300" />
            </button>

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
                <FaCheck /> Get Started
              </motion.button>
            </div>
          </div>

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


      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-heading font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {content.hero.title}
            <span className="block mt-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              {content.hero.gradientText}
            </span>
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {content.services.map((service, index) => {
              const IconComponent = iconComponents[service.iconName] || FiSettings;
              return (
                <motion.div
                  key={index}
                  className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-transparent hover:border-primary-100 dark:hover:border-primary-900"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-center mb-6">
                    <IconComponent className="text-4xl text-primary-600 mx-auto" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3">
                        <FiCheckCircle className="text-primary-600 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => {
              const IconComponent = iconComponents[stat.iconName] || FiAward;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className="text-3xl text-primary-600" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">
            {content.whyChooseUs.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content.whyChooseUs.items.map((item, index) => {
              const IconComponent = iconComponents[item.iconName] || FiStar;
              return (
                <motion.div
                  key={index}
                  className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="mb-4">
                    <IconComponent className="text-4xl text-primary-600 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-primary-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <blockquote className="text-lg italic text-gray-600 dark:text-gray-300 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="font-medium text-gray-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ServicesPage;