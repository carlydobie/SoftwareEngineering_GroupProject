import '../css/App.css'
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/customerNav.js';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
/*
 *  Shopping Cart Page for Customer's Selected Products
 */

function ShoppingCart() {

  //pull in state from redux
  const cart = useSelector(state => state.cart.cart);
  const cartTotal = useSelector(state => state.cart.total);
  const cartWeight = useSelector(state => state.cart.weight);
  const brackets = useSelector(state => state.shipping.brackets);

  //function to calculate shipping charges based on the total
  //weight of products in the cart, returns the S/H charge
  function calcShipping(){
      console.log(cartWeight);
      let shipping;
      brackets.map(element => {
          if(cartWeight >= element.minWeight && cartWeight < element.maxWeight){
              shipping = element.charge;
          }
      })
      return shipping;
  }
  
  //If the user has added anything to their cart, a list of the items will 
  //display, otherwise an empty cart message
  const displayCart = () => {
      //cart is empty
      if(cart.length == 0){
          return (
              <Typography>
                  Nothing in Your Cart Yet!
              </Typography>
          )
      }else{
          //cart is not empty, show all items in a table followed by calculated totals, and submit order button
          return (
              <div>
                <div style={{height: 400}}>
                     <DataGrid 
                        columns={[
                                    { field: "id", headerName: "part number", width: 200 }, 
                                    { field: "description", width: 200 }, 
                                    { field: "price"}, {field: "weight"}, 
                                    { field: "qty"} , {field: "total", valueGetter: (params)=> `${params.getValue('price') }`*`${params.getValue('qty')}` }
                                ]} 
                        rows={cart} 
                        pageSize={10} 
                      />  
                </div>
                <Typography>Cart Total: ${cartTotal}</Typography>
                <Typography>Shipping & Handling: ${calcShipping()}</Typography>
                <Typography>Grand Total: ${cartTotal + calcShipping()}</Typography>
                {/**submit order modal button will go here */}
              </div>
          )
      }
  }

  //cart page
  return (
    <div className="App">
    <Navbar/>
        <div>
            <Typography>
                Your Cart
            </Typography>
            <div style={{ width: '70%', marginLeft: '15%',}}> 
                {displayCart()}
            </div>
        </div>
    </div>
  );
}

export default ShoppingCart;