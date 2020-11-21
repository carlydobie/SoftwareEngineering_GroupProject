import React from 'react'
import { Paper, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cart'
/*
 *  Product Grid Item Component that renders an individual 
 *  part with it's item details, current quantity and an
 *  add to cart button
 */

//styles
const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '30vh',
      height: '315px',
      borderStyle: 'inset',
    },
    image: {
        display: 'block',
        margin: 'auto',
        height: "14vh",
    },
    title: {
        textTransform: 'capitalize',
    },
    imageBox: {
        height: '130px'
    },
    button: {
        flexGrow: 1,
        background: '#FFAC20',
        display: 'block',
        margin: 'auto',
        width: '100%',
    },
    buttonDisabled: {
        flexGrow: 1,
        background: '#BEBEBE',
        display: 'block',
        margin: 'auto',
        width: '100%',
    },
    price: {
        color: '#DC2502',
        lineHeight: '0%',
    },
    textBox: {
        height: '135px'
    }
  }))

//product grid item component
export default function ProductGridItem(props) {
    const classes = useStyles();
    const dispatch = useDispatch()

    //pull in state of cart from redux to get the local on hand qty
    const cart = useSelector(state => state.cart.cart)
    const cartItem = cart.filter(part => part.id === props.number)
  
    //if there is some of that item in the cart,
    //show the cart on hand amount which will be
    //props.qty minus whatever is in the cart
    function getLocalQty() {
        if(cartItem.length !== 0){
            return cartItem[0].onHand
        }else{
            return props.qty
        }
    }

    //add item to the shopping cart
    //pass it current quantity minus 1 as the on hand amount
    const addItem = () => {
        let item ={ "id": props.number, "description": props.description, "price": props.price, "weight": props.weight, "onHand": (props.qty - 1), "qty": 1 }
        dispatch(addToCart(item))
    }

    //add button displays disabled if current qty or local on hand is 0
    const addToCartButton = (quant) => {
        if (quant <= 0) {
            return (
                <Button disabled className={classes.buttonDisabled} onClick={addItem}>Add to Cart</Button>
            )
        }
        else {
            return (
                <Button className={classes.button} onClick={addItem}>Add to Cart</Button>
            )
        }
    }

    //render the product grid square
    return (
        <div>
            <Paper className={classes.paper} elevation={4}>
                <Box>
                    <Box className={classes.imageBox}>
                        <img className={classes.image} src={props.pictureURL}/>
                    </Box>
                    <Box  className={classes.textBox}>
                        <div className={classes.textBox}>
                            <h4 className={classes.title}>{props.description}</h4>
                            <h4 className={classes.price}>${props.price}</h4>
                            In stock: {getLocalQty()}
                        </div>
                    </Box>
                        {addToCartButton(getLocalQty())}
                </Box>
            </Paper>
        </div>
    );
}