import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { blue, grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

//color theme
const theme = createMuiTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: grey[500],
      },
    },
  });

//center modal in screen
function getModalStyle() { 
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//modal style
const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0
  }
}));


//Order Form Modal Component
export default function OrderForm (props) {

    //hooks for modal
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    //pull in state from redux
    const cart = useSelector(state => state.cart.cart);
    const cartTotal = useSelector(state => state.cart.total);
  
    //local state for customer input
    const [customer, setCustomer] = useState({
        fName: "",
        lName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        cc: "",
        exp: "",
        email: ""
    })  
  
    //set customer state when there is a change
    //in the order form text fields
    const handleChange = e => {
      const { name, value } = e.target;
      setCustomer(prevState => ({
          ...prevState,
          [name]: value
      }));
    };
  
    //open modal
    const handleOpen = () => {
      setOpen(true);
    };
  
    //close modal
    const handleClose = () => {
      setOpen(false);
    };
  
    //order submit function
    const handleSubmit = () => {
        let name = customer.fName + " " + customer.lName;
    
        //generate a random 9 digit transaction number
        let transactionNum = Math.floor(Math.random() * (999999999-100000000) + 100000000)
        let vendorID = 'VE123-99'

        //make sure that we have enough of all the parts in the inventory to sell??
        //do this in add to cart function maybe?
  
        //submit cc auth
        //seems like we can't use fake cc nums aside from the example
        // Axios.post('http://blitz.cs.niu.edu/CreditCard/', {
        //     vendor: vendorID,             
	    //     trans: transactionNum,
	    //     cc: '6011 1234 4321 1234',
	    //     name: name, 
	    //     exp: '12/2020', 
	    //     amount: cartTotal + props.shipping
        // })
        // .then(function(response) {
        //     console.log(response)
        //     //as long as we get an auth number back, continue to processing order
        //     if(response.data.authorization){
        //         console.log("your auth num: " + response.data.authorization)
        //         processOrder();
        //     }else{
        //         alert(response.data.errors[0]);
        //     }
        // })
        // .catch(function (error) {
        //     console.log(error)
        //     alert("There was an error processing your request.")
        // })
        processOrder();
    }
  
    //process the authorized order
    function processOrder() {

        let name = customer.fName + " " + customer.lName;
        
        //see if customer is in db, if not add them
        Axios.post('http://localhost:8080/customer/name', {
            name: name
        })
        .then(function(response) {
            console.log(response)
            if(response.data.length === 0){
                addCustomer();
            }
        })
        .catch(function (error) {
            console.log(error)
        })
  
        //create the order with order number customer id, date, and status
        
  
        //add products ordered to table with order num part num and qty
  
        //subtract qty for each part in order from inventory table

        //clear the cart
  
        //return an order placed alert? confirmation page?
    }

    //add a new customer to the db
    function addCustomer() {
        let name = customer.fName + " " + customer.lName;
        let address = customer.address + " " + customer.city + ", " + customer.state + " " + customer.zip;
        Axios.post('http://localhost:8080/customer/add', {
            name: name,
            email: customer.email,
            address: address
        })
        .then(function(response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })


    }

    //body of the modal, contains the order form for customer input
    const body = () => {
      return (
          <div style={modalStyle} className={classes.paper}>
              <div>
                <h2>Order Summary: </h2>
                <Typography>Cart Total: ${cartTotal}</Typography>
                <Typography>Shipping & Handling: ${props.shipping}</Typography>
                <Typography>Grand Total: ${cartTotal + props.shipping}</Typography>
                <h2>Shipping:</h2>
              </div>
              <div >
                  <ThemeProvider theme={theme}>
                      <form  noValidate>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              variant="outlined"
                              margin="dense"
                              required
                              fullWidth
                              id="fName"
                              label="First Name"
                              aria-label="First Name"
                              aria-required="true"
                              name="fName"
                              value={customer.fName}
                              onChange={handleChange}
                              autoFocus
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              variant="outlined"
                              margin="dense"
                              required
                              fullWidth
                              id="lName"
                              label="Last Name"
                              aria-label="Last Name"
                              aria-required="true"
                              name="lName"
                              value={customer.lName}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              margin="dense"
                              required
                              fullWidth
                              id="address"
                              label="Street Address"
                              aria-label="Street Address"
                              aria-required="true"
                              name="address"
                              value={customer.address}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              variant="outlined"
                              margin="dense"
                              required
                              id="city"
                              label="City"
                              aria-label="City"
                              aria-required="true"
                              name="city"
                              value={customer.city}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              variant="outlined"
                              margin="dense"
                              required
                              id="state"
                              label="State"
                              aria-label="State"
                              aria-required="true"
                              name="state"
                              value={customer.state}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              variant="outlined"
                              margin="dense"
                              required
                              fullWidth
                              id="zip"
                              label="Zip Code"
                              aria-label="Zip Code"
                              aria-required="true"
                              name="zip"
                              value={customer.zip}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} >
                              <h2>Billing:</h2>
                          </Grid>
                          <Grid item xs={12} sm={8}>
                            <TextField
                              variant="outlined"
                              margin="dense"
                              required
                              fullWidth
                              id="cc"
                              label="Credit Card"
                              aria-label="Credit Card"
                              aria-required="true"
                              name="cc"
                              value={customer.cc}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField
                              variant="outlined"
                              margin="dense"
                              required
                              fullWidth
                              id="exp"
                              label="Expiration"
                              aria-label="Expiration"
                              aria-required="true"
                              name="exp"
                              value={customer.exp}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              margin="dense"
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              aria-label="Email Address"
                              aria-required="true"
                              name="email"
                              value={customer.email}
                              onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Button  
                              type="submit" 
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={handleSubmit}
                            >
                              Submit
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Button 
                              fullWidth
                              variant="contained"
                              color="secondary"
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                  </ThemeProvider>
              </div>
          </div>
      );
    }
    
    //modal button and component
    return (
      <div>
        <Button onClick={handleOpen}>
          Submit Order
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body()}
        </Modal>
      </div>
    );
}