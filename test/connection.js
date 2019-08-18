const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// ES6 PROMISES
mongoose.Promise = global.Promise;
// Connect to the db before testing
before((done)=>{
  // Connect to mongoDB
  mongoose.connect('mongodb+srv://Haeju:14174980@trojankickscluster-zqmpc.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) =>{
    if(!err){
      console.log('Connection has been made successfully to mongoDB in connection');
      done();
    }
    else{
      console.log('Conneciton error:', err);
    }
  });
});

// Drop the product collection before each test
/*
beforeEach((done)=>{
  // Drop the collection
  mongoose.connection.collections.products.drop(()=>{
    done();
  });
});
*/
