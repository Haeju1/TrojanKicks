const assert = require('assert');
const product = require('../models/products')
// Describe tests
describe('Saving records', ()=>{

  // Create tests
  it('Saves a record to the databse', async ()=>{
    var product1 = new product({
      name : 'OFF-White Presto White',
      price: 900,
      size: 10,
      stock: 1,
      photoURL: 'https://stockx-360.imgix.net/Nike-Air-Presto-Off-White-White-2018/Images/Nike-Air-Presto-Off-White-White-2018/Lv2/img01.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1538080256'
    });

    const thing = await product1.save();
    assert(!thing.isNew);
  });
});
