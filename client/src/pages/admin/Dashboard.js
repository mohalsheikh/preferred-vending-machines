// src/pages/admin/Dashboard.js
import React, { useState, useEffect } from 'react';
import { 
  FiShoppingBag, 
  FiHelpCircle, 
  FiMessageSquare, 
  FiUsers,
  FiShoppingCart,
  FiPlus,
  FiActivity,
  FiAlertTriangle
} from 'react-icons/fi';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  where
} from 'firebase/firestore';
import { db } from '../../firebase';
import AdminLayout from './layout/AdminLayout';

const ActivityItem = ({ activity }) => (
  <div className="flex items-start pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
    <div className={`p-2 rounded-lg mr-3 ${
      activity.type === 'add' ? 'bg-green-100 dark:bg-green-900' : 
      activity.type === 'update' ? 'bg-blue-100 dark:bg-blue-900' :
      'bg-gray-100 dark:bg-gray-700'
    }`}>
      <FiActivity className={
        activity.type === 'add' ? 'text-green-600 dark:text-green-300' : 
        activity.type === 'update' ? 'text-blue-600 dark:text-blue-300' :
        'text-gray-600 dark:text-gray-300'
      } />
    </div>
    <div className="flex-1">
      <div className="flex justify-between">
        <p className="font-medium text-gray-900 dark:text-white">
          {activity.action} <span className="text-primary-600 dark:text-primary-400">"{activity.item}"</span>
        </p>
        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">By {activity.user}</p>
    </div>
  </div>
);

const StatCard = ({ title, value, change, icon, color }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700`}>
    <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
    <div className="flex items-end justify-between mt-2">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      <span className={`text-xs font-medium ${
        color === 'green' ? 'text-green-500' :
        color === 'red' ? 'text-red-500' :
        color === 'purple' ? 'text-purple-500' :
        'text-blue-500'
      }`}>
        {change}
      </span>
    </div>
    <div className={`mt-3 p-2 rounded-lg w-10 h-10 flex items-center justify-center ${
      color === 'green' ? 'bg-green-100 dark:bg-green-900' :
      color === 'red' ? 'bg-red-100 dark:bg-red-900' :
      color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' :
      'bg-blue-100 dark:bg-blue-900'
    }`}>
      {React.cloneElement(icon, { 
        className: `text-xl ${
          color === 'green' ? 'text-green-600 dark:text-green-300' :
          color === 'red' ? 'text-red-600 dark:text-red-300' :
          color === 'purple' ? 'text-purple-600 dark:text-purple-300' :
          'text-blue-600 dark:text-blue-300'
        }`
      })}
    </div>
  </div>
);

const QuickActions = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
    <div className="grid grid-cols-2 gap-3">
      <a
        href="/admin/products/new"
        className="p-3 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-lg flex flex-col items-center transition-colors"
      >
        <FiPlus className="text-blue-600 dark:text-blue-300 text-xl mb-2" />
        <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Add Product</span>
      </a>
      <a
        href="/admin/faqs/new"
        className="p-3 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg flex flex-col items-center transition-colors"
      >
        <FiHelpCircle className="text-green-600 dark:text-green-300 text-xl mb-2" />
        <span className="text-sm font-medium text-green-600 dark:text-green-300">Add FAQ</span>
      </a>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    faqs: 0,
    messages: 0,
    lowStock: 0,
    visitors: 0,
    orders: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = [];
    
    const setupListeners = () => {
      try {
        // Products Listener
        const productsQuery = collection(db, 'products');
        const productsUnsub = onSnapshot(productsQuery, (snapshot) => {
          const lowStock = snapshot.docs.filter(doc => doc.data().stock < 10).length;
          setStats(prev => ({
            ...prev,
            products: snapshot.size,
            lowStock
          }));
        });
        unsubscribe.push(productsUnsub);

        // FAQs Listener
        const faqsUnsub = onSnapshot(collection(db, 'faqs'), (snapshot) => {
          setStats(prev => ({ ...prev, faqs: snapshot.size }));
        });
        unsubscribe.push(faqsUnsub);

        // Messages Listener
        const messagesQuery = query(
          collection(db, 'contactMessages'),
          where('status', '==', 'unread')
        );
        const messagesUnsub = onSnapshot(messagesQuery, (snapshot) => {
          setStats(prev => ({ ...prev, messages: snapshot.size }));
        });
        unsubscribe.push(messagesUnsub);

        // Activity Log Listener
        const activityQuery = query(
          collection(db, 'activityLog'),
          orderBy('timestamp', 'desc'),
          limit(5)
        );
        const activityUnsub = onSnapshot(activityQuery, (snapshot) => {
          const activities = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              action: data.action,
              item: data.itemName,
              user: data.userName,
              type: data.actionType,
              time: formatTimeAgo(data.timestamp?.toDate())
            };
          });
          setRecentActivity(activities);
        });
        unsubscribe.push(activityUnsub);

        // Visitors Listener (requires visitor tracking implementation)
        const visitorsUnsub = onSnapshot(collection(db, 'visitors'), (snapshot) => {
          setStats(prev => ({ ...prev, visitors: snapshot.size }));
        });
        unsubscribe.push(visitorsUnsub);

        // Orders Listener
        const ordersQuery = query(
          collection(db, 'orders'),
          where('status', '==', 'pending')
        );
        const ordersUnsub = onSnapshot(ordersQuery, (snapshot) => {
          setStats(prev => ({ ...prev, orders: snapshot.size }));
        });
        unsubscribe.push(ordersUnsub);

      } catch (error) {
        console.error("Error setting up listeners:", error);
      } finally {
        setLoading(false);
      }
    };

    setupListeners();

    return () => unsubscribe.forEach(unsub => unsub());
  }, []);

  const formatTimeAgo = (date) => {
    if (!date) return 'Just now';
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 ? `${interval} ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }
    return 'Just now';
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Products" 
          value={stats.products} 
          icon={<FiShoppingBag />} 
          color="blue"
        />
        <StatCard 
          title="Active FAQs" 
          value={stats.faqs} 
          icon={<FiHelpCircle />} 
          color="green"
        />
        <StatCard 
          title="New Messages" 
          value={stats.messages} 
          icon={<FiMessageSquare />} 
          color="purple"
        />
        <StatCard 
          title="Low Stock Items" 
          value={stats.lowStock} 
          change={stats.lowStock > 0 ? `${stats.lowStock} need attention` : 'All good'}
          icon={<FiAlertTriangle />} 
          color={stats.lowStock > 0 ? 'red' : 'green'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No recent activity
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              title="Monthly Visitors" 
              value={stats.visitors} 
              change="+12% from last month"
              icon={<FiUsers />}
              color="purple"
            />
            <StatCard 
              title="Pending Orders" 
              value={stats.orders} 
              change="+5 today"
              icon={<FiShoppingCart />}
              color="green"
            />
          </div>
          <QuickActions />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;