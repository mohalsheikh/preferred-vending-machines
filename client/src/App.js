// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import TechnologyPage from './pages/TechnologyPage';
import SolutionsPage from './pages/SolutionsPage';
import FAQPage from './pages/FAQPage';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminFAQs from './pages/admin/FAQs';
import AdminMessages from './pages/admin/Messages';
import HomeEdit from './pages/admin/HomeEdit';
import SiteSettings from './pages/admin/Settings';
import TechnologyEdit from './pages/admin/TechnologyEdit';


// Our custom hook that loads theme from Firestore on startup
import { useSiteSettings } from './hooks/useSiteSettings';

// Admin Layout (for protected routes)
import AdminLayout from './pages/admin/layout/AdminLayout';

function App() {
  // This ensures the custom theme variables are fetched & applied on app load
  useSiteSettings();

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/faq" element={<FAQPage />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/faqs" element={<AdminFAQs />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/edit-home" element={<HomeEdit />} />
            <Route path="/admin/site-settings" element={<SiteSettings />} />
            <Route path="/admin/technology" element={<TechnologyEdit />} />

          
          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Protected Admin Routes */}
          <Route element={<AdminLayout />}>

          </Route>

          {/* 404 Page (you might want to add this) */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;