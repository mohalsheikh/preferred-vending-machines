// src/pages/admin/Messages.js
import React, { useState, useEffect } from 'react';
import { FiTrash } from 'react-icons/fi';
import AdminLayout from './layout/AdminLayout';
import { 
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../../firebase';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'contactMessages'));
        const loadedMsgs = [];
        snapshot.forEach((docSnap) => {
          loadedMsgs.push({ id: docSnap.id, ...docSnap.data() });
        });
        setMessages(loadedMsgs);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, []);

  const handleDelete = async (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'contactMessages', messageId));
        setMessages(messages.filter(m => m.id !== messageId));
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  return (
    <AdminLayout title="Messages">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Form Messages</h2>
        </div>

        {messages.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No messages yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">{msg.name}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({msg.email})</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      {msg.message}
                    </p>
                    <small className="text-gray-500 dark:text-gray-400 block mt-2">
                      Submitted: {msg.createdAt}
                    </small>
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                    title="Delete message"
                  >
                    <FiTrash className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Messages;