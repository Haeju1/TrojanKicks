const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  payId: String,
  payer:{
      payment_method: String,
      payer_info:{
         email: String,
         first_name: String,
         last_name: String,
         payer_id: String,
         shipping_address:{
            recipient_name: String,
            line1: String,
            city: String,
            state: String,
            postal_code: String,
            country_code: String
         }
      }
   },
   product:{
     product_name: String,
     price: Number,
     currency: String
   }
});

// will be in the 'product' collection
const order = mongoose.model('order', orderSchema);

module.exports = order;
