import '../css/App.css';
import Navbar from '../components/core/employeeNav.js';
import ShippingForm from '../components/shippingBracketModal';
import OrderTable from '../components/OrderTable'
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPage() {
const [orders, setOrders] = useState();

 //Gets orders from database
 const getOrders = async () => {
  await axios.get('http://localhost:8080/orders/GetCustomerOrders')
  .then(function (response) {
    // handle success
    setOrders(response.data)
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}
useEffect(() => {
  getOrders()

}, [])

console.log(orders)

return (
    <div className="App">
    <Navbar />
      Hello AdminPage!
      <OrderTable orders={orders}/>
      <ShippingForm/>
    </div>
  );
}

export default AdminPage;