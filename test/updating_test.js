const assert = require('assert');
const product = require('../models/products')

// Describe tests
describe('Updating records', ()=>{

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

  // Update one record
  it('Update one record from the database', async()=>{
    const find = await product.findOneAndUpdate({name:"OFF-White Presto White"}, {
      name: "OFF-White Presto Black"
    });
    const result = await product.findOne({_id: result1._id});
    assert(result.name  === "OFF-White Presto Black");
  });

  // Update one stock by 1
  it('Increments stock', async()=>{
    const incResult = await product.updateMany({}, {$inc: {stock: 1}});
    const endResult = await product.findOne({name: 'OFF-White Presto White'});

    assert(endResult.stock  === 2);
  });


});
