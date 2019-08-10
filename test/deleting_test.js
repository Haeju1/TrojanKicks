const assert = require('assert');
const product = require('../models/products')
// Describe tests
describe('Deleting records', ()=>{

  var result1;
  beforeEach(async()=>{
    var product1 = new product({
      name : 'OFF-White Presto White',
      price: 900,
      size: 10,
      stock: 1,
      photoURL: 'https://stockx-360.imgix.net/Nike-Air-Presto-Off-White-White-2018/Images/Nike-Air-Presto-Off-White-White-2018/Lv2/img01.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1538080256'
    });

    result1 = await product1.save();
  });

  // Create tests



  it('Deletes one record from the database', async()=>{
    const find = await product.findOneAndDelete({name:"OFF-White Presto White"});
    const result = await product.findOne({name:"OFF-White Presto White"});
    assert(result === null);
});
});
