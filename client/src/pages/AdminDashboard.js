// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle } from 'react-icons/fi';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiChevronRight, FiPlay, FiSettings, FiShoppingCart, FiStar, FiZap } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
// Correct imports for Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // fetch products
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, res.data]);
      setNewProduct({ name: '', category: '', price: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl mb-4">Admin Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white">
          Logout
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl mb-2">Create New Product</h2>
        <form onSubmit={handleCreate} className="flex gap-2">
          <input 
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="p-2 border"
            required
          />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="p-2 border"
            required
          >
            <option value="">Select Category</option>
            <option value="snacks">Snacks</option>
            <option value="drinks">Drinks</option>
            <option value="healthy">Healthy</option>
          </select>
          <input 
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="p-2 border"
            required
          />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white">
            Create
          </button>
        </form>
      </div>

      <h2 className="text-2xl mb-2">All Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id} className="flex justify-between border-b py-2">
            {p.name} - {p.category} - ${p.price}
            <button
              onClick={() => handleDelete(p._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
