const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    index: true
  },

  category: {
    type: String,
    index: true
  },

  images: [
    {
      publicId: String,
      url: String
    }
  ],

  stock: {
    type: Number,
    default: 0
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
