const product = require('./models/products.js');

product.find({}).forEach((result)=>{
  var img = document.createElement('img');
  img.src = "https://stockx-360.imgix.net/Nike-Air-Presto-Off-White-Black-2018/Images/Nike-Air-Presto-Off-White-Black-2018/Lv2/img02.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1538080256";
  img.width= "200px";
  img.height= "auto";
  const element = document.getElementById('listings');
  element.appendChild(img);
});

let thing = document.getElementById('pic');
pic.src="https://stockx-360.imgix.net/Nike-Air-Presto-Off-White-Black-2018/Images/Nike-Air-Presto-Off-White-Black-2018/Lv2/img02.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1538080256";
