import '../css/App.css'
import React, { useState, useEffect } from 'react';
import Navbar from '../components/core/customerNav.js';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import OrderForm from '../components/orderForm';
import MaterialTable from 'material-table'
import { updateCart, removeItem } from '../redux/actions/cart';
import axios from 'axios'
/*
 *  Shopping Cart Page for Customer's Selected Products
 *  Customer can view the parts they have selected and 
 *  update quantities or remove items. They can see their
 *  order total and submit their order. 
 */

function ShoppingCart() {

  //pull in state from redux
  const cart = useSelector(state => state.cart.cart);
  const cartTotal = useSelector(state => state.cart.total);
  const cartWeight = useSelector(state => state.cart.weight);
  const brackets = useSelector(state => state.shipping.brackets);
  const dispatch = useDispatch()

  //local state for inventory
  const [inventory, setInventory] = useState([])

  //get inventory quantities to validate
  const getInventory = async () => {
    await axios.get('http://localhost:8080/inventory/all')
    .then(function (response) {
      // handle success
      setInventory(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  //make sure the new quantity is less than or equal to the amount in inventory
  function checkInventory(row){
    const index = inventory.findIndex(item => item.part_number === row.id)
    return (row.qty <= inventory[index].qty)
  }


  //get inventory on render
  useEffect(() => {
      getInventory()
  }, [])

  //function to calculate shipping charges based on the total
  //weight of products in the cart, returns the S/H charge
  function calcShipping(){
      let shipping;
      if(cartWeight < brackets[0].maxWeight){
          shipping = brackets[0].charge
      }else if(cartWeight >= brackets[1].minWeight && cartWeight < brackets[1].maxWeight){
          shipping = brackets[1].charge
      }else{
          shipping = brackets[2].charge
      }
      return shipping;
  }

  //function to calculate and format the order total
  //cart total plus the shipping charges
  function grandTotal() {
      let total = cartTotal;
      let shipping = calcShipping()
      shipping = +shipping;
      total = +total;
      total += shipping
      return total.toFixed(2)
  }

  //define table columns
  const cols = [
    { title: 'Part Number', field: "id", editable: 'never' }, 
    { title: 'Description', field: "description", editable: 'never' }, 
    { title: 'Unit Price', field: "price", editable: 'never'}, 
    { title: 'Unit Weight', field: "weight", editable: 'never'}, 
    { title: 'Quantity', field: "qty", type: 'numeric', validate: rowData => (rowData.qty > 0 && checkInventory(rowData)) ? { isValid: true } : { isValid: false, helperText: 'not enough in inventory'}},
    { title: 'Total Price', field: "total", editable: 'never', render: rowData => {return (rowData.price * rowData.qty).toFixed(2)} }
  ] 
  
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
                <div style={{height: 450}}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
                <MaterialTable
                    title={"Part Cart"}
                    data={cart}
                    columns={cols}
                    editable={{
                      onRowUpdate: (newData, oldData) =>
                          new Promise((resolve, reject) => {
                              setTimeout(() => {
                                const dataUpdate = [...cart];
                                //find the index of the updated item and assign it to the new data
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                //send the new data to redux to update state
                                dispatch(updateCart(dataUpdate[index]))
                                resolve();
                              }, 1000);
                          }),
                      onRowDelete: oldData =>
                          new Promise((resolve, reject) => {
                              setTimeout(() => {
                                  const dataDelete = [...cart];
                                  //find the index of the item to delete and remove it from temp array
                                  const index = oldData.tableData.id;
                                  dataDelete.splice(index, 1);
                                  //send the new array with item removed to redux
                                  dispatch(removeItem(dataDelete));
                                //   setOrderTotal(grandTotal())
                                  resolve();
                              }, 1000);
                          })
                    }}
                />
                </div>
                {/**Show Cart Total, Shipping Cost, and Order Grand Total */}
                <Typography>Cart Total: ${cartTotal}</Typography>
                <Typography>Shipping & Handling: ${calcShipping()}</Typography>
                <Typography>Grand Total: ${grandTotal()}</Typography>
                {/**Submit Order Button to pull up Order Form Modal */}
                <OrderForm shipping={calcShipping()} total={grandTotal()} />
              </div>
          )
      }
  }

  //cart page
  return (
    <div className="App">
    <Navbar/>
        <div style={{marginLeft: '15%'}}>
            <Typography variant="h3">
                Your Cart
            </Typography>
            <div style={{ width: '70%'}}> 
                {displayCart()}
            </div>
        </div>
    </div>
  );
}

export default ShoppingCart;