const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
mongoose.set('useFindAndModify', false);
const Product = require('./models/products');
// Set up express app/instance
const app = express();
app.use(cors({origin: '*'}));
// Connect to mongoDB and sets to ES6 promise
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, (err) =>{
    if(!err){
      console.log('Connection has been made successfully to mongoDB');
    }
    else{
      console.log('Connection error for mongoDB:', err);
    }
});
mongoose.Promise = global.Promise;

app.use(express.static('./public'));
app.use(express.json());

// Intialize the routes with /api route
app.use('/api', routes);

// error handling middleware
app.use((err,req,res,next)=>{
  //console.log(err);
  res.status(422).send({error: err});
});

// listen for requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('now listening for requests from port: ' + port);
});
