import '../css/App.css';
import {BrowserRouter } from 'react-router-dom';
import Navbar from '../components/core/employeeNav.js';
import InventoryTable from '../components/receivingdesk/InventoryTable';
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ReceivingDeskPage() {
  //State for the rows in the inventory table
  const [inventory, setInventory] = useState(0);
  
  const getData = async () => {
    await axios.get('http://localhost:8080/inventory/all')
    .then(function (response) {
      // handle success
      setInventory(response.data)
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="App">
    <Navbar />
    <h2>Current Inventory</h2>
      <Grid container justify="center">
        <InventoryTable inventory={inventory}/>
      </Grid>
    </div>
  );
}

export default ReceivingDeskPage;