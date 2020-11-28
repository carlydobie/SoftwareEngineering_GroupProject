import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { clearCart } from '../../redux/actions/cart';
/*
 * SnackBar Alert Component
 * Renders a Green Alert Bar to notify user of successful actions
 *
 */

//Alert Function
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//SnackBar Styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

//SnackBar Component
export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  //hooks
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("")

  //check for message props when component renders
  useEffect(() => {
      if(props.message === "brackets"){
          setOpen(true)
          setMessage("Bracket Update Successful!")
      }else if(props.message === "order"){
          setOpen(true)
          setMessage("Your Order Has Been Received! You will get an email confimation shortly. Thank you for shopping with us!")
      }
  }, [props])

  //handle snackbar close
  const handleClose = (event, reason) => {
    //clear the redux cart if the user closes an order success alert
    if(props.message === "order"){
        dispatch(clearCart())
    }
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //render green bar alert
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}