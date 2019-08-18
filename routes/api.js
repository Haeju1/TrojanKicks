const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const fetch = require("node-fetch");
const User = require('../models/user');
const Product = require('../models/products');
const Order = require('../models/order');


// Initializing the client_secret
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Ady7_-Q1W5Q9yTtJeRSjM3LF-YPXyKe0IjXCBeRwO3HtdLVmtMbV0TI5OHFr0IQIedjCgYiMTnIWEwO9',
  'client_secret': 'ECGP6KeDrv0yAe1YInByJVRABnhzA7J32Ry80TurCEvMdBIt_kFAeQdhReHHOwIK5wF3EfJxeuNnSrPq'
});

// Get list of products from the db
router.get('/products', async (req,res,next) => {
  const result = await Product.find({});
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
        "return_url": "https://trojankicks.herokuapp.com/api/success",
        "cancel_url": "https://trojankicks.herokuapp.com/api/cancel"
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
paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) =>{
    if (error) {
        console.log('failed')
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));

        // Storing transaction details into database
        await Order.create({
          payId: payment.id,
          payer:{
              payment_method: payment.payer.payment_method,
              payer_info:{
                 email: payment.payer.payer_info.email,
                 first_name: payment.payer.payer_info.first_name,
                 last_name: payment.payer.payer_info.last_name,
                 payer_id: payment.payer.payer_info.payer_id,
                 shipping_address:{
                    recipient_name: payment.payer.payer_info.shipping_address.recipient_name,
                    line1: payment.payer.payer_info.shipping_address.line1,
                    city: payment.payer.payer_info.shipping_address.city,
                    state: payment.payer.payer_info.shipping_address.state,
                    postal_code: payment.payer.payer_info.shipping_address.postal_code,
                    country_code: payment.payer.payer_info.shipping_address.country_code
                 }
              }
           },
           product:{
             product_name: payment.transactions[0].item_list.items[0].name,
             price: payment.transactions[0].amount.total,
             currency: payment.transactions[0].amount.currency
           }
        });

        res.redirect('https://trojankicks.herokuapp.com');
    }
  });
});

// Adding order to databse
/*router.post('/orders', (req,res) =>{
  let paymentId = req.query._paymentId;
  console.log("Order: " + paymentId + " receieved");
  res.send("Order: " + paymentId + " receieved");
})*/
// If user cancels payment
router.get('/cancel', (req,res) => {
  res.send('Purchase cancelled');
});

module.exports = router;
