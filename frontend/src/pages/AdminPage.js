import '../css/App.css';
import Navbar from '../components/core/employeeNav.js';
import ShippingForm from '../components/shippingBracketModal';
import OrderTable from '../components/OrderTable'
import Grid from '@material-ui/core/Grid';
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

//default date range will be for orders from beginning of year til now
const [dates, setDates] = useState({
  from: '2020-01-01',
  to: today
});

const getData = async () => {
  //get orders for main table
  await axios.post('http://localhost:8080/orders/GetCustomerOrdersPrice', {
    fromDate: dates.from,
    toDate: dates.to
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
}, [dates]);


const handleDateChange = (e, end) => {
  let newDate = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
  setDates(dates => ({...dates, [end]: newDate}))
}

return (
    <div className="App">
      <Navbar />
      <div style={{ marginLeft: '2%'}}>
        <h2>Hello Admin!</h2>
        <Grid container spacing={1}>
          <Grid item xs={9}>
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
            <ShippingForm/>
          </Grid>
        </Grid>
      </div>
      <Grid container justify="center">
        <div style={{ width: '1200px' }}>
          <OrderTable data={entries} packingList={packingList}/>
        </div>
      </Grid>
    </div>
  );
}

export default AdminPage;