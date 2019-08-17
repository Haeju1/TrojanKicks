const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const User = require('../models/user');
const Product = require('../models/products');


// Initializing the client_secret
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Ady7_-Q1W5Q9yTtJeRSjM3LF-YPXyKe0IjXCBeRwO3HtdLVmtMbV0TI5OHFr0IQIedjCgYiMTnIWEwO9',
  'client_secret': 'ECGP6KeDrv0yAe1YInByJVRABnhzA7J32Ry80TurCEvMdBIt_kFAeQdhReHHOwIK5wF3EfJxeuNnSrPq'
});

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

// Buying product from paypal
router.post('/pay', async (req,res)=>{

  // Fetch product from mongoDB
  let product = await Product.findOne({
    _id: req.query._id
  });

  let create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:4000/api/success",
        "cancel_url": "http://localhost:4000/api/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": product.name,
                "sku": product._id,
                "price": product.price,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": product.price
        },
        "description": "You are purchasing " + product.name
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          for(let i=0;i<payment.links.length;i++){
            if(payment.links[i].rel==='approval_url'){
              console.log(payment.links[i].href);
              res.redirect(payment.links[i].href);
            }
          }
      }
  });
});

// If payment successful, execute
router.get('/success', async (req, res) => {

  console.log('Product ID: '+req.query._id);
  let payerId = req.query.PayerID;
  let paymentId = req.query.paymentId;
  console.log(req.query.paymentId);
  console.log(req.query.PayerId);


  let execute_payment_json = {
    "payer_id": payerId
    /*"transactions": [{
        "amount": {
            "currency": "USD",
            "total": 200.00
        }
    }]*/
  };
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    console.log('In the execute1s');
    if (error) {
        console.log('failed')
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.redirect('http://localhost:4000');
    }
  });
});

// If user cancels payment
router.get('/cancel', (req,res) => {
  res.send('Purchase cancelled');
});

module.exports = router;
