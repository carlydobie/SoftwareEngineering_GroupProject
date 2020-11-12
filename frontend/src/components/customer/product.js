import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      width: '25vh',
      height: '250px',
      // maxWidth: 500,
      alignContent: 'center',
      alignItems: 'center',
    },
    image: {
        maxHeight: '40vh',
    },
    title: {
        textTransform: 'capitalize',
    },
  }))

export default function ProductGridItem(props) {

    console.log(props.number, props.description);

    const classes = useStyles();

    return (
        <div>
        <Paper className={classes.paper}>
        <img className={classes.image} src={props.pictureURL}/>
        <Typography>
            <h4 className={classes.title}>{props.description}</h4>
            {/* {props.number} */}
            <h3>${props.price}</h3>
        </Typography>
        </Paper>
        </div>
    );
}