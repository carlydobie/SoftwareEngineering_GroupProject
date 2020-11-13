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
import { useForm, Controller } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/actions/cart';


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
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    //pull in state from redux
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const cartTotal = useSelector(state => state.cart.total); 

    const [custNum, setCustNum] = useState(0);
    const [orderNum, setOrderNum] = useState(0);
    const [orderDate, setOrderDate] = useState(1604752985353);  //timestamp for testing, change this back to null when uncomment auth funct
  
    //open modal
    const handleOpen = () => {
      setOpen(true);
    };
  
    //close modal
    const handleClose = () => {
      setOpen(false);
    };
  
    //submit order
    const submitOrder = async data => {
      console.log(data)

      //generate a random 9 digit transaction number
      let transactionNum = Math.floor(Math.random() * (999999999-100000000) + 100000000)
      let vendorID = 'VE123-99'

      //make sure that we have enough of all the parts in the inventory to sell??
      //do this in add to cart function maybe?

      //submit cc auth
      //seems like we can't use fake cc nums aside from the example
      //i have hard coded the example cc into the request body
      //but we can replace this with data.cc and data.exp in the future
      // await Axios.post('http://blitz.cs.niu.edu/CreditCard/', {
      //   vendor: vendorID,             
      //   trans: transactionNum,
      //   cc: '6011 1234 4321 1234',
      //   name: (data.fName + " " + data.lName), 
      //   exp: '12/2020', 
      //   amount: props.total
      // })
      // .then(function(response) {
      //     console.log(response)
      //     //as long as we get an auth number back, continue to processing order
      //     if(response.data.authorization){
      //         console.log("your auth num: " + response.data.authorization)
      //         setOrderDate(response.data.timeStamp)
      //         processOrder();
      //     }else{
      //         alert(response.data.errors[0]);
      //     }
      // })
      // .catch(function (error) {
      //     console.log(error)
      //     alert("There was an error processing your request.")
      // })
      processOrder(data)
    }


    //process the authorized order
    async function processOrder(formData) {

      //clean up name form data
      let firstname = formData.fName.toLowerCase();
      firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);

      let lastname = formData.lName.toLowerCase();
      lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
      
      let name = firstname + " " + lastname;
      console.log(name)
      

      //see if customer is in db, if not add them
      await Axios.post('http://localhost:8080/customer/get', {
          name: name,
          address: (formData.address + ", " + formData.city + ", " + formData.state + " " + formData.zip),
          email: formData.email
      })
      .then(function(response) {
          console.log(response)

          //set customer number in state
          //response.data will be customer_number
          setCustNum(response.data)

          //get date from timestamp to YYYY-MM-DD for db
          let date = new Date(orderDate);
          let formattedDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

          // post new order to order table
          Axios.post('http://localhost:8080/orders/add', {
              customer_number: response.data,
              total: props.total,
              ord_date: formattedDate,
              status: 'authorized'
          })
          .then(function(orderResponse) {
              console.log(orderResponse)

              //set order number in state
              setOrderNum(orderResponse.data)

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
          })
          .catch(function (error) {
              console.log(error)
          })

      })
      .catch(function (error) {
          console.log(error)
      })

      //send email
      sendEmail(name, formData.email);
      alert("Your Order Has Been Received! You will get an email confimation shortly. Thank you for shopping with us!")

      //clear cart
      dispatch(clearCart());

      //close modal
      handleClose();
      
    }

  
    //send an order confirmation email
    function sendEmail(name, email){
      console.log("email here " + name + ' ' + email)
      // emailjs.send("gmail","template_r3mb65m", {
      //   orderNum: orderNum,
      //   to_name: name,
      //   to_email: email
      // }, "user_g1HvKmngxkCglwn9LDMBB")
      // .then((result) => {
      //   console.log(result.text);
      // }, (error) => {
      //   console.log(error.text);
      // });
    }

    //body of the modal, contains the order form for customer input
    const body = () => {
      return (
          <div style={modalStyle} className={classes.paper}>
              <div>
                <h2>Order Summary: </h2>
                <Typography>Cart Total: ${cartTotal}</Typography>
                <Typography>Shipping & Handling: ${props.shipping}</Typography>
                <Typography>Grand Total: ${props.total}</Typography>
                <h2>Shipping:</h2>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <form onSubmit={handleSubmit(submitOrder)}>
                    <Grid container spacing={1}>
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
                              value: /([0-9][- ]*){16}/,
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