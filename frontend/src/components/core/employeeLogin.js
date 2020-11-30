import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, ButtonBase, Button, Grid, Typography, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom'

/*
 *  Employee Login Form Modal
 * 
 *  Allows employees to login to access employee tools
 * 
 *  ***This feature is still in development, a placeholder admin
 *     password has been hardcoded for demonstration purposes
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

//style for modal and button
const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
    width: '25%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0
  },
  modalButton: {
    fontSize: '2vw',
    fontWeight: '700',
    '&:hover': {
        fontWeight: '800',
        height: '5vh'
    }
  }
}));

//Login Modal Component
export default function LoginForm () {

    //hooks for modal
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    //local state for user input
    const [emp, setEmp] = useState({
        id: "",
        password: ""
    })

    //open modal
    const handleOpen = () => {
        setOpen(true);
    };
    
    //close modal
    const handleClose = () => {
      setOpen(false);
    };

    //handle form submit
    //this would realistically be changed to see if
    //an employee is an authorized user in our db before
    //taking them to the employee section of the website
    const handleSubmit = (e) => {
        if(emp.password === "admin123"){
            history.push('/Warehouse')
        }else{
            alert("Invalid Login")
        }
    }

    //handle user input 
    const handleChange = (e) => {
        const {name, value} = e.target
        setEmp(emp => ({...emp, [name]: value}))
    }

    //body of the modal, contains input for username and password
    const body = () => {
        return (
            <div style={modalStyle} className={classes.paper}>
                <div>
                    <Typography variant="h5">Employee Login</Typography>
                    <ThemeProvider theme={theme}>
                        <form noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}> 
                                {/**Employee Id */}
                                   <TextField 
                                        label="Employee ID"
                                        name="id"
                                        fullWidth
                                        margin="dense"
                                        onChange={handleChange}  
                                        value={emp.id}  
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                {/**Employee password */}
                                    <TextField 
                                        label="Password"
                                        name="password"
                                        fullWidth
                                        margin="dense"
                                        onChange={handleChange}  
                                        value={emp.password}  
                                        type="password"
                                    />
                                   
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/**Submit */}
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
                                    {/**Cancel Submission */}
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
        )
    }

     //modal button and component
     return (
        <div>
          <ButtonBase onClick={handleOpen} className={classes.modalButton}>
            EMPLOYEE
          </ButtonBase>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="shipping-data"
            aria-describedby="update-shipping-cost"
          >
            {body()}
          </Modal>
        </div>
      );
}