import React, { useState } from 'react';
import { Modal, Button, Grid, TextField, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { blue, grey } from '@material-ui/core/colors';
import { useForm, Controller } from 'react-hook-form';
import emailjs from 'emailjs-com';
import CustomizedSnackbars from '../core/alert'
/*
 *  Order Form Modal
 * 
 *  Customer reviews their order and inputs their billing and shipping info
 *  User input is validated by the form before being submitted. 
 *  Submit order function processes the payment and then calls process order
 *  Process order updates that database, sends the confirmation email and then clears the cart
 * 
 *  Takes the following props:
 *  props.shipping - the shipping charge calculated based on the weight of the cart
 *  props.total - the grand total of the order calculated as cart total plus shipping
 *  
 */

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

    //form validation
    const { handleSubmit, control, errors: fieldErrors } = useForm({ reValidateMode: 'onChange' });

    //hooks for modal
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false)
  
    //pull in state from redux
    const cart = useSelector(state => state.cart.cart);
    const cartTotal = useSelector(state => state.cart.total); 

    //open modal
    const handleOpen = () => {
      setSuccess(false)
      setOpen(true);
    };
  
    //close modal
    const handleClose = () => {
      setOpen(false);
    };
  
    //submit order
    //takes the form input data as props, generates a transaction number
    //and authorizes the payment. Once authorization number is obtained,
    //calls function process order to finish the transaction
    const submitOrder = async data => {
      //generate a random 9 digit transaction number
      let transactionNum = Math.floor(Math.random() * (999999999-100000000) + 100000000)
      let vendorID = 'VE123-99'

      //submit cc auth
      //makes request to authorization service and if an auth number is returned, the order is processed
      await Axios.post('http://blitz.cs.niu.edu/CreditCard/', {
        vendor: vendorID,             
        trans: transactionNum,
        cc: data.cc,
        name: (data.fName + " " + data.lName), 
        exp: data.exp, 
        amount: props.total
      })
      .then(function(response) {
          console.log(response)
          //as long as we get an auth number back, continue to processing order
          if(response.data.authorization){
              processOrder(data, response.data.timeStamp);
              setSuccess(true)
          }else{
              alert(response.data.errors[0]);
          }
      })
      .catch(function (error) {
          console.log(error)
          alert("There was an error processing your request.")
      })
      handleClose()
    }


    //process the authorized order
    //takes the form data and authorization date as props
    //gets the customer id, or adds the new customer to the db,
    //adds the new order to the db, and updates inventory before
    //sending confirmation email and clearing the shopping cart
    async function processOrder(formData, authDate) {
      //clean up name form data
      let firstname = formData.fName.toLowerCase();
      firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
      let lastname = formData.lName.toLowerCase();
      lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
      let name = firstname + " " + lastname;
      
      //see if customer is in db, if not add them, returns customer num as response.data
      await Axios.post('http://localhost:8080/customer/get', {
          name: name,
          address: (formData.address + ", " + formData.city + ", " + formData.state + " " + formData.zip),
          email: formData.email
      })
      .then(function(response) {
          //get date from timestamp to YYYY-MM-DD for db
          let date = new Date(authDate);
          let formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

          // post new order to order table, returns order number as orderResponse.data
          Axios.post('http://localhost:8080/orders/add', {
              customer_number: response.data,
              total: props.total,
              ord_date: formattedDate,
              status: 'authorized'
          })
          .then(function(orderResponse) {
              //for each item in the order, add that part
              //to the products ordered table and subtract the
              //ordered qty from inventory
              cart.forEach(part => {
                //add the part ordered to table
                Axios.post('http://localhost:8080/orders/parts', {
                  order_number: orderResponse.data,
                  part_number: part.id,
                  qty: part.qty
                })
                .then(function(partResponse){
                  console.log(partResponse)
                })
                .catch(function(error){
                  console.log(error)
                })
                
                //subtract qty ordered from inventory
                Axios.put('http://localhost:8080/inventory/sold/' + part.id, {
                  qty: part.qty
                })
                .then(function(inventoryResponse){
                  console.log(inventoryResponse)
                })
                .catch(function(error){
                  console.log(error)
                })
              })
              //send email
              sendEmail(name, formData.email, orderResponse.data);
          })
          .catch(function (error) {
              console.log(error)
          })
      })
      .catch(function (error) {
          console.log(error)
      })
    }

  
    //send an order confirmation email
    //takes the customer name, email and the order number
    //as props to fill the email template
    function sendEmail(name, email, orderNum){
      emailjs.send("gmail","template_r3mb65m", {
        orderNum: orderNum,
        to_name: name,
        to_email: email
      }, "user_g1HvKmngxkCglwn9LDMBB")
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    }

    //body of the modal, contains the order form for customer input
    //form input is validated by react-hook-form before it can be submitted
    const body = () => {
      return (
          <div style={modalStyle} className={classes.paper}>
              <div>
                {/**Display Order Summary */}
                <h2>Order Summary: </h2>
                <Typography>Cart Total: ${cartTotal}</Typography>
                <Typography>Shipping & Handling: ${props.shipping}</Typography>
                <Typography>Grand Total: ${props.total}</Typography>
                <h2>Shipping:</h2>
              </div>
              <div>
                {/**Form for users shipping and billing input */}
                <ThemeProvider theme={theme}>
                  <form onSubmit={handleSubmit(submitOrder)}>
                    <Grid container spacing={1}>
                      {/**First Name */}
                      <Grid item xs={12} sm={6}>
                        <Controller 
                          name="fName"
                          as={
                            <TextField
                              variant="outlined"
                              margin="dense"
                              fullWidth
                              id="fName"
                              label="First Name"
                              helperText={fieldErrors.fName ? fieldErrors.fName.message : null}
                              error={fieldErrors.fName}
                              autoFocus
                            />
                          }
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "name is required"
                            }
                          }}
                        />
                      </Grid>
                      {/**Last Name */}
                      <Grid item xs={12} sm={6}>
                        <Controller 
                          name="lName"
                          as={
                            <TextField
                              variant="outlined"
                              margin="dense"
                              fullWidth
                              id="lName"
                              label="Last Name"
                              helperText={fieldErrors.lName ? fieldErrors.lName.message : null}
                              error={fieldErrors.lName}
                            />
                          }
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "name is required"
                            }
                          }}
                        />
                      </Grid>
                      {/**Address */}
                      <Grid item xs={12}>
                        <Controller 
                          name="address"
                          as={
                            <TextField
                              variant="outlined"
                              margin="dense"
                              fullWidth
                              id="address"
                              label="Street Address"
                              helperText={fieldErrors.address ? fieldErrors.address.message : null}
                              error={fieldErrors.address}
                            />
                          }
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "street address is required"
                            }
                          }}
                        />
                      </Grid>
                      {/**City */}
                      <Grid item xs={12} sm={4}>
                        <Controller 
                          name="city"
                          as={
                            <TextField
                              variant="outlined"
                              margin="dense"
                              fullWidth
                              id="city"
                              label="City"
                              helperText={fieldErrors.city ? fieldErrors.city.message : null}
                              error={fieldErrors.city}
                            />
                          }
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "city is required"
                            }
                          }}
                        />
                      </Grid>
                      {/**State */}
                      <Grid item xs={12} sm={4}>
                        <Controller 
                          name="state"
                          as={
                            <TextField
                              variant="outlined"
                              margin="dense"
                              fullWidth
                              id="state"
                              label="State"
                              helperText={fieldErrors.state ? fieldErrors.state.message : null}
                              error={fieldErrors.state}
                            />
                          }
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "state is required"
                            },
                            pattern: {
                              value: /^[A-Z]{1,2}$/,
                              message: "invalid state code"
                            },
                            minLength: {
                              value: 2,
                              message: 'invalid state code'
                            },
                            maxLength: {
                              value: 2,
                              message: 'invalid state code'
                            }
                          }}
                        />
                      </Grid>
                      {/**Zip Code */}
                      <Grid item xs={12} sm={4}>
                        <Controller 
                          name="zip"
                          as={
                            <TextField
                              variant="outlined"
                              margin="dense"
                              fullWidth
                              id="zip"
                              label="Zip Code"
                              helperText={fieldErrors.zip ? fieldErrors.zip.message : null}
                              error={fieldErrors.zip}
                            />
                          }
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "zip code is required"
                            },
                            pattern: {
                              value: /^[0-9]{1,6}$/,
                              message: "invalid zip code"
                            },
                            minLength: {
                              value: 5,
                              message: 'invalid zip code'
                            },
                            maxLength: {
                              value: 5,
                              message: 'invalid zip code'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <h2>Billing:</h2>
                      </Grid>
                      {/**Credit Cart Number */}
                      <Grid item xs={12} sm={8}>
                        <Controller 
                          name="cc"
                          as={
                            <TextField
                              variant="outlined"
                              margin="dense"
                              fullWidth
                              id="cc"
                              label="Credit Card"
                              helperText={fieldErrors.cc ? fieldErrors.cc.message : null}
                              error={fieldErrors.cc}
                            />
                          }
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "card number is required"
                            },
                            pattern: {
                              value: /([0-9][ ]*){4}([0-9][ ]*){4}([0-9][ ]*){4}([0-9][ ]*){4}/,
                              message: "invalid cc: XXXX XXXX XXXX XXXX"
                            },
                            minLength: {
                              value: 19,
                              message: 'invalid cc: XXXX XXXX XXXX XXXX'
                            },
                            maxLength: {
                              value: 19,
                              message: 'invalid cc: XXXX XXXX XXXX XXXX'
                            }
                          }}
                        />
                      </Grid>
                      {/**Credit Card Expiration Date */}
                      <Grid item xs={12} sm={4}>
                        <Controller 
                          name="exp"
                          as={
                            <TextField
                              variant="outlined"
                              margin="dense"
                              fullWidth
                              id="exp"
                              label="Expiration"
                              helperText={fieldErrors.exp ? fieldErrors.exp.message : null}
                              error={fieldErrors.exp}
                            />
                          }
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: true,
                              message: "expiration date is required"
                            },
                            pattern: {
                              value: /^((0[1-9])|(1[0-2]))\/(\d{4})$/,
                              message: "invalid expiration"
                            },
                            minLength: {
                              value: 7,
                              message: 'MM/YYYY'
                            },
                            maxLength: {
                              value: 7,
                              message: 'MM/YYYY'
                            }
                          }}
                        />
                      </Grid>
                      {/**Customer Email */}
                      <Grid item xs={12}>
                        <Controller
                        name="email"
                        as={
                          <TextField
                            id="email"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            helperText={fieldErrors.email ? fieldErrors.email.message : null}
                            label="Email"
                            error={fieldErrors.email}
                          />
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                          required: {
                            value: true,
                            message: 'email is required'
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'invalid email address'
                          }
                        }}
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button  
                          type="submit" 
                          fullWidth
                          variant="contained"
                          color="primary"
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
    //on successful submission of order, a snackbar success message is shown
    //and the submit order button becomes disabled until the cart is cleared
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Button onClick={handleOpen} color='primary' variant='contained' disabled={success}>
            Submit Order
          </Button>
        </ThemeProvider>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body()}
        </Modal>
        {success ? <CustomizedSnackbars message="order" /> : null }
      </div>
    );
}