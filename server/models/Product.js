// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // 'snacks', 'drinks', or 'healthy'
  price: { type: Number, required: true },
  imageUrl: { type: String }, // optional
});

module.exports = mongoose.model('Product', ProductSchema);
