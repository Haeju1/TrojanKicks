<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script type="text/babel">
class Products extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }
  async componentDidMount(){
    let data = await fetch('http://localhost:4000/api/products');
    let dataJson = await data.json();
    this.setState({
      products: dataJson
    });
    let products=this.state.products;
    console.log('Data: ')
    console.log(this.state.products);

  }
  render(){
    let products = this.state.products;

    console.log(this.state.products);
    products=products.map((product,index)=>{
      console.log('name '+product.name);
      return(
        <div key={index} className="product">
            <img src={product.photoURL}></img>
            <div className="item_details">
            <h1 className="name">{product.name}</h1>
            <h1 className="price">${product.price}</h1>
            <h1 className="stock">Stock: {product.stock}</h1>
            </div>

        </div>
      );
    });
    return(
      <div className="app-content">
        <h3>{products}</h3>
      </div>
    )
  }
}
ReactDOM.render(<Products />,document.getElementById('listings'));
</script>
