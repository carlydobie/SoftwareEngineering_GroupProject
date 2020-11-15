import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/core/customerNav.js';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cart'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import axios from 'axios';
import ProductGridItem from '../components/customer/product.js';
import '../css/customerpage.css';
/*
 *  Customer Page to view all products and select parts to 
 *  purchase. Customers can add parts to the shopping cart
 *  and view the cart before submitting their order
 * 
 */

const useStyles = makeStyles((theme) => ({
  root : {
    flexGrow: 1,
  },
  gridContainer: {
    paddingTop: "1vh",
    paddingLeft: "10vw",
    paddingRight: "8vw",
  },
  gridItem: { 
    margin: '1vw'
  }
}))

export default function CustomerPage() {
  const classes = useStyles();

  const [data, setData] = useState([])

  useEffect(() => {getData()}, [])

  //get all parts
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
    <div>
      <Navbar/>
      <div className={classes.root}>
        <Box className={classes.gridContainer}>
          <Grid container spacing={2}>
            {data.map(part => {
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
