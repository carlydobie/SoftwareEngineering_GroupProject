import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductGrid from '../components/customer/productGrid';
import Navbar from '../components/core/customerNav.js';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import '../css/customerpage.css';
/*
 *  Customer Page Component
 *  Shopping page for customer to view all products and select parts to 
 *  purchase. Customers can add parts to the shopping cart
 *  and view the cart before submitting their order
 * 
 */

//styles
const useStyles = makeStyles((theme) => ({
  root : {
    flexGrow: 1,
  },
  gridContainer: {
    paddingTop: "15vh",
    paddingLeft: "12vw",
    paddingRight: "12vw",
  },
}))

// page component
export default function CustomerPage() {
  const classes = useStyles();

  //local state for results of axios calls
  const [data, setData] = useState([])

  //call the get part info function when the page loads
  useEffect(() => { getPartInfo() }, [])

  //get all parts
  const getPartInfo = async() => {
    await axios.get('http://localhost:8080/legacy/all')
        .then(function (response) {
          //loop through each part in the response
          response.data.forEach(part => {
            //get that part's current qty
            axios.get('http://localhost:8080/inventory/qty/' + part.number)
            .then(function (partResponse){
              //add the qty to the part object
              part.qty = partResponse.data[0].qty
              //add the part to the data set 
              setData(data => [...data, part])
            })
            .catch(function (error) {
              console.log(error)
            })
          })
        })
        .catch(function (error) {
            console.log(error)
        });
    }

  //pass the product data to the product grid and render
  return (
    <div>
      <div className={classes.nav}>
        <Navbar />
      </div>
      <div className={classes.root}>
        <Box className={classes.gridContainer}>
         <ProductGrid data={data}/>
        </Box>
      </div>
    </div>
  );
}
