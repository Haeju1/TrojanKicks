const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  size: Number,
  stock: Number,
  photoURL: String
});

// will be in the 'product' collection
const product = mongoose.model('product', productSchema);

module.exports = product;
