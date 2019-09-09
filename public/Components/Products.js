import React from "react";

const Products = React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }
  async componentDidMount(){
    console.log('Before trying to get products');
    let data = await fetch('https://trojankicks.herokuapp.com/api/product');
    let dataJson = await data.json();
    this.setState({
      products: dataJson
    });
    let products=this.state.products;
  }
  render(){
    let products = this.state.products;
    console.log(this.state.products);
    products=products.map((product,index)=>{
      console.log('name '+product.name);
      let purchaseLink ='https://trojankicks.herokuapp.com/api/pay?_id='+product._id;
      return(
        <div key={product._id} className="product">
            <img src={product.photoURL}></img>
            <div className="item_details">
              <div className="w3-container w3-white">
                <h1 className="name">{product.name}</h1>
                <h1 className="name">Size {product.size}</h1>
                <h1 className="price">${product.price}</h1>
                <form className="w3-container w3-white" action={purchaseLink} method='post'>
                  <input type="image" id="paypal_button"src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-small.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"></input>
                </form>
              </div>
            </div>
        </div>
      );
    });
    return(
      <div className="listings">
        <h3>{products}</h3>
      </div>
    )
  }
}
export default Products;
