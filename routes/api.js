const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const fetch = require("node-fetch");
const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/products');
const Order = require('../models/order');
const sgMail = require('@sendgrid/mail');
const axios = require('axios');


require('dotenv').config();

// Initializing the client_secret
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.CLIENT_SECRET
});
// Get list of products from the db
router.get('/product', async (req,res,next) => {
  console.log('Hit the get request');
  const result = await Product.find({});
  console.log('Products:  ' + result)
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
        res.redirect('https://trojankicks.herokuapp.com/checkout.html');
        // axios.get('https://trojankicks.herokuapp.com/api/confirmation').then((response) => {
        //   if(response != null) {
        //     console.log('s');
        //     //route to next page?
        //   }
        // }).catch((err) => {
        //   console.log("Error");
        // })
    }
  });
});
router.get('https://trojankicks.herokuapp.com/api/confirmation', (req,res) =>{
  sgMail.setApiKey(process.env.LAVA_KEY);
  const msg = {
    to: 'haeju407@gmail.com',
    from: 'test@example.com',
    subject: 'Order Confirmed',
    text: 'Thank you!',
    html: '<strong>Thank you for your order! Shipping information will be sent soon!</strong>',
  };
  sgMail.send(msg);
  console.log(msg);
  console.log('ho');
  res.redirect('https://trojankicks.herokuapp.com/checkout.html');
})
// Adding order to databse
router.get('/orders', (req,res) =>{
  let paymentId = req.query._paymentId;
  console.log("Order: " + paymentId + " receieved");
  res.send("Order: " + paymentId + " receieved");
})
// If user cancels payment
router.get('/cancel', (req,res) => {
  res.send('Purchase cancelled');
});

module.exports = router;
