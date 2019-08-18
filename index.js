const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.set('useFindAndModify', false);
// Set up express app/instance
const app = express();
app.use(cors({origin: '*'}));
// Connect to mongoDB and sets to ES6 promise
mongoose.connect('mongodb://localhost:27017/TrojanKicks', { useNewUrlParser: true }, (err) =>{
    if(!err){
      console.log('Connection has been made successfully');
    }
    else{
      console.log('Connection error:', err);
    }
});
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(express.json());

// Intialize the routes with /api route
app.use('/api', routes);

// error handling middleware
app.use((err,req,res,next)=>{
  //console.log(err);
  res.status(422).send({error: 'noi'});
});


/*app.get('/api', (req,res) => {
  console.log('GET request');
  res.send({name: 'Haeju Jeong'});
});*/

// listen for requests
app.listen(process.env.port || 4000, () => {
  console.log('now listening for requests from ' );
});

/*$(document).ready(() => {
  $('#product1').on('mouseover', () =>{
    $('#shoe1').animate({
      width: '300px',
      height: 'auto',

    }, 60)
    //$('#presto1').hide();
  })
  $('#product1').on('mouseleave', () =>{
    $('#shoe1').animate({
      width: '200px',
      height: 'auto',

    }, 60)
  })


  $('#product2').on('mouseover', () =>{
    $('#shoe2').animate({
      width: '300px',
      height: 'auto',

    }, 60)
    //$('#presto1').hide();
  })
  $('#product2').on('mouseleave', () =>{
    $('#shoe2').animate({
      width: '200px',
      height: 'auto',

    }, 60)
  })


  $('#product3').on('mouseover', () =>{
    $('#shoe3').animate({
      width: '300px',
      height: 'auto',

    }, 60)
    //$('#presto1').hide();
  })
  $('#product3').on('mouseleave', () =>{
    $('#shoe3').animate({
      width: '200px',
      height: 'auto',

    }, 60)
  })


  $('#product4').on('mouseover', () =>{
    $('#shoe4').animate({
      width: '300px',
      height: 'auto',

    }, 60)
    //$('#presto1').hide();
  })
  $('#product4').on('mouseleave', () =>{
    $('#shoe4').animate({
      width: '200px',
      height: 'auto',

    }, 60)
  })
});*/
