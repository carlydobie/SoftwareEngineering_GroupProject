import '../css/App.css';
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/employeeNav.js';
import InventoryTable from '../components/receivingdesk/InventoryTable';
import InventoryForm from '../components/receivingdesk/InventoryForm';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';


const cols = [
  { title: 'Part Number', field: 'part_number', type: 'numeric', editable: 'never'},
  { title: 'Description', field: 'description', editable: 'never'},
  { title: 'Quantity', field: 'qty', type: 'numeric', editable: 'never'},
]

function ReceivingDeskPage() {
  //State for the rows in the inventory table
  // const [inventory, setInventory] = useState(0);
  
  // const getData = async () => {
  //   await axios.get('http://localhost:8080/inventory/all')
  //   .then(function (response) {
  //     // handle success
  //     setInventory(response.data)
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   });
  // }
  
  // useEffect(() => {
  //   getData();
    
  // }, [])

  // console.log(inventory);
  // let data = Array.from(inventory);
  return (
    <div className="App">
    <Navbar />
    <h2>Current Inventory</h2>
      <Grid container justify="center">
        <div style={{ width: '800px' }}>
          <InventoryTable/>
        </div>
      </Grid>
      <div style={{ margin: '100px'}}>
        <Grid spacing={5} container justify="center">
          <InventoryForm/>
        </Grid>
      </div>
    </div>
  );
}

export default ReceivingDeskPage;