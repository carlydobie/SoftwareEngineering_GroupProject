import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
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
    },
    appbar: {
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
    const cart = useSelector(state => state.cart.cart);

    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
      let countItems = 0
      cart.forEach(part => {
        countItems += part.qty
      })
      setTotalItems(countItems)
    })
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
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

