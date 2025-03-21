// src/pages/ProductsPage.js
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

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch products from backend
    axios.get('/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter logic
  const filteredProducts = products.filter((p) =>
    filter === 'all' ? true : p.category === filter
  );

  return (
    <div className="p-8">
      <Helmet>
        <title>Products - Preferred Vending Machines</title>
      </Helmet>
      <h1 className="text-3xl mb-4">Our Products</h1>

      <div className="mb-4">
        <button className="mr-2 px-4 py-2 bg-green-600 text-white" onClick={() => setFilter('all')}>
          All
        </button>
        <button className="mr-2 px-4 py-2 bg-green-600 text-white" onClick={() => setFilter('snacks')}>
          Snacks
        </button>
        <button className="mr-2 px-4 py-2 bg-green-600 text-white" onClick={() => setFilter('drinks')}>
          Drinks
        </button>
        <button className="px-4 py-2 bg-green-600 text-white" onClick={() => setFilter('healthy')}>
          Healthy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;

