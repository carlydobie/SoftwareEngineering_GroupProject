import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
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
  
  //hooks
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("")

  //check for message props when component renders
  useEffect(() => {
      if(props.message === "brackets"){
          setOpen(true)
          setMessage("Bracket Update Successful!")
      }
  }, [props])

  //handle snackbar close
  const handleClose = (event, reason) => {
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