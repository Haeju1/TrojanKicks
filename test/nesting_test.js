const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/user');

// Describe our tests
describe('Nesting our records',()=>{

  var pat;
  // Create tests
  it('Cretes an author with sub-documents', async () =>{
    pat = new Author({
      name: 'Patrick Rothfuss',
      books: [{title: 'Name of the Wind', pages: 400}]
    })

    const savedResult = await pat.save();
    const recordResult = await Author.findOne({name: 'Patrick Rothfuss'});
    assert(recordResult.books.length === 1);
  })

  it('Adds a book to an author', async () =>{

    const recordResult = await Author.findOne({name: 'Patrick Rothfuss'});
    recordResult.books.push({title: "Wise Man's Fear ", pages: 500});
    recordResult.save();
  })
})
