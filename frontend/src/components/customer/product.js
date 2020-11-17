import { Paper, Typography, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cart'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '25vh',
      height: '325px',
      borderStyle: 'inset',
    },
    image: {
        display: 'block',
        margin: 'auto',
    },
    title: {
        textTransform: 'capitalize',
    },
    imageBox: {
        height: '15vh'
    },
    button: {
        flexGrow: 1,
        background: '#FFAC20',
        display: 'block',
        margin: 'auto',
        width: '25vh',
    },
    price: {
        color: '#DC2502',
        lineHeight: '0%',
    },
    textBox: {
        height: '13vh'
    }
  }))

export default function ProductGridItem(props) {

    const classes = useStyles();
    const dispatch = useDispatch()

    //add item to the shopping cart
    const addItem = () => {
        let item ={ "id": props.number, "description": props.description, "price": props.price, "weight": props.weight, "qty": 1 }
        dispatch(addToCart(item))
    }

    return (
        <div>
            <Paper className={classes.paper} elevation={4}>
                <Box>
                    <Box className={classes.imageBox}>
                        <img className={classes.image} src={props.pictureURL}/>
                    </Box>
                    <Box  className={classes.textBox}>
                        <Typography className={classes.textBox}>
                            <h4 className={classes.title}>{props.description}</h4>
                            <h4 className={classes.price}>${props.price}</h4>
                            In stock: {props.qty}
                        </Typography>
                    </Box>
                    <Button className={classes.button} onClick={addItem}>Add to Cart</Button>
                </Box>
            </Paper>
        </div>
    );
}