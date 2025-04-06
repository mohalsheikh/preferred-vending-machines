import React, { useEffect } from 'react';
import { FiCheck, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

const Toast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheck className="text-green-500" />;
      case 'error':
        return <FiAlertTriangle className="text-red-500" />;
      case 'warning':
        return <FiAlertTriangle className="text-yellow-500" />;
      default:
        return <FiInfo className="text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900';
      case 'error':
        return 'bg-red-100 dark:bg-red-900';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900';
      default:
        return 'bg-blue-100 dark:bg-blue-900';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 ${getBgColor()} rounded-lg shadow-lg p-4 max-w-sm flex items-start gap-3 z-50`}>
      <div className="mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1 text-sm text-gray-800 dark:text-gray-200">
        {message}
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
      >
        <FiX className="text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
};

export default Toast;