const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// ES6 PROMISES
mongoose.Promise = global.Promise;
// Connect to the db before testing
before((done)=>{
  // Connect to mongoDB
  mongoose.connect('mongodb://localhost:27017/TrojanKicks', { useNewUrlParser: true }, (err) =>{
    if(!err){
      console.log('Connection has been made successfully');
      done();
    }
    else{
      console.log('Conneciton error:', err);
    }
  });
});

// Drop the product collection before each test
beforeEach((done)=>{
  // Drop the collection
  mongoose.connection.collections.products.drop(()=>{
    done();
  });
});
