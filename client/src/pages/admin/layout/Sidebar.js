// src/pages/admin/layout/Sidebar.js
import React from 'react';
import { motion } from 'framer-motion'; // Add this import
import { FiChevronDown, FiChevronUp, FiLogOut } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiGrid,
  FiShoppingBag,
  FiHelpCircle,
  FiMessageSquare,
  FiHome,
  FiSettings
} from 'react-icons/fi';

const adminNavLinks = [
  { name: 'Dashboard', href: '/admin', icon: <FiGrid /> },
  { name: 'Products', href: '/admin/products', icon: <FiShoppingBag /> },
  { name: 'FAQs', href: '/admin/faqs', icon: <FiHelpCircle /> },
  { name: 'Messages', href: '/admin/messages', icon: <FiMessageSquare /> },
  { name: 'Edit Homepage', href: '/admin/edit-home', icon: <FiHome /> },
  { name: 'Settings', href: '/admin/settings', icon: <FiSettings /> }
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <motion.div // This is now properly imported
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 fixed h-full z-20`}
      initial={{ x: 0 }}
      animate={{ x: 0 }}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        {isSidebarOpen ? (
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold gradient-text">
              PV <span className="font-light">Admin</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <span className="text-xl font-bold">PV</span>
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isSidebarOpen ? (
            <FiChevronDown className="transform rotate-90 text-gray-600 dark:text-gray-300" />
          ) : (
            <FiChevronUp className="transform rotate-90 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {adminNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 ${
                location.pathname === link.href 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-lg mr-3">{link.icon}</span>
              {isSidebarOpen && link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/admin/logout"
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          <FiLogOut className="mr-2" />
          {isSidebarOpen && 'Logout'}
        </Link>
      </div>
    </motion.div>
  );
};

export default Sidebar;