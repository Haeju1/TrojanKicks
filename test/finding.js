const assert = require('assert');
const product = require('../models/products')
// Describe tests
describe('Finding records', ()=>{

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
  it('Finds one record from databse', async()=>{
    const result = await product.findOne({
      name: "OFF-White Presto White"
    });
    assert(result.name==='OFF-White Presto White');
  });

  // Find by ID
  it('Finds record by ID from database', async()=>{
    const result = await product.findOne({
      _id: result1._id
    });
    assert(result._id.toString() === result1._id.toString());
  });
});
