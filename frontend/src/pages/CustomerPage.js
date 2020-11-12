import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/core/customerNav.js';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { TouchAppOutlined } from '@material-ui/icons';
import axios from 'axios';
import ProductGridItem from '../components/customer/product.js';

const useStyles = makeStyles((theme) => ({
  root : {
    flexGrow: 1,
    // alignContent: 'center',
    // alignItems: 'center',
  },
  gridContainer: {
    paddingTop: "1vh",
    paddingLeft: "10vw",
    paddingRight: "8vw",
  },
  imageButton: {
    // width: 50,
    // height: 300
  },
  image : {
    margin: 'auto',
    display: 'block',
    width: 300,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    // maxWidth: 500,
  },
  gridItem: { 
    margin: '1vw'
  }
}))

export default function CustomerPage() {
  const classes = useStyles();
  const [data, setData] = useState([])
  useEffect(() => {getData()}, [])
  const getData = async() => {
    await axios.get('http://localhost:8080/legacy/all')
        .then(function (response) {
          setData(response.data) 
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

  return (
    <div >
    <Navbar/>
    <div className={classes.root}>
                <Box className={classes.gridContainer}>
                  <Grid container spacing={2}>
          {data.map(part => {
            console.log(part)
            return (
                  <div>
                    <Grid item className={classes.gridItem}>
                      <ProductGridItem 
                      number = {part.number} 
                      description = {part.description}
                      price = {part.price}
                      weight = {part.weight}
                      pictureURL = {part.pictureURL}
                      />
                    </Grid>
              </div>
            );
          })}
          </Grid>
                </Box>
                </div>

    </div>
  );
}


          {/* <Grid item>
          <ButtonBase className={classes.imageButton}>
            <Paper>
            <img className={classes.image} alt="monkee" src="https://cdn.cnn.com/cnnnext/dam/assets/160107100400-monkey-selfie-exlarge-169.jpg"/>
            <h2>monkee</h2>
            </Paper>
            </ButtonBase>
          </Grid>
          <Grid item>
          <ButtonBase className={classes.imageButton}>
            <Paper>
            <img className={classes.image} alt="monkee" src="https://cdn.cnn.com/cnnnext/dam/assets/160107100400-monkey-selfie-exlarge-169.jpg"/>
            <h2>monkee</h2>
            </Paper>
            </ButtonBase>
          </Grid>
          <Grid item>
          <ButtonBase className={classes.imageButton}>
            <Paper>
            <img className={classes.image} alt="monkee" src="https://cdn.cnn.com/cnnnext/dam/assets/160107100400-monkey-selfie-exlarge-169.jpg"/>
            <h2>monkee</h2>
            </Paper>
            </ButtonBase>
          </Grid>
          <Grid item>
          <ButtonBase className={classes.imageButton}>
            <Paper>
            <img className={classes.image} alt="monkee" src="https://cdn.cnn.com/cnnnext/dam/assets/160107100400-monkey-selfie-exlarge-169.jpg"/>
            <h2>monkee</h2>
            </Paper>
            </ButtonBase>
          </Grid>
          <Grid item>
          <ButtonBase className={classes.imageButton}>
            <Paper>
            <img className={classes.image} alt="monkee" src="https://cdn.cnn.com/cnnnext/dam/assets/160107100400-monkey-selfie-exlarge-169.jpg"/>
            <h2>monkee</h2>
            </Paper>
            </ButtonBase>
          </Grid> */}