import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import Slider from '@material-ui/core/Slider';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { blue, grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useForm, Controller } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/actions/cart';
import { InputLabel } from '@material-ui/core';


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


//Update Shipping Modal Component
export default function ShippingForm (props) {

    //hooks for modal
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    //pull in redux state
    const brackets = useSelector(state => state.shipping.brackets);
    const dispatch = useDispatch();

    console.log(brackets)


    //local state
    //for slider values
    const [sliderVals, setSliderVals] = useState({
        sliderOne: brackets[0].maxWeight,
        sliderTwo: [brackets[1].minWeight, brackets[1].maxWeight],
        sliderThree: [brackets[2].minWeight, brackets[2].maxWeight]
    })
    //for charge amounts
    const [charges, setCharges] = useState({
        bracketOne: brackets[0].charge,
        bracketTwo: brackets[1].charge,
        bracketThree: brackets[2].charge
    })

    //open modal
    const handleOpen = () => {
        setOpen(true);
    };
    
    //close modal
    const handleClose = () => {
      setOpen(false);
    };

    //handle change in bracket charge amount
    const handleCharge = (e) => {
        const { name, value } = e.target;
        setCharges(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    //submit form
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit")
        console.log(sliderVals)
        console.log(charges)
    }

    //handle change in slider one
    //set the new slider value, adjust slider two accordingly 
    //and make sure that the new value is not greater than the largest slider two value
    const handleSliderOne = (e, newVal) => {
        setSliderVals(state => ({...state, sliderOne: newVal}))
        setSliderVals(state => ({...state, sliderTwo: [newVal, sliderVals.sliderTwo[1]]}))
        if(newVal > sliderVals.sliderTwo[1]){
            setSliderVals(state => ({...state, sliderThree: [newVal, sliderVals.sliderThree[1]]}))
            setSliderVals(state => ({...state, sliderTwo: [newVal, newVal]}))
        }
    }

    //handle change in slider two
    //set the new slider two value, adjust the other two sliders accordingly
    const handleSliderTwo = (e, newVal) => {
        setSliderVals(state => ({...state, sliderTwo: newVal}))
        setSliderVals(state => ({...state, sliderOne: newVal[0]}))
        setSliderVals(state => ({...state, sliderThree: [newVal[1], sliderVals.sliderThree[1]]}))
    }

    //handle change in slider three
    //set the new slider value, adjust slider two accordingly
    //make sure that the low value is not less than slider one
    const handleSliderThree = (e, newVal) => {
        setSliderVals(state => ({...state, sliderThree: newVal}))
        setSliderVals(state => ({...state, sliderTwo: [sliderVals.sliderTwo[0], newVal[0]]}))
        if(newVal[0] < sliderVals.sliderOne){
            setSliderVals(state => ({...state, sliderOne: newVal[0]}))
            setSliderVals(state => ({...state, sliderTwo: [newVal[0], newVal[0]]}))
        }
    }

        
    //body of the modal, contains bracket weight and charge inputs
    const body = () => {
        return (
            <div style={modalStyle} className={classes.paper}>
                <div>
                    <Typography variant="h5">Update Shipping Brackets</Typography>
                    <ThemeProvider theme={theme}>
                        <form noValidate>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}> 
                                    <InputLabel>Bracket One Weight</InputLabel>
                                    <Slider
                                      label="Bracket 1 Weight"
                                      value={sliderVals.sliderOne}
                                      name="sliderOne"
                                      onChange={handleSliderOne}
                                      valueLabelDisplay="auto"
                                      max={1000}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Bracket One Charge</InputLabel>
                                    <Input
                                        margin="dense"
                                        onChange={handleCharge}
                                        type="number"
                                        InputProps={{ inputProps: { min: 1, step: .01 } }}
                                        name="bracketOne"
                                        value={charges.bracketOne}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}> 
                                    <InputLabel>Bracket Two Weight</InputLabel>
                                    <Slider
                                      label="Bracket 1 Weight"
                                      value={sliderVals.sliderTwo}
                                      name="sliderOne"
                                      onChange={handleSliderTwo}
                                      valueLabelDisplay="auto"
                                      max={1000}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Bracket Two Charge</InputLabel>
                                    <Input
                                        margin="dense"
                                        onChange={handleCharge}
                                        type="number"
                                        InputProps={{ inputProps: { min: 1, step: .01 } }}
                                        name="bracketTwo"
                                        value={charges.bracketTwo}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}> 
                                    <InputLabel>Bracket Three Weight</InputLabel>
                                    <Slider
                                      label="Bracket 1 Weight"
                                      value={sliderVals.sliderThree}
                                      name="sliderOne"
                                      onChange={handleSliderThree}
                                      valueLabelDisplay="auto"
                                      max={1000}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel>Bracket Three Charge</InputLabel>
                                    <Input
                                        margin="dense"
                                        onChange={handleCharge}
                                        type="number"
                                        InputProps={{ inputProps: { min: 1, step: .01 } }}
                                        name="bracketThree"
                                        value={charges.bracketThree}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
        )
    }

     //modal button and component
     return (
        <div>
          <Button onClick={handleOpen}>
            Update Shipping
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