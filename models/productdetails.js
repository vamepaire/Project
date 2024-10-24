const mongoose = require("mongoose");

const productDB = mongoose.createConnection("mongodb://localhost:27017/Arghya");

const product_details = mongoose.Schema({
  business_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  image: {
    type: String,
    required: true,
  }
});

module.exports = productDB.model("product", product_details);