import '../css/App.css';
import Navbar from '../components/core/employeeNav.js';
import ShippingForm from '../components/shippingBracketModal';
import OrderTable from '../components/OrderTable'
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
//state to hold axios responses
const [entries, setEntries] = useState([]);
const [packingList, setPackingList] = useState([]);

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

useEffect(() => {
  getData()

}, [])


return (
    <div className="App">
    <Navbar />
      Hello AdminPage!
      <OrderTable data={entries} packingList={packingList}/>
      <ShippingForm/>
    </div>
  );
}

export default AdminPage;