import '../css/App.css';
import Navbar from '../components/core/employeeNav.js';
import ShippingForm from '../components/shippingBracketModal';
import OrderTable from '../components/OrderTable'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import axios from 'axios';

function AdminPage() {
//state to hold axios responses
const [entries, setEntries] = useState([]);
const [packingList, setPackingList] = useState([]);

//get today's date to use in "to" for date range default
let now = new Date(Date.now());
let today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
//create date one month ago for default 
let monthAgo = new Date(Date.now());
monthAgo.setMonth(now.getMonth() - 1)

//default date range will be for orders from beginning of year til now
const [dates, setDates] = useState({
  from: monthAgo,
  to: today
});

//default price range will be for orders between 0 and million dollars
const [prices, setPrices] = useState({
  min: 0,
  max: 1000000
})

//get data from backend
const getData = async () => {
  //get orders for main table
  await axios.post('http://localhost:8080/orders/GetCustomerOrdersPrice', {
    fromDate: dates.from,
    toDate: dates.to,
    minPrice: prices.min,
    maxPrice: prices.max
  })
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
}, [dates, prices]);

//handle change in date range
const handleDateChange = (e, end) => {
  if(e != null){
    let newDate = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
    setDates(dates => ({...dates, [end]: newDate}))
  }
}

//handle change in price range
const handlePriceChange = (e, end) => {
  let newPrice = e.target.value
  if(newPrice) {
    setPrices(prices => ({...prices, [end]: newPrice}))
  }
}

//admin page component, with picker for price and date range,
//button to adjust shipping charges, and table of orders
return (
    <div className="App">
      <Navbar />
      <div style={{ marginLeft: '2%'}}>
        <h2>Hello Admin!</h2>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            {/**Date Range Picker: From Date */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="dense"
                id="from-date"
                label="From:"
                format="MM/dd/yyyy"
                value={dates.from}
                name="from"
                onChange={(e) => {handleDateChange(e, "from")}}
              />
              {/**Date Range Picker: To Date */}
              <KeyboardDatePicker
                margin="dense"
                id="to-date"
                label="To:"
                format="MM/dd/yyyy"
                value={dates.to}
                name="to"
                onChange={(e) => {handleDateChange(e, "to")}}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={3}>
            {/**Update Shipping Charge Modal Button */}
            <ShippingForm/>
          </Grid>
          <Grid item xs={9}>
            {/**Price Range Picker: Min Price */}
            <TextField
              type="number"
              margin="dense"
              id="min"
              name="min"
              label="Min Price"
              value={prices.min}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    $
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {handlePriceChange(e, "min")}}
              error={(prices.min > prices.max) || (prices.min < 0)}
              helperText={(prices.min > prices.max) || (prices.min < 0) ? "Invalid Range" : null}
            />
            {/**Price Range Picker: Max Price */}
            <TextField
              type="number"
              margin="dense"
              id="max"
              name="max"
              label="Max Price"
              value={prices.max}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    $
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {handlePriceChange(e, "max")}}
              error={(prices.min > prices.max)}
              helperText={(prices.min > prices.max) ? "Invalid Range" : null}
            />
          </Grid>
        </Grid>
      </div>
      {/**Table of Orders */}
      <Grid container justify="center">
        <div style={{ width: '1200px' }}>
          <OrderTable data={entries} packingList={packingList}/>
        </div>
      </Grid>
    </div>
  );
}

export default AdminPage;