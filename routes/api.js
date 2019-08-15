const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/products');


// Get list of products from the db
router.get('/products', async (req,res,next) => {
  const result = await Product.find({});
  console.log('sent to products');
  res.send(result);
});


// Add a new user to the db
router.post('/users', async (req,res,next) => {
  console.log('sent to users');
  User.create(req.body).then((user)=>{
    res.send(result);
  }).catch(next);
});

// Update a product from the db
router.put('/users/:id', async (req,res,next) => {
  const result = await User.findByIdAndUpdate({_id: req.params.id},req.body);
  const finalResult = await User.findOne({_id: req.params.id});
  res.send(finalResult);
});

// Delete a product from the db
router.delete('/users/:id', async (req,res,next) => {
  const result = await User.findByIdAndRemove({_id: req.params.id});
  res.send(result);
});

module.exports = router;
