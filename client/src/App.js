// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';  // ✅ Import this

// Import pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import TechnologyPage from './pages/TechnologyPage';
import SolutionsPage from './pages/SolutionsPage';
import FAQPage from './pages/FAQPage';
import HomeEdit from './pages/HomeEdit';



function App() {
  return (
    <HelmetProvider>  {/* ✅ Wrap the entire app */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/Solutions" element={<SolutionsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/admin/edit-home" element={<HomeEdit />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
