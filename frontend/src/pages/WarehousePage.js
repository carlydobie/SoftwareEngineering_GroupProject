import Navbar from '../components/core/employeeNav.js';
import WarehouseData from '../components/warehouse/WarehouseData.js';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
/*
 *  Warehouse Page
 *  Gets all the orders and the products in each order then
 *  passes the data to the warehouse table where warehouse workers
 *  can view orders and packing lists and generate invoices
 */ 
function WarehousePage() {

  //state to hold axios responses
  const [entries, setEntries] = useState([]);
  const [packingList, setPackingList] = useState([]);

  //get data function, gets all orders, then loops thru orders to get all 
  //products ordered in that order, orders get stored in entries,
  //array of product objects stored in packing list array
  const getData = async () => {
    //get orders for main table
    await axios.get('http://localhost:8080/orders/GetCustomerOrders')
      .then(function (response) {
        // handle success
        setEntries(response.data)
        //get products ordered for each order number
        response.data.forEach(order => {
          axios.get('http://localhost:8080/orders/PartsInOrder/' + order.order_number)
          .then(function (orderResponse) {
            //append the result to the packing list array
            setPackingList(packingList => [...packingList, orderResponse.data])
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })

        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  //get warehouse data when page loads
  useEffect(() => {
    getData()
  },[])


  //render the data in a table
  return (
    <div className="App">
      <Navbar />
      <div style={{ marginLeft: '2%'}}>
        <h2>Warehouse</h2>
      </div>
      <Grid container justify="center">
        <div style={{ width: '1200px' }}>
          <WarehouseData data={entries} packingList={packingList}/>
        </div>
      </Grid>
    </div>
  );
}

export default WarehousePage;