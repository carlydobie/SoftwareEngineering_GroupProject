import { Paper, Typography, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Block } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '25vh',
      height: '300px',
    //   alignContent: 'center',
    //   alignItems: 'center',
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
        height: '11vh'
    }
  }))

export default function ProductGridItem(props) {

    const classes = useStyles();

    return (
        <div>
        <Paper className={classes.paper} elevation={4}>
        <Box>
        <Box className={classes.imageBox}>
            <img className={classes.image} src={props.pictureURL}/>
        </Box>
        <Typography>
        <div className={classes.textBox}>
            <h4 className={classes.title}>{props.description}</h4>
            {/* {props.number} */}
            <h4 className={classes.price}>${props.price}</h4>
            </div>
            <Button className={classes.button}>Add to Cart</Button>
        </Typography>
        </Box>
        </Paper>
        </div>
    );
}