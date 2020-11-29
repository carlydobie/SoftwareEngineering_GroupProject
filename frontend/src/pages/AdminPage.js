import Navbar from '../components/core/employeeNav.js';
import ShippingForm from '../components/shippingBracketModal';
import OrderTable from '../components/OrderTable'
import { Grid, Box, TextField, InputAdornment } from '@material-ui/core';
import { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

/*
 *  Admin Page Component
 *  Gets the Order Data and Order Details from the backend
 *  to pass to the admin table, also renders date and price
 *  range pickers to filter the table data. Additionally,
 *  admins have access to a shipping button that will update
 *  the shipping charges.
 *
 */

//styles
const useStyles = makeStyles((theme) => ({
  root : {
    flexGrow: 1,
    margin: 'auto',
  },
  box : {
    paddingTop: '15vh',
    paddingLeft: '5vw',
    paddingBottom: '2vh'
  }
}))

//Admin Page
function AdminPage() {
  const classes = useStyles();

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
              let orderData = []
              //get the part details for each part in the order
              orderResponse.data.forEach(part => {
                axios.get('http://localhost:8080/legacy/' + part.part_number)
                  .then(function (partResponse){ 
                    //add the price to the part object
                    part.price = partResponse.data[0].price
                    //add the total weight to the part object
                    part.weight = partResponse.data[0].weight
                    orderData.push(part)
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
              })
              setPackingList(packingList => [...packingList, orderData])
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

  //get the order data when the page loads
  useEffect(() => {
      setPackingList([])
      getData()
  }, [dates, prices]);

  //handle change in date range
  const handleDateChange = (e, end) => {
    if(e != null){
      let newDate = e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
      setDates(prevDates => ({...prevDates, [end]: newDate}))
    }
  }

  //handle change in price range
  const handlePriceChange = (e, end) => {
    let newPrice = e.target.value
    if(newPrice) {
      setPrices(prevPrices => ({...prevPrices, [end]: newPrice}))
    }
  }

  //admin page component, with picker for price and date range,
  //button to adjust shipping charges, and table of orders
  return (
    <div className={classes.root}>
      <Navbar />
      <h2 style={{ marginLeft: '2%'}}>Hello Admin!</h2>
      <Grid container justify='center' spacing={4} style={{ paddingLeft: '5vh', paddingRight: '5vh'}}>
        <Grid item xs={9}>
            <OrderTable data={entries} packingList={packingList}/>
        </Grid>
        <Grid item xs={3}>
          <Grid container spacing={3}>
            <Grid item lg={6} xs={6}>
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
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item lg={6} xs={6}>
              {/**Date Range Picker: To Date */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            <Grid item lg={6} xs={6}>
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
                error={((+prices.min > +prices.max) || (+prices.min) < 0)}
                helperText={((+prices.min > +prices.max) || (+prices.min < 0)) ? "Invalid Range" : null}
              />
            </Grid>
            <Grid item lg={6} xs={6}>
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
                error={(+prices.min > +prices.max)}
                helperText={(+prices.min > +prices.max) ? "Invalid Range" : null}
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <Box className={classes.box}>
                {/**Update Shipping Charge Modal Button */}
                <ShippingForm/>
              </Box>  
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminPage;

