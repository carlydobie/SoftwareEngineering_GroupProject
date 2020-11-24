import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar.js';
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: '20px',
      position: "fixed",
      width: '97%',
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
              <Badge badgeContent={totalItems} color='secondary'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

