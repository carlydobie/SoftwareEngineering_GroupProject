import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar.js';
import { useSelector } from 'react-redux'
/*
 *  Customer Nav Bar
 *  Navigation bar for shopping page that allows user to 
 *  shop, view cart, and search for products
 */

//nav bar styles
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      position: "fixed",
      width: '100%',
      zIndex: 100
    },
    barBackground: {
      background: '#1F404F',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    button: {
      color: 'white',
    },
    shoppingCart: {
      color: 'white',
    },

  }));

  //Nav Bar Component
  export default function ButtonAppBar() {
    const classes = useStyles();

    //pull in redux state
    const cart = useSelector(state => state.cart.cart);

    //local state for toal items in the shopping cart
    const [totalItems, setTotalItems] = useState(0)

    //on render, count the total items in the cart and set local state
    useEffect(() => {
      let countItems = 0
      cart.forEach(part => {
        countItems += part.qty
      })
      setTotalItems(countItems)
    }, [cart])
  
    //render nav bar
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.barBackground}>
          <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Button to="/" component={Link} className={classes.button}>
                <Typography>
                    Home
                </Typography>
            </Button>
            <Button to="/Customer" component={Link} className={classes.button}>
                <Typography>
                    Shop
                </Typography>
            </Button>
            <SearchBar />
            <IconButton to="/ShoppingCart" component={Link} className={classes.shoppingCart}>
              {/**Badge displayed on cart icon shows number of items in cart */}
              <Badge badgeContent={totalItems} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

